import { Check } from "lucide-react";
import { AiAgentCards, DevStatus, DocCheckMock } from "@/components/sections/AiAgents";
import { CaseCards } from "@/components/sections/CaseCards";
import { ChecklistPanel } from "@/components/sections/ChecklistPanel";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { Faq } from "@/components/sections/Faq";
import { FlowDiagram } from "@/components/sections/FlowDiagram";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { caseStudies } from "@/content/cases";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "AI Agent hải quan và logistics: mã HS, chứng từ, tờ khai",
  description:
    "AI Agent dùng mô hình Claude của Anthropic để xác định mã HS, đối chiếu Invoice, Packing List, B/L, điền trước tờ khai hải quan, hồ sơ kiểm tra chuyên ngành và đề xuất bố trí xe tải.",
  path: "/giai-phap/ai-agent-hai-quan/",
});

const logisticsCases = caseStudies.filter((c) => c.industry === "Logistics" || c.industry === "Forwarder");

export default function AiCustomsPage() {
  return (
    <>
      <PageHero
        eyebrow="AI Agent cho hải quan và logistics"
        title={
          <>
            Tự động hoá khai báo hải quan và vận hành logistics <em>bằng AI Agent.</em>
          </>
        }
        lede="DVAI xây AI Agent dùng mô hình Claude của Anthropic để đọc chứng từ, xác định mã HS, điền trước tờ khai và hồ sơ kiểm tra chuyên ngành, đề xuất bố trí xe tải. Nhân viên kiểm tra và quyết định ở bước cuối."
        primary="tu-van"
        product="AI Agent hải quan và logistics"
        trust={["Dùng mô hình Claude của Anthropic", "Nhân viên duyệt trước khi nộp", "Xây trên hệ thống đã chạy thực tế"]}
        aside={<DocCheckMock />}
      />

      <section className="section">
        <div className="wrap">
          <DevStatus className="mb-5" />
          <SectionHeading
            eyebrow="4 AI Agent"
            title={
              <>
                Mỗi agent lo <em>một khâu nghiệp vụ.</em>
              </>
            }
            lede="Claude đóng vai trò công cụ suy luận và xử lý cốt lõi: đọc chứng từ, hiểu mô tả hàng hoá, đối chiếu thông tin và đưa ra đề xuất."
            className="mb-10"
          />
          <AiAgentCards />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading
            eyebrow="Cách hoạt động"
            title={
              <>
                Từ chứng từ đến tờ khai, <em>có người duyệt ở cuối.</em>
              </>
            }
            className="mb-10"
          />
          <FlowDiagram
            label="Quy trình xử lý của AI Agent hải quan"
            nodes={[
              { title: "Chứng từ đầu vào", text: "Invoice, Packing List, B/L, catalogue" },
              { title: "AI Agent đọc và suy luận", text: "Trích xuất, phân loại, đối chiếu thông tin" },
              { title: "Cảnh báo", text: "Đánh dấu chỗ lệch, thông tin còn thiếu" },
              { title: "Nhân viên duyệt", text: "Sửa và xác nhận kết quả" },
              { title: "Dữ liệu đầu ra", text: "Tờ khai, hồ sơ, phương án xe" },
            ]}
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Nguyên tắc"
            title={
              <>
                AI đề xuất, <em>người quyết định.</em>
              </>
            }
            lede="AI Agent làm phần đọc, nhập và đối chiếu tốn nhiều giờ công. Nhân viên giao nhận và người khai hải quan tập trung vào kiểm tra và ra quyết định."
          />
          <ChecklistPanel
            title="Trong mọi bước"
            items={[
              "Mã HS là đề xuất; người khai hải quan xác nhận trước khi khai báo.",
              "Chỗ lệch giữa Invoice, Packing List và B/L được đánh dấu để kiểm tra lại.",
              "Tờ khai và hồ sơ chỉ được điền trước; nhân viên duyệt rồi mới nộp.",
              "Trách nhiệm khai báo vẫn thuộc doanh nghiệp theo quy định hải quan.",
            ]}
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading
            eyebrow="Nền tảng"
            title={
              <>
                Từ số hoá quy trình <em>đến tự động hoá bằng AI.</em>
              </>
            }
            lede="DVAI phát triển AI Agent trên nền các hệ thống đã triển khai thực tế cho doanh nghiệp giao nhận vận tải và logistics 60–100 nhân sự."
            className="mb-10"
          />
          <div className="mb-8 grid gap-4 md:grid-cols-2">
            <div className="card grid content-start gap-3 p-6.5">
              <span className="chip chip-teal w-max">Đang cung cấp</span>
              <h3 className="text-[17px] font-semibold text-navy">Số hoá quy trình nghiệp vụ</h3>
              <ul className="grid gap-2.5 text-[15px]">
                <li className="flex gap-2">
                  <Check aria-hidden className="mt-1 size-4 flex-none text-teal" />
                  Ứng dụng cho điều vận, thông quan, thanh toán, KPI
                </li>
                <li className="flex gap-2">
                  <Check aria-hidden className="mt-1 size-4 flex-none text-teal" />
                  Đã giúp doanh nghiệp giảm 20–50% thời gian vận hành
                </li>
              </ul>
            </div>
            <div className="card grid content-start gap-3 border-teal/40 p-6.5">
              <span className="chip w-max">Đang phát triển</span>
              <h3 className="text-[17px] font-semibold text-navy">Tự động hoá hải quan bằng AI</h3>
              <ul className="grid gap-2.5 text-[15px]">
                <li className="flex gap-2">
                  <Check aria-hidden className="mt-1 size-4 flex-none text-teal" />
                  AI Agent đọc chứng từ, suy luận và điền trước dữ liệu
                </li>
                <li className="flex gap-2">
                  <Check aria-hidden className="mt-1 size-4 flex-none text-teal" />
                  Claude là công cụ suy luận và xử lý cốt lõi
                </li>
              </ul>
            </div>
          </div>
          <p className="mb-4 text-[14px] text-muted">Kết quả của các ứng dụng số hoá quy trình đã triển khai:</p>
          <CaseCards items={logisticsCases} />
        </div>
      </section>

      <Faq
        title="Câu hỏi về AI Agent hải quan"
        items={[
          {
            q: "AI Agent có tự nộp tờ khai không?",
            a: "Không. AI Agent điền trước dữ liệu vào tờ khai và hồ sơ; nhân viên kiểm tra, sửa nếu cần và tự nộp.",
          },
          {
            q: "Mã HS do AI đề xuất có chính xác tuyệt đối không?",
            a: "Không hệ thống nào bảo đảm tuyệt đối. Mã HS là đề xuất kèm căn cứ để người khai hải quan kiểm tra; trách nhiệm phân loại vẫn thuộc doanh nghiệp.",
          },
          {
            q: "Chứng từ của doanh nghiệp có bị dùng để huấn luyện AI không?",
            a: "Chứng từ được xử lý qua Claude API. Theo điều khoản thương mại của Anthropic, dữ liệu khách hàng gửi qua API không được dùng để huấn luyện mô hình.",
          },
          {
            q: "Khi nào doanh nghiệp dùng được?",
            a: "Giải pháp đang trong giai đoạn phát triển. DVAI đang nhận doanh nghiệp giao nhận và logistics tham gia thử nghiệm.",
          },
        ]}
      />

      <CtaPanel
        intent="tu-van"
        product="AI Agent hải quan và logistics"
        title={
          <>
            Tham gia thử nghiệm <em>AI Agent hải quan.</em>
          </>
        }
        lede="Trao đổi 30 phút qua Teams về quy trình khai báo và chứng từ của doanh nghiệp bạn."
      />
    </>
  );
}
