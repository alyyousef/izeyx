import { describe, expect, it } from "vitest";
import { parseContactFormData, validateContactFormValues } from "@/lib/contact-validation";

function validFormData() {
  const formData = new FormData();
  formData.set("fullName", "  Alex Morgan  ");
  formData.set("workEmail", " alex@example.com ");
  formData.set("companyName", "Northstar Studio");
  formData.set("serviceInterest", "automation");
  formData.set("problemDescription", "We need to remove repeated manual handoffs from our onboarding workflow.");
  formData.set("timeline", "1-3-months");
  formData.set("budgetRange", "medium");
  formData.set("consent", "on");
  return formData;
}

describe("contact form validation", () => {
  it("normalises submitted strings and accepts a complete enquiry", () => {
    const values = parseContactFormData(validFormData());

    expect(values.fullName).toBe("Alex Morgan");
    expect(values.workEmail).toBe("alex@example.com");
    expect(values.consent).toBe(true);
    expect(validateContactFormValues(values)).toEqual({});
  });

  it("rejects missing, malformed, and unsupported required values", () => {
    const formData = validFormData();
    formData.set("fullName", "A");
    formData.set("workEmail", "not-an-email");
    formData.set("serviceInterest", "invented-service");
    formData.set("problemDescription", "Too short");
    formData.delete("consent");

    const errors = validateContactFormValues(parseContactFormData(formData));

    expect(errors).toMatchObject({
      fullName: expect.any(String),
      workEmail: expect.any(String),
      serviceInterest: expect.any(String),
      problemDescription: expect.any(String),
      consent: expect.any(String),
    });
  });

  it("allows optional fields to be omitted", () => {
    const formData = validFormData();
    formData.delete("phone");
    formData.delete("role");
    formData.delete("timeline");
    formData.delete("budgetRange");

    expect(validateContactFormValues(parseContactFormData(formData))).toEqual({});
  });
});
