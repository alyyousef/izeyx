import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const problems = [
  {
    title: "Information is spread across tools",
    detail:
      "Leads arrive by WhatsApp, email, spreadsheet, and phone, with no single record of what happened or what's next.",
  },
  {
    title: "Teams repeat the same manual tasks",
    detail: "The same customer or job detail gets typed into two or three systems by hand, every time.",
  },
  {
    title: "Customers wait for responses",
    detail: "Replies depend on someone being available, so response time varies with who's in the office.",
  },
  {
    title: "Reports depend on spreadsheets",
    detail: "A weekly or monthly report is assembled by hand from exports, taking hours before anyone can act on it.",
  },
  {
    title: "Existing systems do not communicate",
    detail: "The CRM, the website, and the support tool each hold a different, partial version of the same customer.",
  },
  {
    title: "Technology decisions lack a roadmap",
    detail: "Tools get adopted one at a time, without a clear view of what should be prioritised next.",
  },
];

export function ProblemRecognition() {
  return (
    <Section tone="light" aria-labelledby="problem-recognition-heading">
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <SectionHeader
            headingId="problem-recognition-heading"
            heading="Your business may have outgrown the way it currently works."
            description="Does this sound familiar? None of this means something is broken. It usually means the business has grown past the manual version of a process that used to be good enough."
          />
        </div>

        <div className="md:col-span-8">
          <ul className="flex flex-col">
            {problems.map((problem, index) => (
              <li key={problem.title} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-border py-6 last:border-b">
                <span className="text-meta text-muted-soft">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-title text-foreground">{problem.title}</p>
                  <p className="mt-1.5 max-w-xl text-muted">{problem.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
