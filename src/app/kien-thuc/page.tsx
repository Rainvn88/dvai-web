import { ArticleCards } from "@/components/sections/ArticleCards";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { articles } from "@/content/articles";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Kiến thức Microsoft cho doanh nghiệp",
  description: "So sánh gói, giá, cách triển khai Microsoft 365, Power Platform, Azure và Copilot, viết cho người ra quyết định.",
  path: "/kien-thuc/",
});

export default function KnowledgePage() {
  const sorted = [...articles].sort((a, b) => b.updated.localeCompare(a.updated));
  return (
    <>
      <section className="border-b border-line bg-[linear-gradient(135deg,#e2f1f4_0%,#f7fbfc_48%,#e7eef8_100%)] pt-12 pb-14 md:pt-[72px] md:pb-20">
        <div className="wrap">
          <SectionHeading
            as="h1"
            size={1}
            eyebrow="Kiến thức"
            eyebrowStyle="dash"
            title={
              <>
                Kiến thức Microsoft <em>cho doanh nghiệp.</em>
              </>
            }
            lede="So sánh gói, giá, cách triển khai, viết cho người ra quyết định."
          />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <ArticleCards items={sorted} />
        </div>
      </section>

      <CtaPanel
        title={
          <>
            Cần tư vấn cho <em>trường hợp cụ thể?</em>
          </>
        }
      />
    </>
  );
}
