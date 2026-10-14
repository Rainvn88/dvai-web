import Link from "next/link";
import { notFound } from "next/navigation";
import { Info } from "lucide-react";
import { ArticleCards } from "@/components/sections/ArticleCards";
import { JsonLd } from "@/components/seo/JsonLd";
import { articles, formatDate, type ArticleBlock } from "@/content/articles";
import { ctaLabels, leadHref, site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps<"/kien-thuc/[slug]">) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return pageMeta({ title: article.title, description: article.excerpt, path: `/kien-thuc/${article.slug}/` });
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h2":
      return <h2>{block.text}</h2>;
    case "ul":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-[15px] leading-normal">
            <thead>
              <tr className="bg-[#f6f9fa]">
                {block.head.map((cell) => (
                  <th key={cell} scope="col" className="px-4 py-3 text-left text-[13px] font-semibold text-muted">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]} className="border-t border-line">
                  {row.map((cell, index) =>
                    index === 0 ? (
                      <th key={index} scope="row" className="px-4 py-3 text-left font-medium text-navy">
                        {cell}
                      </th>
                    ) : (
                      <td key={index} className="px-4 py-3">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "note":
      return (
        <p className="flex gap-3 rounded-xl border border-blue/16 bg-blue-soft p-4 text-[15.5px] text-navy">
          <Info aria-hidden className="mt-1 size-5 flex-none text-blue" />
          {block.text}
        </p>
      );
    case "cta":
      return (
        <div className="on-dark grid gap-4 rounded-2xl bg-navy p-6 text-white sm:flex sm:items-center sm:justify-between">
          <p className="max-w-[46ch] text-[16px] leading-relaxed">{block.text}</p>
          <Link href={leadHref(block.intent)} className="btn btn-primary flex-none">
            {ctaLabels[block.intent]}
          </Link>
        </div>
      );
  }
}

export default async function ArticlePage({ params }: PageProps<"/kien-thuc/[slug]">) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="border-b border-line bg-[linear-gradient(135deg,#e2f1f4_0%,#f7fbfc_48%,#e7eef8_100%)] pt-10 pb-12 md:pt-14 md:pb-16">
          <div className="wrap max-w-[860px]">
            <nav aria-label="Đường dẫn" className="mb-6 text-[13.5px] text-muted">
              <Link href="/kien-thuc/" className="hover:text-teal">
                Kiến thức
              </Link>{" "}
              / {article.category}
            </nav>
            <h1 className="display-1">{article.title}</h1>
            <p className="mt-5 text-[14px] text-muted">
              Cập nhật <time dateTime={article.updated}>{formatDate(article.updated)}</time>, {article.readMinutes} phút đọc
            </p>
          </div>
        </header>
        <div className="wrap max-w-[860px] py-12 md:py-16">
          <div className="article-body max-w-[70ch]">
            {article.blocks.map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </div>
          <p className="mt-10 border-t border-line pt-6">
            <Link href={article.relatedHref} className="link-more">
              {article.relatedLabel} →
            </Link>
          </p>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section pt-0">
          <div className="wrap">
            <h2 className="display-3 mb-8">Bài viết liên quan</h2>
            <ArticleCards items={related} />
          </div>
        </section>
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.excerpt,
          dateModified: article.updated,
          datePublished: article.updated,
          inLanguage: "vi",
          author: { "@type": "Organization", name: site.name },
          publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/brand/logo-dvai.png` } },
          mainEntityOfPage: `${site.url}/kien-thuc/${article.slug}/`,
        }}
      />
    </>
  );
}
