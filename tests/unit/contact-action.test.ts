import { beforeEach, describe, expect, it, vi } from "vitest";
import { initialContactFormState } from "@/lib/contact-form";
import { sendContactNotification } from "@/lib/contact-mailer";
import { submitContactForm } from "@/app/contact/actions";

vi.mock("@/lib/contact-mailer", () => ({ sendContactNotification: vi.fn() }));
vi.mock("@/lib/logger", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

const sendNotification = vi.mocked(sendContactNotification);

function validFormData() {
  const formData = new FormData();
  formData.set("fullName", "Alex Morgan");
  formData.set("workEmail", "alex@example.com");
  formData.set("companyName", "Northstar Studio");
  formData.set("serviceInterest", "automation");
  formData.set("problemDescription", "We need to remove repeated manual handoffs from our onboarding workflow.");
  formData.set("consent", "on");
  return formData;
}

describe("submitContactForm", () => {
  beforeEach(() => {
    sendNotification.mockReset();
  });

  it("does not attempt delivery when validation fails", async () => {
    const result = await submitContactForm(initialContactFormState, new FormData());

    expect(result.status).toBe("error");
    expect(result.fieldErrors).toBeDefined();
    expect(sendNotification).not.toHaveBeenCalled();
  });

  it("reports success only after confirmed delivery", async () => {
    sendNotification.mockResolvedValue({ delivered: true });

    const result = await submitContactForm(initialContactFormState, validFormData());

    expect(result).toEqual({ status: "success" });
    expect(sendNotification).toHaveBeenCalledWith(
      expect.objectContaining({ workEmail: "alex@example.com" }),
      { requestId: expect.any(String) }
    );
  });

  it("is explicit when email delivery is not configured", async () => {
    sendNotification.mockResolvedValue({ delivered: false, reason: "not_configured" });

    const result = await submitContactForm(initialContactFormState, validFormData());

    expect(result.status).toBe("not_configured");
    expect(result.message).toContain("Nothing has been saved");
  });

  it("silently accepts honeypot spam without calling the provider", async () => {
    const formData = validFormData();
    formData.set("company_website", "https://spam.invalid");

    const result = await submitContactForm(initialContactFormState, formData);

    expect(result).toEqual({ status: "success" });
    expect(sendNotification).not.toHaveBeenCalled();
  });
});
