"use client";

import { useActionState, useEffect, useId, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { submitContactForm } from "@/app/contact/actions";
import {
  serviceInterestOptions,
  timelineOptions,
  budgetOptions,
  initialContactFormState,
  type ContactFormState,
} from "@/lib/contact-form";

function Field({
  label,
  htmlFor,
  required,
  optional,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-primary-text">
            {" "}
            *
          </span>
        ) : null}
        {optional ? <span className="font-normal text-muted-soft"> (optional)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-sm text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClasses =
  "min-h-11 rounded-sm border border-border bg-surface px-3.5 py-2.5 text-base text-foreground placeholder:text-muted-soft focus-visible:border-primary";

export function ContactForm({ defaultService = "" }: { defaultService?: string }) {
  const [state, formAction, isPending] = useActionState<ContactFormState, FormData>(
    submitContactForm,
    initialContactFormState
  );
  const [renderedAt] = useState(() => Date.now());
  const formId = useId();
  const errors = state.fieldErrors ?? {};
  const values = state.values;

  // React only honors defaultValue/defaultChecked at mount for uncontrolled
  // fields, and does not reliably re-apply them to already-mounted <select>/
  // checkbox elements after a form action round-trip (verified: text inputs
  // survive, <select> and checkboxes silently revert to their original
  // mount-time default). Remounting the form on every state change forces
  // every field's default to be re-read from the latest returned `values`,
  // so a failed or not-configured submission shows back exactly what the
  // visitor typed instead of quietly dropping their selections.
  const [formKey, setFormKey] = useState(0);
  const [previousState, setPreviousState] = useState(state);
  if (state !== previousState) {
    setPreviousState(state);
    setFormKey((key) => key + 1);
  }

  // The form (including the submit button) remounts on every state change,
  // so the browser's focus would otherwise silently fall back to <body>.
  // Move it to the error summary instead, so a keyboard or screen-reader
  // user lands on the outcome rather than losing their place entirely.
  const summaryRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (state.message) {
      summaryRef.current?.focus();
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div role="status" className="border border-border bg-surface-subtle p-8 text-center">
        <p className="font-sans text-xl font-semibold tracking-tight text-foreground">
          Thank you. Your message is on its way to us.
        </p>
        <p className="mt-2 text-muted">
          We aim to reply within one business day. If it&apos;s urgent, you can also reach us directly using the
          details on this page.
        </p>
      </div>
    );
  }

  return (
    <form key={formKey} action={formAction} noValidate aria-describedby={state.message ? `${formId}-summary` : undefined}>
      {/* Honeypot: positioned off-screen unconditionally (unlike .sr-only-focusable,
          which intentionally reveals on focus for skip links) and out of tab
          order, so a real visitor can never see or reach it. */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute top-auto left-[-9999px] h-px w-px overflow-hidden"
      />
      <input type="hidden" name="renderedAt" value={renderedAt} />

      {state.message ? (
        <div
          ref={summaryRef}
          id={`${formId}-summary`}
          role="alert"
          tabIndex={-1}
          className={`mb-8 border p-4 text-sm ${
            state.status === "not_configured"
              ? "border-border-strong text-foreground"
              : "border-error text-error"
          }`}
        >
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" htmlFor="fullName" required error={errors.fullName}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            aria-required="true"
            autoComplete="name"
            defaultValue={values?.fullName}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={inputClasses}
          />
        </Field>

        <Field label="Work email" htmlFor="workEmail" required error={errors.workEmail}>
          <input
            id="workEmail"
            name="workEmail"
            type="email"
            required
            aria-required="true"
            autoComplete="email"
            defaultValue={values?.workEmail}
            aria-invalid={Boolean(errors.workEmail)}
            aria-describedby={errors.workEmail ? "workEmail-error" : undefined}
            className={inputClasses}
          />
        </Field>

        <Field label="Phone number" htmlFor="phone" optional error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={values?.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={inputClasses}
          />
        </Field>

        <Field label="Company name" htmlFor="companyName" required error={errors.companyName}>
          <input
            id="companyName"
            name="companyName"
            type="text"
            required
            aria-required="true"
            autoComplete="organization"
            defaultValue={values?.companyName}
            aria-invalid={Boolean(errors.companyName)}
            aria-describedby={errors.companyName ? "companyName-error" : undefined}
            className={inputClasses}
          />
        </Field>

        <Field label="Role" htmlFor="role" optional error={errors.role}>
          <input
            id="role"
            name="role"
            type="text"
            autoComplete="organization-title"
            defaultValue={values?.role}
            aria-invalid={Boolean(errors.role)}
            aria-describedby={errors.role ? "role-error" : undefined}
            className={inputClasses}
          />
        </Field>

        <Field label="Area of interest" htmlFor="serviceInterest" required error={errors.serviceInterest}>
          <select
            id="serviceInterest"
            name="serviceInterest"
            required
            aria-required="true"
            defaultValue={values?.serviceInterest ?? defaultService}
            aria-invalid={Boolean(errors.serviceInterest)}
            aria-describedby={errors.serviceInterest ? "serviceInterest-error" : undefined}
            className={inputClasses}
          >
            <option value="" disabled>
              Select one
            </option>
            {serviceInterestOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Expected timeline" htmlFor="timeline" optional>
          <select id="timeline" name="timeline" defaultValue={values?.timeline ?? ""} className={inputClasses}>
            <option value="">Not sure yet</option>
            {timelineOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Indicative budget range" htmlFor="budgetRange" optional>
          <select id="budgetRange" name="budgetRange" defaultValue={values?.budgetRange ?? ""} className={inputClasses}>
            <option value="">Prefer not to say</option>
            {budgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-6">
        <Field
          label="Briefly describe the business problem"
          htmlFor="problemDescription"
          required
          error={errors.problemDescription}
        >
          <textarea
            id="problemDescription"
            name="problemDescription"
            required
            aria-required="true"
            rows={5}
            minLength={20}
            maxLength={4000}
            defaultValue={values?.problemDescription}
            aria-invalid={Boolean(errors.problemDescription)}
            aria-describedby={errors.problemDescription ? "problemDescription-error" : undefined}
            className={`${inputClasses} resize-y`}
          />
        </Field>
      </div>

      <div className="mt-6 flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          aria-required="true"
          defaultChecked={values?.consent}
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? "consent-error" : undefined}
          className="mt-1 h-5 w-5 shrink-0 border border-border-strong accent-primary"
        />
        <label htmlFor="consent" className="text-sm text-muted">
          I agree that IZEYX can contact me about this enquiry, in line with the{" "}
          <Link href="/privacy" className="text-primary-text underline underline-offset-4">
            privacy policy
          </Link>
          .
        </label>
      </div>
      {errors.consent ? (
        <p id="consent-error" className="mt-1.5 text-sm text-error">
          {errors.consent}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="mt-8 flex min-h-11 w-full items-center justify-center rounded-sm bg-primary px-6 py-3.5 text-base font-medium text-on-primary transition-colors hover:bg-primary-strong disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
      >
        {isPending ? "Sending…" : "Send enquiry"}
      </button>
      <p className="mt-3 text-xs text-muted-soft">Fields marked * are required.</p>
    </form>
  );
}
