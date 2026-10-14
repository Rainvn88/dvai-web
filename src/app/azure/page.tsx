import { ArchiveRestore, Clock, HardDrive, KeyRound, Laptop, RefreshCw, Server, ShieldAlert } from "lucide-react";
import { ChecklistPanel } from "@/components/sections/ChecklistPanel";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { Faq } from "@/components/sections/Faq";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { PageHero } from "@/components/sections/PageHero";
import { Steps } from "@/components/sections/Steps";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Azure: máy chủ, sao lưu và bảo mật trên cloud",
  description:
    "Chuyển máy chủ, phần mềm kế toán, ERP và dữ liệu lên Azure. Máy ảo, Azure Backup, lưu trữ, Entra ID, có bảng ước tính chi phí trước khi triển khai.",
  path: "/azure/",
});

export default function AzurePage() {
  return (
    <>
      <PageHero
        eyebrow="Azure"
        title={
          <>
            Đưa máy chủ, phần mềm và dữ liệu <em>lên Azure.</em>
          </>
        }
        lede="Thay máy chủ đặt tại văn phòng bằng hạ tầng cloud của Microsoft, có sao lưu, bảo mật và bảng ước tính chi phí trước khi triển khai."
        primary="bao-gia"
        product="Azure"
        trust={["Ước tính chi phí trước khi triển khai", "Chuyển hệ thống ngoài giờ làm việc", "Cảnh báo khi chi phí vượt ngân sách"]}
      />

      <section className="section">
        <div className="wrap">
          <SectionHeading
            eyebrow="Dịch vụ Azure"
            title={
              <>
                Dịch vụ Azure cho <em>doanh nghiệp vừa và nhỏ.</em>
              </>
            }
            className="mb-10"
          />
          <FeatureCards
            tone="blue"
            items={[
              { icon: Server, title: "Máy ảo", text: "Chạy phần mềm kế toán, ERP, ứng dụng nội bộ trên Azure Virtual Machines." },
              { icon: ArchiveRestore, title: "Sao lưu", text: "Azure Backup cho máy chủ, máy ảo và thư mục quan trọng." },
              { icon: HardDrive, title: "Lưu trữ", text: "Azure Files thay ổ chia sẻ, NAS đặt tại văn phòng." },
              { icon: RefreshCw, title: "Chuyển lên cloud", text: "Azure Migrate đánh giá và chuyển máy chủ hiện có." },
              { icon: KeyRound, title: "Danh tính", text: "Microsoft Entra ID: một tài khoản cho mọi ứng dụng, xác thực đa yếu tố." },
              { icon: ShieldAlert, title: "Bảo mật", text: "Defender for Cloud giám sát và cảnh báo rủi ro bảo mật." },
            ]}
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading
            eyebrow="Tình huống"
            title={
              <>
                Khi nào nên <em>dùng Azure?</em>
              </>
            }
            className="mb-10"
          />
          <FeatureCards
            columns={4}
            items={[
              { icon: Clock, title: "Máy chủ văn phòng đã cũ", text: "Sắp hết bảo hành, rủi ro hỏng hóc tăng." },
              { icon: Laptop, title: "Cần truy cập từ xa an toàn", text: "Phần mềm kế toán, ERP dùng được khi làm việc ngoài văn phòng." },
              { icon: ArchiveRestore, title: "Chưa có bản sao lưu ngoài văn phòng", text: "Dữ liệu chỉ nằm ở một nơi." },
              { icon: Server, title: "Cần môi trường cho web, API", text: "Chạy ứng dụng web và tích hợp hệ thống." },
            ]}
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Chi phí"
            title={
              <>
                Biết trước <em>chi phí Azure hằng tháng.</em>
              </>
            }
            lede="Chi phí Azure tính theo mức sử dụng. DVAI lập bảng ước tính theo cấu hình thực tế trước khi triển khai, và đặt cảnh báo khi chi phí vượt ngân sách."
          />
          <ChecklistPanel
            title="Cách giữ chi phí hợp lý"
            items={[
              "Chọn đúng cấu hình máy theo tải thực tế.",
              "Tắt máy ảo ngoài giờ làm việc khi không cần chạy liên tục.",
              "Đặt trước 1 hoặc 3 năm (Reserved Instances) cho máy chạy ổn định.",
              "Theo dõi chi phí hằng tháng và cảnh báo vượt ngân sách.",
            ]}
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading eyebrow="Quy trình" title={<>Chuyển lên Azure <em>trong 5 bước.</em></>} className="mb-12" />
          <Steps
            items={[
              { title: "Đánh giá hệ thống", text: "Máy chủ, phần mềm, dung lượng dữ liệu hiện tại." },
              { title: "Thiết kế, ước tính", text: "Kiến trúc và bảng chi phí hằng tháng." },
              { title: "Chuyển thử", text: "Chạy thử và kiểm tra trên Azure." },
              { title: "Chuyển chính thức", text: "Làm ngoài giờ để hạn chế gián đoạn." },
              { title: "Vận hành", text: "Sao lưu, giám sát và tối ưu chi phí." },
            ]}
          />
        </div>
      </section>

      <Faq
        title="Câu hỏi về Azure"
        items={[
          { q: "Azure khác thuê VPS trong nước thế nào?", a: "Azure có sẵn nhiều dịch vụ quản lý như sao lưu, khôi phục, giám sát bảo mật và mở rộng cấu hình khi cần. Lựa chọn phụ thuộc phần mềm, yêu cầu dữ liệu và ngân sách; DVAI so sánh cụ thể khi khảo sát." },
          { q: "Dữ liệu đặt ở đâu?", a: "Doanh nghiệp chọn vùng trung tâm dữ liệu khi tạo tài nguyên, ví dụ vùng Southeast Asia đặt tại Singapore." },
          { q: "Chi phí Azure tính thế nào?", a: "Theo mức sử dụng: cấu hình máy, dung lượng lưu trữ, băng thông và thời gian chạy. DVAI lập bảng ước tính trước và đặt cảnh báo ngân sách hằng tháng." },
          { q: "Mất internet ở văn phòng thì sao?", a: "Hệ thống trên Azure vẫn chạy, nhân viên có thể truy cập từ nơi khác có internet. Nên có đường truyền dự phòng nếu phần mềm dùng hằng ngày đặt trên cloud." },
        ]}
      />

      <CtaPanel
        product="Azure"
        title={
          <>
            Nhận ước tính chi phí Azure <em>cho hệ thống của bạn.</em>
          </>
        }
      />
    </>
  );
}
