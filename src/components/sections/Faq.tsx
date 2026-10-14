import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd, faqJsonLd } from "@/components/seo/JsonLd";

export type FaqItem = { q: string; a: string };

export function Faq({ title, items }: { title: string; items: FaqItem[] }) {
  return (
    <section className="section pt-0">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <SectionHeading eyebrow="Câu hỏi thường gặp" title={title} />
        <div className="grid gap-2.5">
          {items.map((item) => (
            <details key={item.q} className="group card px-5 py-1 open:pb-4">
              <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-4 py-2 text-[15.5px] font-semibold text-navy [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus aria-hidden className="size-5 flex-none text-teal transition-transform group-open:rotate-45" />
              </summary>
              <p className="max-w-[68ch] text-[15px] text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
      <JsonLd data={faqJsonLd(items)} />
    </section>
  );
}
