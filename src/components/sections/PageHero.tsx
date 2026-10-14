import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { LeadButtons } from "@/components/ui/LeadButtons";
import type { LeadIntent, Product } from "@/content/site";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  primary?: LeadIntent;
  product?: Product;
  chips?: string[];
  trust?: ReactNode[];
  aside?: ReactNode;
};

export function PageHero({ eyebrow, title, lede, primary = "bao-gia", product, chips, trust, aside }: Props) {
  return (
    <section className="border-b border-line bg-[linear-gradient(135deg,#e2f1f4_0%,#f7fbfc_48%,#e7eef8_100%)] pt-12 pb-16 md:pt-[72px] md:pb-[92px]">
      <div className={`wrap grid items-center gap-14 ${aside ? "lg:grid-cols-[1.12fr_0.88fr]" : ""}`}>
        <div className="min-w-0">
          <p className="eyebrow eyebrow-dash mb-5">{eyebrow}</p>
          <h1 className="display-1 mb-5.5 max-w-[22ch]">{title}</h1>
          <p className="lede mb-7.5">{lede}</p>
          {chips && (
            <ul className="mb-7.5 flex flex-wrap gap-2" aria-label="Công nghệ">
              {chips.map((chip) => (
                <li key={chip} className="chip">
                  {chip}
                </li>
              ))}
            </ul>
          )}
          <LeadButtons primary={primary} product={product} />
          {trust && (
            <ul className="mt-7 flex flex-wrap gap-x-5.5 gap-y-2 text-[13.5px] text-muted">
              {trust.map((item, index) => (
                <li key={index} className="flex items-center gap-1.5">
                  <Check aria-hidden className="size-4 text-teal" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
        {aside}
      </div>
    </section>
  );
}
