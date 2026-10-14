import { Check } from "lucide-react";
import { LeadButtons } from "@/components/ui/LeadButtons";

const points = [
  "Giao diện thiết kế theo quy trình thực tế",
  "Cơ sở dữ liệu riêng, nằm trong hệ thống của bạn",
  "Tính năng theo nghiệp vụ, phân quyền theo vai trò",
  "Bổ sung tính năng khi doanh nghiệp phát triển",
];

/** Khối «Ứng dụng thiết kế riêng» theo yêu cầu của DVAI. */
export function CustomAppBlock({ id }: { id?: string }) {
  return (
    <div
      id={id}
      className="mt-4 grid scroll-mt-24 items-center gap-6 rounded-2xl border border-teal/22 bg-[linear-gradient(120deg,var(--color-teal-soft)_0%,#f7fbfc_75%)] px-5 py-6.5 sm:px-10 sm:py-9.5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-11"
    >
      <div>
        <span className="mb-3.5 inline-block rounded-full border border-teal/22 bg-white px-2.75 py-1 text-[12px] font-semibold text-teal">
          Thiết kế riêng
        </span>
        <h3 className="display-3 mb-3.5">
          Bạn muốn một ứng dụng vận hành <em>làm riêng cho nghiệp vụ</em> của công ty?
        </h3>
        <p className="max-w-[60ch] text-[15.5px] text-muted">
          Giao diện, cơ sở dữ liệu và từng tính năng đều thiết kế theo đúng cách công ty bạn đang làm việc. Khi cần
          thêm tính năng, chúng tôi phát triển tiếp trên chính ứng dụng đó.
        </p>
        <p className="mt-3 max-w-[60ch] text-[15.5px] text-ink">
          <strong className="font-semibold text-navy">Chi phí hợp lý hơn bạn nghĩ.</strong> Trong nhiều trường hợp,
          ứng dụng chạy ngay trên Microsoft 365 doanh nghiệp đã có, không phải mua máy chủ hay phần mềm đóng gói
          riêng.
        </p>
      </div>
      <div>
        <ul className="mb-6 grid gap-3.25">
          {points.map((point) => (
            <li key={point} className="flex gap-2.5 text-[15px] font-medium text-navy">
              <Check aria-hidden className="mt-0.5 size-5 flex-none text-teal" />
              {point}
            </li>
          ))}
        </ul>
        <LeadButtons primary="tu-van" product="Ứng dụng thiết kế riêng" />
      </div>
    </div>
  );
}
