import { siteConfig } from "@/lib/site-config";
import { logger } from "@/lib/logger";
import { reportServerError } from "@/lib/monitoring";
import { serviceInterestOptions, timelineOptions, budgetOptions, type ContactFormValues } from "./contact-form";

// Imported only from src/app/contact/actions.ts, a "use server" module, so
// this never reaches the client bundle, so no server-only guard package is needed.

export type SendResult =
  | { delivered: true; confirmationDelivered: boolean }
  | { delivered: false; reason: "not_configured" | "provider_error" | "network_error" };

function labelFor(options: readonly { value: string; label: string }[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
}

function formatEmailBody(values: ContactFormValues) {
  const lines = [
    `Name: ${values.fullName}`,
    `Work email: ${values.workEmail}`,
    values.phone ? `Phone: ${values.phone}` : null,
    `Company: ${values.companyName}`,
    values.role ? `Role: ${values.role}` : null,
    `Area of interest: ${labelFor(serviceInterestOptions, values.serviceInterest)}`,
    values.timeline ? `Timeline: ${labelFor(timelineOptions, values.timeline)}` : null,
    values.budgetRange ? `Budget range: ${labelFor(budgetOptions, values.budgetRange)}` : null,
    "",
    "Problem description:",
    values.problemDescription,
  ];

  return lines.filter((line) => line !== null).join("\n");
}

function formatConfirmationBody(values: ContactFormValues) {
  const service = labelFor(serviceInterestOptions, values.serviceInterest).toLowerCase();

  return [
    `Hi ${values.fullName},`,
    "",
    `Thank you for contacting IZEYX about ${service}. We have received your enquiry and will review the details you shared.`,
    "",
    "Our team aims to reply within one business day. If you would like to add anything in the meantime, simply reply to this email.",
    "",
    "Best,",
    "The IZEYX team",
    siteConfig.url,
  ].join("\n");
}

async function sendWithResend(
  apiKey: string,
  message: {
    from: string;
    to: string[];
    reply_to: string;
    subject: string;
    text: string;
  }
) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

/**
 * Provider-agnostic contact notification. Gated entirely by environment
 * variables: with none configured, this always and correctly reports
 * "not_configured" rather than pretending to send.
 *
 * The concrete implementation below targets the Resend API
 * (https://resend.com, a simple REST transactional-email API) as a sensible
 * default. To use a different provider (Postmark, SendGrid, AWS SES, etc.),
 * replace the fetch call below with that provider's send call. The
 * env-driven gating and the ContactFormValues → email body mapping stay the
 * same either way.
 */
export async function sendContactNotification(
  values: ContactFormValues,
  context: { requestId: string }
): Promise<SendResult> {
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL ?? siteConfig.contact.email.value;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    logger.warn("contact.delivery.not_configured", {
      requestId: context.requestId,
      serviceInterest: values.serviceInterest,
      missingApiKey: !apiKey,
      missingFromAddress: !from,
    });
    return { delivered: false, reason: "not_configured" };
  }

  try {
    const response = await sendWithResend(apiKey, {
      from,
      to: [recipient],
      reply_to: values.workEmail,
      subject: `New enquiry from ${values.fullName} (${values.companyName})`,
      text: formatEmailBody(values),
    });

    if (!response.ok) {
      reportServerError(
        "contact.delivery.provider_error",
        new Error(`Email provider returned HTTP ${response.status}.`),
        {
          requestId: context.requestId,
          provider: "resend",
          statusCode: response.status,
          serviceInterest: values.serviceInterest,
        }
      );
      return { delivered: false, reason: "provider_error" };
    }

    logger.info("contact.delivery.succeeded", {
      requestId: context.requestId,
      provider: "resend",
      serviceInterest: values.serviceInterest,
    });
  } catch (error) {
    reportServerError("contact.delivery.network_error", error, {
      requestId: context.requestId,
      provider: "resend",
      serviceInterest: values.serviceInterest,
    });
    return { delivered: false, reason: "network_error" };
  }

  try {
    const confirmationResponse = await sendWithResend(apiKey, {
      from,
      to: [values.workEmail],
      reply_to: recipient,
      subject: "We received your enquiry | IZEYX",
      text: formatConfirmationBody(values),
    });

    if (!confirmationResponse.ok) {
      reportServerError(
        "contact.confirmation.provider_error",
        new Error(`Email provider returned HTTP ${confirmationResponse.status}.`),
        {
          requestId: context.requestId,
          provider: "resend",
          statusCode: confirmationResponse.status,
          serviceInterest: values.serviceInterest,
        }
      );
      return { delivered: true, confirmationDelivered: false };
    }

    logger.info("contact.confirmation.succeeded", {
      requestId: context.requestId,
      provider: "resend",
      serviceInterest: values.serviceInterest,
    });
    return { delivered: true, confirmationDelivered: true };
  } catch (error) {
    reportServerError("contact.confirmation.network_error", error, {
      requestId: context.requestId,
      provider: "resend",
      serviceInterest: values.serviceInterest,
    });
    return { delivered: true, confirmationDelivered: false };
  }
}
