import Link from "next/link";
import { articles, formatDate, type Article } from "@/content/articles";

export function ArticleCards({ items = articles.slice(0, 3) }: { items?: Article[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((article) => (
        <Link
          key={article.slug}
          href={`/kien-thuc/${article.slug}/`}
          className="group card flex flex-col gap-2.5 p-6 transition-colors hover:border-teal"
        >
          <span className="text-[12.5px] font-semibold text-blue">{article.category}</span>
          <h3 className="font-display text-[20px] leading-snug font-medium text-navy transition-colors group-hover:text-teal">
            {article.title}
          </h3>
          <p className="text-[14px] text-muted">{article.excerpt}</p>
          <span className="mt-auto pt-2 text-[12.5px] text-muted">
            Cập nhật {formatDate(article.updated)}, {article.readMinutes} phút đọc
          </span>
        </Link>
      ))}
    </div>
  );
}
