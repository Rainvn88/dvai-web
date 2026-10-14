import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { caseStudies } from "@/content/cases";
import { site } from "@/content/site";

export const dynamic = "force-static";

const LAST_UPDATED = "2026-10-14";

const pages = [
  "/",
  "/microsoft-365/",
  "/power-apps/",
  "/power-automate/",
  "/power-bi/",
  "/azure/",
  "/copilot/",
  "/dich-vu/trien-khai-chuyen-doi/",
  "/dich-vu/quan-tri-van-hanh/",
  "/du-an/",
  "/kien-thuc/",
  "/ve-chung-toi/",
  "/lien-he/",
  "/chinh-sach-bao-mat/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((path) => ({ url: `${site.url}${path}`, lastModified: LAST_UPDATED })),
    ...caseStudies.map((item) => ({ url: `${site.url}/du-an/${item.slug}/`, lastModified: LAST_UPDATED })),
    ...articles.map((article) => ({ url: `${site.url}/kien-thuc/${article.slug}/`, lastModified: article.updated })),
  ];
}
