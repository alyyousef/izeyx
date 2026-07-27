import Link from "next/link";
import type { Service } from "@/types/content";

export function ServiceRow({ service, index }: { service: Service; index: number }) {
  return (
    <li className="border-t border-border-strong py-8 last:border-b">
      <Link href={`/services/${service.slug}`} className="group grid gap-6 md:grid-cols-12 md:gap-8">
        <div className="flex items-start gap-4 md:col-span-5">
          <span className="text-meta text-muted-soft">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h2 className="font-display text-xl font-medium tracking-tight text-foreground group-hover:text-primary-text sm:text-2xl">
              {service.name}
            </h2>
            <p className="mt-2 max-w-md text-muted">{service.summary}</p>
          </div>
        </div>

        <div className="md:col-span-5 md:col-start-7">
          <p className="label text-muted-soft">Common deliverables</p>
          <ul className="mt-2 flex flex-col gap-1.5 text-sm text-foreground">
            {service.deliverables.slice(0, 3).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="flex items-end md:col-span-2 md:justify-end">
          <span className="text-sm font-medium text-primary-text">
            View service <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </li>
  );
}
