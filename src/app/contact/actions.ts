"use server";

import { parseContactFormData, validateContactFormValues } from "@/lib/contact-validation";
import { sendContactNotification } from "@/lib/contact-mailer";
import { logger } from "@/lib/logger";
import type { ContactFormState } from "@/lib/contact-form";

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const requestId = crypto.randomUUID();
  const values = parseContactFormData(formData);

  // Spam mitigation: a honeypot field, hidden off-screen and unreachable by
  // keyboard tab order, that only an automated form-filler would populate. A
  // real visitor can never fill it, so treating a hit as spam and silently
  // returning a normal-looking success with nothing validated or sent can
  // never manufacture a false success for a genuine submission. A
  // rendered-at timestamp is also submitted and logged alongside near-instant
  // submissions as a secondary signal for manual review, but, deliberately,
  // it never gates success on its own: unlike the honeypot, "fast" is a
  // heuristic that a genuine fast submission could technically trigger, and
  // this form only ever reports success for a submission it actually
  // validated and attempted to send.
  const honeypot = (formData.get("company_website") ?? "").toString();
  if (honeypot) {
    logger.info("contact.submission.spam_rejected", { requestId, signal: "honeypot" });
    return { status: "success" };
  }

  const renderedAt = Number(formData.get("renderedAt") ?? 0);
  if (renderedAt && Date.now() - renderedAt < 1000) {
    logger.info("contact.submission.fast", { requestId, elapsedMs: Date.now() - renderedAt });
  }

  const fieldErrors = validateContactFormValues(values);
  if (Object.keys(fieldErrors).length > 0) {
    logger.info("contact.submission.validation_failed", {
      requestId,
      invalidFields: Object.keys(fieldErrors),
    });
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
      values,
    };
  }

  const result = await sendContactNotification(values, { requestId });

  if (result.delivered) {
    return { status: "success" };
  }

  if (result.reason === "not_configured") {
    return {
      status: "not_configured",
      message:
        "We couldn't deliver your enquiry because online submissions are temporarily unavailable. Nothing has been saved. Please contact us directly using the email or phone details on this page.",
      values,
    };
  }

  return {
    status: "error",
    message: "Something went wrong sending your message. Please try again, or contact us directly using the details on this page.",
    values,
  };
}
