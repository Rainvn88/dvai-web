import { Bot, Inbox, ScanText } from "lucide-react";
import { ChecklistPanel } from "@/components/sections/ChecklistPanel";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { Faq } from "@/components/sections/Faq";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { PageHero } from "@/components/sections/PageHero";
import { Steps } from "@/components/sections/Steps";
import { Tabs } from "@/components/sections/Tabs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Microsoft 365 Copilot và Copilot Studio cho doanh nghiệp",
  description:
    "Microsoft 365 Copilot trong Word, Excel, Outlook, Teams và trợ lý AI riêng với Copilot Studio. Đánh giá sẵn sàng dữ liệu, thử nghiệm và đào tạo theo vai trò.",
  path: "/copilot/",
});

export default function CopilotPage() {
  return (
    <>
      <PageHero
        eyebrow="Copilot và AI"
        title={
          <>
            AI làm việc trên email, tài liệu và cuộc họp <em>của chính doanh nghiệp bạn.</em>
          </>
        }
        lede="Microsoft 365 Copilot chạy trong Word, Excel, Outlook, Teams. DVAI rà soát dữ liệu, phân quyền và đào tạo để doanh nghiệp dùng AI an toàn ngay từ đầu."
        primary="tu-van"
        product="Copilot"
      />

      <section className="section">
        <div className="wrap">
          <SectionHeading
            eyebrow="Các lựa chọn"
            title={
              <>
                Chọn loại Copilot <em>phù hợp.</em>
              </>
            }
            className="mb-10"
          />
          <FeatureCards
            tone="blue"
            topBorder
            items={[
              { title: "Microsoft 365 Copilot Chat", text: "Có sẵn cho người dùng Microsoft 365. Hỏi đáp với AI trên web, có bảo vệ dữ liệu doanh nghiệp." },
              { title: "Microsoft 365 Copilot", text: "Add-on theo người dùng. Làm việc trực tiếp trên email, tài liệu, cuộc họp của công ty trong Word, Excel, Outlook, Teams." },
              { title: "Copilot Studio", text: "Xây trợ lý AI riêng, ví dụ trả lời chính sách nội bộ hoặc tra cứu đơn hàng. Tính phí theo mức sử dụng." },
            ]}
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading eyebrow="Theo vai trò" title={<>Copilot giúp gì <em>cho từng vị trí?</em></>} className="mb-10" />
          <Tabs
            label="Copilot theo vai trò"
            items={[
              { label: "Giám đốc", title: "Nắm việc nhanh hơn", text: "Tóm tắt email dài, chuẩn bị nội dung trước cuộc họp.", points: ["Tóm tắt chuỗi email", "Chuẩn bị nội dung họp từ tài liệu liên quan", "Soạn thông báo nội bộ"] },
              { label: "Kinh doanh", title: "Soạn nội dung với khách", text: "Soạn email, báo giá từ thông tin đã có.", points: ["Soạn email trả lời khách hàng", "Tạo bản nháp báo giá, đề xuất", "Tóm tắt lịch sử trao đổi"] },
              { label: "Kế toán", title: "Phân tích số liệu", text: "Hỏi đáp và phân tích dữ liệu trong Excel bằng tiếng nói tự nhiên.", points: ["Tìm xu hướng, điểm bất thường", "Tạo công thức, bảng tổng hợp", "Giải thích số liệu cho người không chuyên"] },
              { label: "Vận hành", title: "Họp ít mất thời gian hơn", text: "Tóm tắt cuộc họp Teams và việc cần làm.", points: ["Biên bản họp tự động", "Danh sách việc cần làm và người phụ trách", "Tóm tắt cho người vắng mặt"] },
            ]}
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Sẵn sàng cho Copilot"
            title={
              <>
                Trước khi bật Copilot, <em>dữ liệu cần được phân quyền đúng.</em>
              </>
            }
            lede="Copilot thấy mọi tài liệu mà người dùng có quyền xem. Thư mục chia sẻ quá rộng có thể làm lộ dữ liệu qua câu trả lời của AI."
          />
          <ChecklistPanel
            title="Đánh giá sẵn sàng gồm"
            items={[
              "Rà quyền truy cập SharePoint, OneDrive, Teams.",
              "Gắn nhãn cho dữ liệu nhạy cảm.",
              "Bật xác thực đa yếu tố cho tài khoản.",
              "Báo cáo rủi ro và kế hoạch xử lý.",
            ]}
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading eyebrow="Thử nghiệm" title={<>Thử Copilot với <em>một nhóm nhỏ trước.</em></>} className="mb-12" />
          <Steps
            items={[
              { title: "Đánh giá sẵn sàng", text: "Rà dữ liệu và phân quyền." },
              { title: "Thử nghiệm", text: "Một nhóm người dùng dùng thật trong công việc." },
              { title: "Đào tạo theo vai trò", text: "Cách đặt câu hỏi cho từng vị trí." },
              { title: "Đo hiệu quả", text: "Quyết định mở rộng dựa trên kết quả." },
            ]}
          />
        </div>
      </section>

      <section className="section scroll-mt-20 pt-0" id="ai-workflow">
        <div className="wrap">
          <SectionHeading eyebrow="AI workflow" title={<>Tự động hoá <em>bằng AI.</em></>} className="mb-10" />
          <FeatureCards
            items={[
              { icon: Bot, title: "Trợ lý nội bộ trên Teams", text: "Trả lời câu hỏi về quy trình, chính sách công ty với Copilot Studio." },
              { icon: ScanText, title: "Đọc hoá đơn, chứng từ", text: "Trích số liệu tự động với AI Builder và Power Automate." },
              { icon: Inbox, title: "Phân loại email khách hàng", text: "Tự nhận diện nội dung và tạo yêu cầu xử lý cho đúng bộ phận." },
            ]}
          />
        </div>
      </section>

      <Faq
        title="Câu hỏi về Copilot"
        items={[
          { q: "Microsoft có dùng dữ liệu của doanh nghiệp để huấn luyện AI không?", a: "Theo cam kết của Microsoft, câu hỏi, câu trả lời và dữ liệu doanh nghiệp mà Microsoft 365 Copilot truy cập không được dùng để huấn luyện các mô hình nền tảng." },
          { q: "Cần gói Microsoft 365 nào để mua Copilot?", a: "Microsoft 365 Copilot là add-on, mua thêm cho người dùng đã có gói Microsoft 365 đủ điều kiện như Business Basic, Business Standard hoặc Business Premium." },
          { q: "Có phải mua cho cả công ty không?", a: "Không. Có thể mua cho từng người dùng, nên bắt đầu với nhóm thử nghiệm rồi mở rộng." },
          { q: "Copilot có dùng được với tiếng Việt không?", a: "Microsoft 365 Copilot hỗ trợ tiếng Việt. Chất lượng câu trả lời phụ thuộc nhiều vào việc dữ liệu được sắp xếp và phân quyền đúng." },
        ]}
      />

      <CtaPanel
        intent="tu-van"
        product="Copilot"
        title={
          <>
            Đánh giá mức sẵn sàng Copilot <em>của doanh nghiệp.</em>
          </>
        }
      />
    </>
  );
}
