import Link from "next/link";
import { caseStudies, companyStats, type CaseStudy } from "@/content/cases";

export function CaseCards({ items = caseStudies }: { items?: CaseStudy[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article key={item.slug} className="card flex flex-col gap-2.5 p-6.5">
          <p className="text-[13px] text-muted">
            {item.industry}
            {item.size ? `, ${item.size}` : ""}
          </p>
          <h3 className="text-[17px] leading-snug font-semibold text-navy">{item.title}</h3>
          <p className="mt-2.5 font-display text-[42px] leading-none text-teal">{item.metric}</p>
          <p className="text-[13.5px] text-muted">{item.metricLabel}</p>
          <ul className="mt-1.5 flex flex-wrap gap-1.5">
            {item.scope.map((scope) => (
              <li key={scope} className="chip">
                {scope}
              </li>
            ))}
          </ul>
          <Link href={`/du-an/${item.slug}/`} className="link-more mt-auto pt-2.5">
            Đọc dự án →
          </Link>
        </article>
      ))}
    </div>
  );
}

export function StatsRow() {
  return (
    <dl className="card mt-5 grid sm:grid-cols-3">
      {companyStats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col-reverse border-b border-line px-4 py-7 text-center last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0"
        >
          <dt className="text-[14px] text-muted">{stat.label}</dt>
          <dd className="font-display text-[44px] leading-tight text-teal">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
