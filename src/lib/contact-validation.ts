import { serviceInterestOptions, type ContactFieldErrors, type ContactFormValues } from "./contact-form";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validServiceValues: Set<string> = new Set(serviceInterestOptions.map((option) => option.value));

export function parseContactFormData(formData: FormData): ContactFormValues {
  const get = (key: string) => (formData.get(key) ?? "").toString().trim();

  return {
    fullName: get("fullName"),
    workEmail: get("workEmail"),
    phone: get("phone"),
    companyName: get("companyName"),
    role: get("role"),
    serviceInterest: get("serviceInterest"),
    problemDescription: get("problemDescription"),
    timeline: get("timeline"),
    budgetRange: get("budgetRange"),
    consent: formData.get("consent") === "on",
  };
}

export function validateContactFormValues(values: ContactFormValues): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  if (!values.fullName || values.fullName.length < 2) {
    errors.fullName = "Enter your full name.";
  } else if (values.fullName.length > 120) {
    errors.fullName = "Name is too long. Use 120 characters or fewer.";
  }

  if (!values.workEmail) {
    errors.workEmail = "Enter your work email address.";
  } else if (!EMAIL_PATTERN.test(values.workEmail) || values.workEmail.length > 254) {
    errors.workEmail = "Enter a valid email address.";
  }

  if (values.phone && !/^[+()\d\s-]{6,20}$/.test(values.phone)) {
    errors.phone = "Enter a valid phone number, or leave this field blank.";
  }

  if (!values.companyName || values.companyName.length < 2) {
    errors.companyName = "Enter your company name.";
  } else if (values.companyName.length > 120) {
    errors.companyName = "Company name is too long. Use 120 characters or fewer.";
  }

  if (values.role && values.role.length > 120) {
    errors.role = "Role is too long. Use 120 characters or fewer.";
  }

  if (!values.serviceInterest || !validServiceValues.has(values.serviceInterest)) {
    errors.serviceInterest = "Select the area you're interested in.";
  }

  if (!values.problemDescription || values.problemDescription.length < 20) {
    errors.problemDescription = "Add a little more detail (at least 20 characters) so we understand the problem.";
  } else if (values.problemDescription.length > 4000) {
    errors.problemDescription = "That's a lot of detail. Please shorten it to 4000 characters or fewer; we'll get the rest on the call.";
  }

  if (!values.consent) {
    errors.consent = "Please confirm you're okay with us contacting you about this enquiry.";
  }

  return errors;
}
