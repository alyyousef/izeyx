import type { Metadata } from "next";
import { LocationMap } from "@/components/media/LocationMap";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { CtaSection } from "@/components/sections/CtaSection";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Why IZEYX exists, how it approaches technology, and the principles it works by as a digital transformation and technology services practice built around the business problem, not the tool.",
  path: "/about",
});

const principles = [
  {
    title: "Start with the business problem",
    detail: "Technology is a means to an operational outcome, not the starting point of a conversation.",
  },
  {
    title: "Build only what creates meaningful value",
    detail: "A recommendation to buy, simplify, or leave something alone is as valid an outcome as a new build.",
  },
  {
    title: "Prefer connected systems over isolated tools",
    detail: "A new piece of software is only as useful as its connection to what the business already runs on.",
  },
  {
    title: "Make complexity understandable",
    detail: "A client should be able to follow every decision in plain language, without needing a technical translator.",
  },
  {
    title: "Design for the people who'll actually use the system",
    detail: "Usability for the employee or customer at the keyboard matters as much as the architecture behind it.",
  },
  {
    title: "Treat launch as the beginning",
    detail: "A system earns its value after launch through real use, maintenance, and iteration, not on delivery day.",
  },
  {
    title: "Build systems that can be maintained",
    detail: "Code, documentation, and architecture are written for whoever maintains the system next, including us.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section tone="light" className="pb-12 md:pb-16">
        <SectionHeader
          as="h1"
          heading="A technology practice built around how businesses actually operate."
          description="IZEYX exists because a lot of growing businesses are held back not by a lack of ambition, but by fragmented tools, manual workarounds, and technology decisions made without a clear picture of the operation underneath them."
        />
      </Section>

      <Section tone="light" className="border-t border-border py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="label text-muted-soft">Our approach</p>
            <h2 className="text-subheading mt-3 text-foreground">
              Business, design, and engineering, considered together
            </h2>
          </div>
          <div className="flex flex-col gap-5 text-muted md:col-span-7 md:col-start-6">
            <p>
              Most technology work gets split into separate conversations: a design phase, then a build phase,
              then, eventually, an integration afterthought. That sequencing is a common reason projects end up
              well-designed but disconnected, or well-built but hard to use.
            </p>
            <p>
              IZEYX treats the operational problem, the user experience, and the technical architecture as one
              conversation from the start. A workflow gets automated with the interface that surfaces it in mind.
              A website gets built with the CRM it needs to feed in mind. The result is meant to hold together as
              a system, not as a set of separately commissioned pieces.
            </p>
            <p>
              That also means being honest when a business doesn&apos;t need a custom build, an integration, or an
              AI assistant yet, and saying so even when a simpler recommendation is the less profitable one for
              us in the short term.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="dark" aria-labelledby="principles-heading">
        <SectionHeader headingId="principles-heading" heading="What guides the work" />
        <ol className="mt-12 grid gap-x-8 gap-y-10 border-t border-border pt-10 sm:grid-cols-2">
          {principles.map((principle, index) => (
            <li key={principle.title}>
              <span className="text-meta text-muted">{String(index + 1).padStart(2, "0")}</span>
              <p className="font-display mt-2 text-lg font-medium tracking-tight text-foreground">{principle.title}</p>
              <p className="mt-1.5 text-muted">{principle.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="light" className="py-16 md:py-20" aria-labelledby="team-heading">
        <SectionHeader
          headingId="team-heading"
          heading="A focused team, built around the work"
          description="Every engagement brings strategy, delivery, and engineering into one conversation, so the people shaping the solution stay close to the business problem from discovery through launch."
        />
        <div className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              title: "Strategy & discovery",
              detail: "Turning operational challenges into a clear, commercially grounded direction.",
            },
            {
              title: "Delivery & partnership",
              detail: "Keeping decisions, priorities, and progress aligned from the first workshop onward.",
            },
            {
              title: "Engineering & systems",
              detail: "Designing dependable technology that connects cleanly with how your business works.",
            },
          ].map((profile, index) => {
            const slot = index + 1;
            return (
              <div key={slot} className="flex flex-col gap-3">
                <MediaPlaceholder
                  label={`${profile.title} team portrait`}
                  assetType="portrait"
                  aspectRatio="1 / 1"
                />
                <div>
                  <p className="font-medium text-foreground">{profile.title}</p>
                  <p className="mt-1 text-sm text-muted">{profile.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section tone="light" className="border-t border-border py-16 md:py-20" aria-labelledby="history-heading">
        <SectionHeader
          headingId="history-heading"
          heading="Based in New Cairo"
          description="From New Cairo, IZEYX works with ambitious businesses across Egypt and the region, combining local understanding with a modern, internationally minded approach to digital transformation."
        />
        <div className="mt-10 max-w-2xl">
          <LocationMap />
          <p className="mt-4 text-sm text-muted">
            {siteConfig.location.name} ·{" "}
            <a
              href={siteConfig.location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-text underline underline-offset-4"
            >
              {siteConfig.contact.address.value}
            </a>
          </p>
        </div>
      </Section>

      <CtaSection
        heading="Want to know more about how we work?"
        description="A discovery call is the fastest way to understand our approach and whether it fits your situation."
      />
    </>
  );
}
