import { Suspense } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { LeadFormFromQuery } from "@/components/forms/LeadFormFromQuery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Liên hệ, nhận báo giá và đặt lịch tư vấn",
  description: `Nhận báo giá Microsoft 365, Power Apps, Azure hoặc đặt lịch tư vấn với DVAI. Phản hồi trong ${site.responseTime}. Hotline ${site.hotline}.`,
  path: "/lien-he/",
});

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-line bg-[linear-gradient(135deg,#e2f1f4_0%,#f7fbfc_48%,#e7eef8_100%)] pt-12 pb-14 md:pt-16 md:pb-16">
        <div className="wrap">
          <SectionHeading
            as="h1"
            size={1}
            eyebrow="Liên hệ"
            eyebrowStyle="dash"
            title={
              <>
                Nhận báo giá hoặc <em>đặt lịch tư vấn.</em>
              </>
            }
            lede={`Gửi thông tin, chúng tôi phản hồi trong ${site.responseTime}.`}
          />
        </div>
      </section>

      <section className="section">
        <div className="wrap grid items-start gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.8fr)]">
          <div className="rounded-[16px] border border-line bg-white shadow-[0_12px_32px_rgb(7_43_78/0.06)]">
            <Suspense fallback={<LeadForm variant="full" />}>
              <LeadFormFromQuery />
            </Suspense>
          </div>

          <aside className="grid gap-4">
            <div className="card grid gap-4 p-6">
              <h2 className="text-[17px] font-semibold text-navy">Liên hệ trực tiếp</h2>
              <a href={`tel:${site.hotline}`} className="flex items-center gap-3 text-[15px] hover:text-teal">
                <span className="icon-tile bg-teal-soft text-teal">
                  <Phone aria-hidden className="size-5" />
                </span>
                <span>
                  <span className="block text-[13px] text-muted">Hotline</span>
                  <span className="font-semibold text-navy">{site.hotline}</span>
                </span>
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-[15px] hover:text-teal">
                <span className="icon-tile bg-teal-soft text-teal">
                  <Mail aria-hidden className="size-5" />
                </span>
                <span>
                  <span className="block text-[13px] text-muted">Email</span>
                  <span className="font-semibold text-navy">{site.email}</span>
                </span>
              </a>
            </div>
            {site.offices.map((office) => (
              <div key={office.name} className="card flex gap-3 p-6">
                <span className="icon-tile bg-blue-soft text-blue">
                  <MapPin aria-hidden className="size-5" />
                </span>
                <div>
                  <h2 className="text-[15.5px] font-semibold text-navy">{office.name}</h2>
                  <p className="mt-1 text-[14.5px] text-muted">{office.address}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-more mt-2"
                  >
                    Xem bản đồ →
                  </a>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </section>
    </>
  );
}
