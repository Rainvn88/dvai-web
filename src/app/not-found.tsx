import Link from "next/link";
import { leadHref } from "@/content/site";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap max-w-[760px]">
        <p className="eyebrow eyebrow-dash mb-5">Lỗi 404</p>
        <h1 className="display-1">Không tìm thấy trang này</h1>
        <p className="lede mt-5">
          Đường dẫn có thể đã thay đổi hoặc bị gõ sai. Bạn có thể về trang chủ hoặc liên hệ trực tiếp với DVAI.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">
            Về trang chủ
          </Link>
          <Link href={leadHref("tu-van")} className="btn btn-secondary">
            Đặt lịch tư vấn
          </Link>
        </div>
      </div>
    </section>
  );
}
