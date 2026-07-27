import type { FAQ } from "@/types/content";

export function FAQList({ faqs }: { faqs: FAQ[] }) {
  if (!faqs.length) return null;

  return (
    <div className="flex flex-col border-t border-border">
      {faqs.map((faq) => (
        <div key={faq.question} className="border-b border-border">
          <details className="group py-5">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="text-title text-foreground">{faq.question}</span>
              <span
                aria-hidden="true"
                className="mt-1 shrink-0 text-lg text-muted-soft transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 max-w-2xl text-muted">{faq.answer}</p>
          </details>
        </div>
      ))}
    </div>
  );
}
