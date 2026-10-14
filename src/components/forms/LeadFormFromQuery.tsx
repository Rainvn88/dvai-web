"use client";

import { useSearchParams } from "next/navigation";
import { LeadForm } from "./LeadForm";
import { products, type LeadIntent, type Product } from "@/content/site";

/** Form đầy đủ trên trang Liên hệ, điền sẵn theo link CTA: ?loai=&sp=&ghichu= */
export function LeadFormFromQuery() {
  const query = useSearchParams();
  const intent: LeadIntent = query.get("loai") === "tu-van" ? "tu-van" : "bao-gia";
  const sp = query.get("sp");
  const product = products.includes(sp as Product) ? (sp as Product) : undefined;
  const note = query.get("ghichu")?.slice(0, 200) || undefined;
  return (
    <LeadForm
      key={`${intent}|${product}|${note}`}
      variant="full"
      defaultIntent={intent}
      defaultProduct={product}
      defaultNote={note}
    />
  );
}
