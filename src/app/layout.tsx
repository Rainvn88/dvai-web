import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Lora } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { JsonLd, organizationJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import "./globals.css";

const body = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const heading = Lora({
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "DVAI | Microsoft Cloud & Business Solutions for SMEs in Vietnam",
    template: "%s | DVAI",
  },
  description: site.description,
  applicationName: "DVAI",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "DVAI",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "DVAI" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#053a6b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${body.variable} ${heading.variable}`}>
      <body className="flex min-h-dvh flex-col pb-[76px] sm:pb-0">
        <a
          href="#noi-dung"
          className="sr-only z-[60] rounded-lg bg-navy px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Bỏ qua menu, đến nội dung chính
        </a>
        <SiteHeader />
        <main id="noi-dung" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MobileCtaBar />
        <JsonLd data={organizationJsonLd} />
      </body>
    </html>
  );
}
