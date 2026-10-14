import { site } from "@/content/site";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Thoát ký tự "<" để chuỗi JSON không đóng thẻ script.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: site.legalName,
  alternateName: site.englishName,
  url: site.url,
  logo: `${site.url}/brand/logo-dvai.png`,
  email: site.email,
  telephone: site.hotline,
  taxID: site.taxId,
  address: site.offices.map((office) => ({
    "@type": "PostalAddress",
    streetAddress: office.address,
    addressLocality: office.locality,
    addressCountry: "VN",
  })),
};

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
