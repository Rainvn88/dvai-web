import { ArchiveRestore, ChartLine, Headset, ShieldAlert, Users, Wrench } from "lucide-react";
import { ChecklistPanel } from "@/components/sections/ChecklistPanel";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { Faq } from "@/components/sections/Faq";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { PageHero } from "@/components/sections/PageHero";
import { Steps } from "@/components/sections/Steps";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Dịch vụ quản trị Microsoft 365 hằng tháng",
  description:
    "Quản trị Microsoft 365, quản lý người dùng và license, giám sát bảo mật, sao lưu và hỗ trợ kỹ thuật theo gói hằng tháng cho doanh nghiệp không có IT riêng.",
  path: "/dich-vu/quan-tri-van-hanh/",
});

export default function ManagedServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Quản trị và vận hành"
        title={
          <>
            Bộ phận IT Microsoft cho doanh nghiệp <em>không có IT riêng.</em>
          </>
        }
        lede="Quản trị Microsoft 365, người dùng, license, bảo mật và sao lưu theo gói hằng tháng. Báo giá theo số người dùng và phạm vi hỗ trợ."
        primary="tu-van"
        product="Quản trị và vận hành"
      />

      <section className="section">
        <div className="wrap">
          <SectionHeading
            eyebrow="Phạm vi"
            title={
              <>
                Chúng tôi lo <em>những việc này.</em>
              </>
            }
            className="mb-10"
          />
          <FeatureCards
            items={[
              { icon: Wrench, title: "Quản trị Microsoft 365", text: "Cấu hình, chính sách, nhóm, Teams và SharePoint." },
              { icon: Users, title: "Người dùng và license", text: "Tạo, khoá tài khoản, chuyển dữ liệu khi nhân viên nghỉ; thu hồi license dư." },
              { icon: ShieldAlert, title: "Giám sát bảo mật", text: "Cảnh báo đăng nhập bất thường và email lừa đảo." },
              { icon: ArchiveRestore, title: "Sao lưu", text: "Sao lưu email, OneDrive, SharePoint và Teams." },
              { icon: Headset, title: "Hỗ trợ kỹ thuật", text: "Qua Teams, email, điện thoại và điều khiển từ xa." },
              { icon: ChartLine, title: "Báo cáo hằng tháng", text: "Sự cố đã xử lý, thay đổi đã làm và khuyến nghị." },
            ]}
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading
            eyebrow="Các mức dịch vụ"
            title={
              <>
                Chọn phạm vi <em>phù hợp.</em>
              </>
            }
            lede="Báo giá theo số người dùng và phạm vi hỗ trợ."
            className="mb-10"
          />
          <FeatureCards
            topBorder
            items={[
              { title: "Cơ bản", points: ["Quản lý người dùng và license", "Hỗ trợ trong giờ hành chính"] },
              { title: "Tiêu chuẩn", points: ["Toàn bộ gói Cơ bản", "Giám sát bảo mật", "Sao lưu Microsoft 365", "Báo cáo hằng tháng"] },
              { title: "Toàn diện", points: ["Toàn bộ gói Tiêu chuẩn", "Hỗ trợ ứng dụng Power Platform", "Ưu tiên xử lý sự cố khẩn"] },
            ]}
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Khi bạn gửi yêu cầu"
              title={
                <>
                  Yêu cầu hỗ trợ <em>được xử lý thế nào?</em>
                </>
              }
              lede="Mỗi yêu cầu được ghi nhận, xử lý và tổng hợp vào báo cáo tháng."
              className="mb-10"
            />
            <Steps
              items={[
                { title: "Gửi yêu cầu", text: "Qua Teams, email hoặc điện thoại." },
                { title: "Ghi nhận", text: "DVAI xác nhận đã nhận và hẹn thời gian xử lý." },
                { title: "Xử lý, đóng yêu cầu", text: "Ghi vào báo cáo tháng." },
              ]}
            />
          </div>
          <ChecklistPanel
            title="Báo cáo hằng tháng gồm"
            items={[
              "Số yêu cầu và thời gian xử lý.",
              "Cảnh báo bảo mật đã ghi nhận.",
              "License chưa dùng có thể thu hồi.",
              "Khuyến nghị cho tháng tiếp theo.",
            ]}
          />
        </div>
      </section>

      <Faq
        title="Câu hỏi về dịch vụ quản trị"
        items={[
          { q: "Không mua license qua DVAI thì có dùng dịch vụ quản trị được không?", a: "Được. DVAI quản trị tenant Microsoft 365 hiện có của doanh nghiệp." },
          { q: "Dịch vụ tính phí thế nào?", a: "Theo số người dùng và phạm vi hỗ trợ đã chọn. DVAI gửi báo giá sau khi nắm số người dùng và hệ thống hiện tại." },
          { q: "Có hỗ trợ máy tính, máy in không?", a: "Phạm vi chính là hệ thống Microsoft 365, Power Platform và Azure. Hỗ trợ thiết bị văn phòng được trao đổi riêng theo nhu cầu." },
        ]}
      />

      <CtaPanel
        intent="tu-van"
        product="Quản trị và vận hành"
        title={
          <>
            Chọn phạm vi quản trị <em>phù hợp số người dùng.</em>
          </>
        }
      />
    </>
  );
}
