import type { Metadata } from "next";

/** Metadata chuẩn cho từng trang: tiêu đề, mô tả, canonical và Open Graph. */
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      locale: "vi_VN",
      siteName: "DVAI",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "DVAI" }],
    },
  };
}
