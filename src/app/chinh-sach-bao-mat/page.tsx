import { site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";

// Cần rà soát pháp lý trước khi website public (quy định về bảo vệ dữ liệu cá nhân).
export const metadata = pageMeta({
  title: "Chính sách bảo mật",
  description: `Cách ${site.legalName} thu thập, sử dụng và bảo vệ thông tin cá nhân bạn gửi qua website.`,
  path: "/chinh-sach-bao-mat/",
});

const sections: { title: string; body: string[] }[] = [
  {
    title: "Thông tin chúng tôi thu thập",
    body: [
      "Khi bạn gửi form nhận báo giá hoặc đặt lịch tư vấn: tên công ty, họ tên người liên hệ, email, số điện thoại, số lượng người dùng, sản phẩm quan tâm và nội dung yêu cầu.",
      "Thông tin kỹ thuật đi kèm form: trang bạn gửi yêu cầu, tham số chiến dịch quảng cáo trên đường dẫn (nếu có) và địa chỉ IP, dùng để chống gửi spam.",
    ],
  },
  {
    title: "Mục đích sử dụng",
    body: [
      "Liên hệ tư vấn, gửi báo giá và chăm sóc khách hàng theo yêu cầu bạn đã gửi.",
      `${site.name} không bán, cho thuê hay trao đổi thông tin cá nhân của bạn cho bên thứ ba vì mục đích quảng cáo.`,
    ],
  },
  {
    title: "Nơi lưu và thời gian lưu",
    body: [
      `Thông tin form được gửi tới hộp thư ${site.email} của ${site.name}.`,
      "Thông tin được lưu trong thời gian cần thiết cho mục đích liên hệ và chăm sóc khách hàng, hoặc đến khi bạn yêu cầu xoá, trừ khi pháp luật yêu cầu lưu lâu hơn.",
    ],
  },
  {
    title: "Quyền của bạn",
    body: [
      `Bạn có thể yêu cầu xem, sửa, xoá thông tin hoặc rút lại sự đồng ý bằng cách gửi email tới ${site.email}. Chúng tôi phản hồi yêu cầu trong thời gian sớm nhất.`,
    ],
  },
  {
    title: "Cookie và công cụ đo lường",
    body: [
      "Website hiện không dùng cookie quảng cáo hay công cụ đo lường của bên thứ ba. Nếu bổ sung trong tương lai, chính sách này sẽ được cập nhật trước.",
    ],
  },
  {
    title: "Liên hệ",
    body: [
      `${site.legalName} (${site.englishName}), mã số thuế ${site.taxId}.`,
      ...site.offices.map((office) => `${office.name}: ${office.address}.`),
      `Email ${site.email}, hotline ${site.hotline}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="wrap max-w-[860px]">
        <p className="eyebrow eyebrow-dash mb-5">Chính sách</p>
        <h1 className="display-1">Chính sách bảo mật</h1>
        <p className="mt-4 text-[14px] text-muted">Cập nhật ngày 14/10/2026</p>
        <div className="article-body mt-10 max-w-[70ch]">
          {sections.map((section) => (
            <div key={section.title}>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-3">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
