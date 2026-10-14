import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { CaseCards } from "@/components/sections/CaseCards";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { caseStudies } from "@/content/cases";
import { pageMeta } from "@/lib/metadata";

// Xuất tĩnh: chỉ tạo trang cho các dự án đã khai báo.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/du-an/[slug]">) {
  const { slug } = await params;
  const item = caseStudies.find((c) => c.slug === slug);
  if (!item) return {};
  return pageMeta({ title: item.title, description: item.summary, path: `/du-an/${item.slug}/` });
}

export default async function CasePage({ params }: PageProps<"/du-an/[slug]">) {
  const { slug } = await params;
  const item = caseStudies.find((c) => c.slug === slug);
  if (!item) notFound();
  const others = caseStudies.filter((c) => c.slug !== item.slug);

  return (
    <>
      <section className="border-b border-line bg-[linear-gradient(135deg,#e2f1f4_0%,#f7fbfc_48%,#e7eef8_100%)] pt-10 pb-14 md:pt-14 md:pb-20">
        <div className="wrap">
          <nav aria-label="Đường dẫn" className="mb-6 text-[13.5px] text-muted">
            <Link href="/du-an/" className="hover:text-teal">
              Dự án
            </Link>{" "}
            / {item.industry}
          </nav>
          <p className="eyebrow eyebrow-dash mb-5">
            {item.industry}
            {item.size ? `, ${item.size}` : ""}
          </p>
          <h1 className="display-1 max-w-[24ch]">{item.title}</h1>
          <p className="lede mt-5">{item.summary}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
          <div className="grid content-start gap-10">
            <div>
              <h2 className="display-3 mb-4">Phạm vi số hoá</h2>
              <ul className="flex flex-wrap gap-2">
                {item.scope.map((scope) => (
                  <li key={scope} className="chip chip-teal text-[14px]">
                    {scope}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="display-3 mb-4">Kết quả</h2>
              <ul className="grid gap-3">
                {item.results.map((result) => (
                  <li key={result} className="flex gap-2.5 text-[16px]">
                    <Check aria-hidden className="mt-1 size-5 flex-none text-teal" />
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <aside className="card h-max p-6.5">
            <p className="font-display text-[56px] leading-none text-teal">{item.metric}</p>
            <p className="mt-2 text-[15px] text-muted">{item.metricLabel}</p>
            <dl className="mt-6 grid gap-3 border-t border-line pt-5 text-[14.5px]">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Ngành</dt>
                <dd className="font-semibold text-navy">{item.industry}</dd>
              </div>
              {item.size && (
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Quy mô</dt>
                  <dd className="font-semibold text-navy">{item.size}</dd>
                </div>
              )}
            </dl>
          </aside>
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <h2 className="display-3 mb-8">Dự án khác</h2>
          <CaseCards items={others} />
        </div>
      </section>

      <CtaPanel
        intent="tu-van"
        product="Ứng dụng thiết kế riêng"
        title={
          <>
            Trao đổi về <em>giải pháp tương tự.</em>
          </>
        }
      />
    </>
  );
}
