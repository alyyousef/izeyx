import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ContactFormValues } from "@/lib/contact-form";
import { sendContactNotification } from "@/lib/contact-mailer";

vi.mock("@/lib/logger", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));
vi.mock("@/lib/monitoring", () => ({ reportServerError: vi.fn() }));

const values: ContactFormValues = {
  fullName: "Alex Morgan",
  workEmail: "alex@example.com",
  phone: "",
  companyName: "Northstar Studio",
  role: "",
  serviceInterest: "automation",
  problemDescription: "We need to remove repeated manual handoffs from our onboarding workflow.",
  timeline: "",
  budgetRange: "",
  consent: true,
};

describe("sendContactNotification", () => {
  beforeEach(() => {
    vi.stubEnv("EMAIL_PROVIDER_API_KEY", "re_test");
    vi.stubEnv("CONTACT_FROM_EMAIL", "IZEYX <enquiries@send.izeyx.com>");
    vi.stubEnv("CONTACT_RECIPIENT_EMAIL", "hello@izeyx.com");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("sends the lead notification before the visitor confirmation", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 200 }))
      .mockResolvedValueOnce(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await sendContactNotification(values, { requestId: "request-1" });

    expect(result).toEqual({ delivered: true, confirmationDelivered: true });
    expect(fetchMock).toHaveBeenCalledTimes(2);

    const leadMessage = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    const confirmation = JSON.parse(fetchMock.mock.calls[1][1].body as string);
    expect(leadMessage.to).toEqual(["hello@izeyx.com"]);
    expect(leadMessage.reply_to).toBe("alex@example.com");
    expect(confirmation.to).toEqual(["alex@example.com"]);
    expect(confirmation.reply_to).toBe("hello@izeyx.com");
    expect(confirmation.subject).toBe("We received your enquiry | IZEYX");
  });

  it("does not send a confirmation when the lead notification fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 403 }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await sendContactNotification(values, { requestId: "request-2" });

    expect(result).toEqual({ delivered: false, reason: "provider_error" });
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("keeps the enquiry successful when only the confirmation fails", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 200 }))
      .mockResolvedValueOnce(new Response(null, { status: 429 }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await sendContactNotification(values, { requestId: "request-3" });

    expect(result).toEqual({ delivered: true, confirmationDelivered: false });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
