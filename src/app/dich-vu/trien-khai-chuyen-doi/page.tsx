import { Building2, FolderOpen, KeyRound, Mail, RefreshCw, Users } from "lucide-react";
import { ChecklistPanel } from "@/components/sections/ChecklistPanel";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { Faq } from "@/components/sections/Faq";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { PageHero } from "@/components/sections/PageHero";
import { Steps } from "@/components/sections/Steps";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Chuyển email và dữ liệu sang Microsoft 365",
  description:
    "Chuyển email từ Gmail, Google Workspace, hosting mail và dữ liệu từ máy chủ file sang Microsoft 365, giữ nguyên thư cũ, đổi MX ngoài giờ làm việc.",
  path: "/dich-vu/trien-khai-chuyen-doi/",
});

export default function MigrationPage() {
  return (
    <>
      <PageHero
        eyebrow="Triển khai và chuyển đổi"
        title={
          <>
            Chuyển email và dữ liệu sang Microsoft 365 <em>mà không dừng công việc.</em>
          </>
        }
        lede="Từ Gmail, Google Workspace, hosting mail hoặc máy chủ file. Giữ nguyên thư cũ, lịch và tài liệu."
        primary="tu-van"
        product="Chuyển đổi dữ liệu"
      />

      <section className="section">
        <div className="wrap">
          <SectionHeading
            eyebrow="Loại chuyển đổi"
            title={
              <>
                Chúng tôi <em>chuyển từ đâu?</em>
              </>
            }
            className="mb-10"
          />
          <FeatureCards
            items={[
              { icon: Mail, title: "Hosting mail sang Exchange Online", text: "Từ cPanel, Zimbra và các hosting mail khác." },
              { icon: RefreshCw, title: "Google Workspace sang Microsoft 365", text: "Email, lịch và tài liệu trên Drive." },
              { icon: FolderOpen, title: "Máy chủ file, NAS lên SharePoint", text: "Sắp xếp lại thư mục theo phòng ban và phân quyền." },
              { icon: Building2, title: "Từ tenant này sang tenant khác", text: "Khi sáp nhập, đổi tên hoặc tách công ty." },
              { icon: Users, title: "Triển khai mới", text: "Cho doanh nghiệp mới thành lập hoặc chưa có email tên miền." },
              { icon: KeyRound, title: "Bảo mật nền tảng", text: "Xác thực đa yếu tố, chính sách mật khẩu, chống giả mạo email." },
            ]}
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading eyebrow="Quy trình" title={<>Quy trình chuyển đổi <em>6 bước.</em></>} className="mb-12" />
          <Steps
            items={[
              { title: "Khảo sát", text: "Số hộp thư, dung lượng, cấu trúc thư mục." },
              { title: "Lập kế hoạch", text: "Lịch chuyển và thông báo cho người dùng." },
              { title: "Chuyển trước dữ liệu cũ", text: "Trong khi hệ thống cũ vẫn chạy." },
              { title: "Đổi MX ngoài giờ", text: "Buổi tối hoặc cuối tuần để hạn chế gián đoạn." },
              { title: "Chuyển phần còn lại", text: "Đồng bộ lần cuối và đối chiếu." },
              { title: "Hỗ trợ sau chuyển", text: "Hướng dẫn người dùng và xử lý vướng mắc." },
            ]}
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Cam kết"
            title={
              <>
                Dữ liệu cũ <em>được giữ nguyên.</em>
              </>
            }
            lede="Mỗi đợt chuyển đổi có biên bản đối chiếu số lượng thư và thư mục giữa hệ thống cũ và Microsoft 365."
          />
          <ChecklistPanel
            title="Khi chuyển đổi, DVAI"
            items={[
              "Chuyển thư cũ trước, khi người dùng vẫn làm việc bình thường.",
              "Đổi bản ghi MX ngoài giờ làm việc.",
              "Đối chiếu số lượng thư và thư mục, có biên bản.",
              "Hướng dẫn người dùng cài Outlook, Teams trên máy tính và điện thoại.",
            ]}
          />
        </div>
      </section>

      <Faq
        title="Câu hỏi về chuyển đổi"
        items={[
          { q: "Mất bao lâu để chuyển xong?", a: "Tuỳ số hộp thư và dung lượng dữ liệu. DVAI báo lịch cụ thể sau bước khảo sát." },
          { q: "Nhân viên có phải cài lại gì không?", a: "Nhân viên đăng nhập Outlook, Teams bằng tài khoản Microsoft 365 mới. DVAI hướng dẫn cài đặt trên máy tính và điện thoại." },
          { q: "Có phải dừng làm việc khi chuyển không?", a: "Không. Phần lớn thư được chuyển trong khi hệ thống cũ vẫn chạy; bước đổi MX làm ngoài giờ làm việc." },
          { q: "Giữ được thư từ nhiều năm trước không?", a: "Được. Thư cũ được chuyển sang hộp thư Microsoft 365, trong giới hạn dung lượng của gói license." },
        ]}
      />

      <CtaPanel
        intent="tu-van"
        product="Chuyển đổi dữ liệu"
        title={
          <>
            Lên kế hoạch chuyển đổi <em>cho doanh nghiệp của bạn.</em>
          </>
        }
      />
    </>
  );
}
