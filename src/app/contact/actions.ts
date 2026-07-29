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

  // Treat unusually fast submissions as an observable signal only. It must
  // never manufacture a success response or prevent a genuine enquiry from
  // reaching the delivery provider.
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
