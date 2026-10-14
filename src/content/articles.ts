// Bài viết mục Kiến thức. Mỗi bài là một danh sách khối nội dung để dễ sửa.
// Khi Microsoft hoặc nhà phân phối đổi giá, cập nhật bài liên quan và trường `updated`.

import type { LeadIntent } from "./site";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "note"; text: string }
  | { type: "cta"; intent: LeadIntent; text: string };

export type Article = {
  slug: string;
  title: string;
  category: "Microsoft 365" | "Power Platform" | "Azure" | "Copilot" | "Bảo mật";
  excerpt: string;
  updated: string; // YYYY-MM-DD
  readMinutes: number;
  relatedHref: string;
  relatedLabel: string;
  blocks: ArticleBlock[];
};

export const articles: Article[] = [
  {
    slug: "microsoft-365-business-basic-hay-business-standard",
    title: "Business Basic hay Business Standard: chọn gói nào?",
    category: "Microsoft 365",
    excerpt: "So sánh theo nhu cầu Office cài máy, quy mô và cách dùng thực tế của từng bộ phận.",
    updated: "2026-10-14",
    readMinutes: 5,
    relatedHref: "/microsoft-365/",
    relatedLabel: "Xem các gói Microsoft 365",
    blocks: [
      {
        type: "p",
        text: "Cả hai gói đều có email doanh nghiệp, Teams, OneDrive và SharePoint. Khác biệt chính nằm ở Office: Business Standard có Word, Excel, PowerPoint, Outlook bản cài trên máy tính, còn Business Basic chỉ dùng bản web và mobile.",
      },
      { type: "h2", text: "Điểm giống nhau" },
      {
        type: "ul",
        items: [
          "Email theo tên miền riêng của công ty, hộp thư 50 GB mỗi người",
          "Microsoft Teams để họp, chat và làm việc nhóm",
          "OneDrive 1 TB mỗi người và SharePoint để lưu trữ, chia sẻ tài liệu",
          "Word, Excel, PowerPoint bản web và trên điện thoại",
          "Áp dụng cho doanh nghiệp đến 300 người dùng",
        ],
      },
      { type: "h2", text: "Điểm khác nhau" },
      {
        type: "table",
        head: ["Hạng mục", "Business Basic", "Business Standard"],
        rows: [
          ["Office bản web và mobile", "Có", "Có"],
          [
            "Word, Excel, PowerPoint, Outlook cài trên máy tính",
            "Không",
            "Có, mỗi người cài trên tối đa 5 PC hoặc Mac, 5 máy tính bảng và 5 điện thoại",
          ],
          ["Hội thảo trực tuyến có đăng ký tham dự", "Không", "Có"],
        ],
      },
      { type: "h2", text: "Khi nào chọn Business Basic" },
      {
        type: "ul",
        items: [
          "Nhân viên chủ yếu dùng email, Teams và tài liệu chia sẻ",
          "Công ty đã có Office bản quyền cài trên máy",
          "Nhân viên kho, tài xế, nhân viên hiện trường làm việc chủ yếu trên điện thoại",
        ],
      },
      { type: "h2", text: "Khi nào chọn Business Standard" },
      {
        type: "ul",
        items: [
          "Kế toán, kinh doanh làm việc nhiều với Excel nâng cao",
          "Cần Outlook bản cài để quản lý nhiều hộp thư và lịch",
          "Không muốn mua và quản lý Office riêng cho từng máy",
        ],
      },
      { type: "h2", text: "Một công ty có thể dùng cả hai gói" },
      {
        type: "p",
        text: "License được gán cho từng người dùng, nên doanh nghiệp có thể kết hợp: văn phòng dùng Business Standard, bộ phận hiện trường dùng Business Basic. Khi cần quản lý thiết bị và bảo mật cao hơn, có thể nâng một nhóm người dùng lên Business Premium.",
      },
      {
        type: "note",
        text: "Gói Business áp dụng cho doanh nghiệp đến 300 người dùng. Trên 300 người dùng, cần xem các gói Microsoft 365 Enterprise.",
      },
      { type: "cta", intent: "bao-gia", text: "Nhận báo giá theo số người dùng và kỳ cam kết của doanh nghiệp bạn." },
    ],
  },
  {
    slug: "chuyen-email-doanh-nghiep-sang-microsoft-365",
    title: "Chuyển email doanh nghiệp sang Microsoft 365 trong 6 bước",
    category: "Microsoft 365",
    excerpt: "Từ hosting mail, Gmail hoặc Google Workspace mà không mất thư cũ.",
    updated: "2026-10-14",
    readMinutes: 6,
    relatedHref: "/dich-vu/trien-khai-chuyen-doi/",
    relatedLabel: "Xem dịch vụ chuyển đổi",
    blocks: [
      {
        type: "p",
        text: "Phần lớn doanh nghiệp có thể chuyển email sang Microsoft 365 mà vẫn giữ thư cũ. Điều quan trọng là chuẩn bị kỹ và chọn đúng thời điểm đổi bản ghi MX của tên miền.",
      },
      { type: "h2", text: "Bước 1. Khảo sát hệ thống hiện tại" },
      {
        type: "p",
        text: "Ghi lại số hộp thư, dung lượng từng hộp thư, nơi đang lưu (hosting mail, Gmail, Google Workspace), các địa chỉ bí danh và nhóm thư. Danh sách này quyết định cách chuyển và thời gian cần thiết.",
      },
      { type: "h2", text: "Bước 2. Tạo tenant và xác minh tên miền" },
      {
        type: "p",
        text: "Thêm tên miền công ty vào Microsoft 365 và xác minh bằng bản ghi TXT. Tạo tài khoản người dùng và gán license. Lúc này email vẫn chạy trên hệ thống cũ.",
      },
      { type: "h2", text: "Bước 3. Chuyển trước dữ liệu cũ" },
      {
        type: "p",
        text: "Dùng công cụ chuyển dữ liệu có sẵn trong Exchange Online: chuyển qua IMAP với hosting mail, hoặc chuyển trực tiếp từ Google Workspace. Phần lớn thư cũ được chuyển trong khi người dùng vẫn làm việc bình thường.",
      },
      { type: "h2", text: "Bước 4. Đổi bản ghi MX ngoài giờ làm việc" },
      {
        type: "p",
        text: "Hạ thời gian lưu đệm (TTL) của bản ghi DNS trước ít nhất một ngày. Đổi bản ghi MX và autodiscover sang Microsoft 365 vào buổi tối hoặc cuối tuần để hạn chế gián đoạn.",
      },
      { type: "h2", text: "Bước 5. Chuyển phần còn lại và đối chiếu" },
      {
        type: "p",
        text: "Đồng bộ lần cuối những thư đến trong thời gian chuyển. Đối chiếu số lượng thư và thư mục giữa hai hệ thống trước khi tắt hệ thống cũ.",
      },
      { type: "h2", text: "Bước 6. Bảo mật và hướng dẫn người dùng" },
      {
        type: "ul",
        items: [
          "Cấu hình SPF, DKIM, DMARC để email gửi đi không bị đánh dấu spam",
          "Bật xác thực đa yếu tố cho tài khoản",
          "Cài Outlook và Teams trên máy tính, điện thoại cho nhân viên",
        ],
      },
      {
        type: "note",
        text: "Lịch, danh bạ và thư mục chia sẻ chuyển được hay không tuỳ hệ thống cũ. Nên kiểm tra ngay ở bước khảo sát.",
      },
      { type: "cta", intent: "tu-van", text: "Trao đổi với DVAI để lên kế hoạch chuyển email cho doanh nghiệp bạn." },
    ],
  },
  {
    slug: "power-apps-la-gi",
    title: "Power Apps là gì và khi nào doanh nghiệp cần?",
    category: "Power Platform",
    excerpt: "Ví dụ ứng dụng thực tế, nơi lưu dữ liệu và chi phí license đi kèm.",
    updated: "2026-10-14",
    readMinutes: 5,
    relatedHref: "/power-apps/",
    relatedLabel: "Xem ứng dụng Power Apps của DVAI",
    blocks: [
      {
        type: "p",
        text: "Power Apps là nền tảng xây ứng dụng nội bộ của Microsoft. Ứng dụng chạy trên trình duyệt, điện thoại và ngay trong Teams, dùng chung tài khoản Microsoft 365 của nhân viên.",
      },
      { type: "h2", text: "Power Apps làm được gì" },
      {
        type: "ul",
        items: [
          "Biểu mẫu đề xuất và phê duyệt: chi phí, mua hàng, nghỉ phép",
          "Quản lý danh sách: khách hàng, xe, hợp đồng, hồ sơ",
          "Ứng dụng cho nhân viên hiện trường: chụp ảnh, cập nhật trạng thái",
          "Kết hợp Power Automate để gửi thông báo, nhắc việc tự động",
          "Kết hợp Power BI để làm báo cáo quản trị",
        ],
      },
      { type: "h2", text: "Dấu hiệu doanh nghiệp nên dùng" },
      {
        type: "ul",
        items: [
          "Mỗi phòng một file Excel, số liệu không khớp",
          "Phê duyệt qua giấy hoặc tin nhắn, khó tra lại",
          "Quản lý muốn xem số liệu ngay mà không phải chờ tổng hợp",
        ],
      },
      { type: "h2", text: "Dữ liệu lưu ở đâu" },
      {
        type: "table",
        head: ["Nơi lưu", "Phù hợp khi", "License"],
        rows: [
          ["SharePoint List", "Quy trình vừa và nhỏ", "Đi kèm nhiều gói Microsoft 365"],
          ["Dataverse", "Dữ liệu quan hệ, khối lượng lớn, phân quyền chi tiết", "Cần Power Apps Premium"],
          ["Excel", "Thử nghiệm nhanh, ít người cùng ghi", "Đi kèm Microsoft 365"],
        ],
      },
      { type: "h2", text: "Chi phí license" },
      {
        type: "p",
        text: "Nhiều gói Microsoft 365 cho doanh nghiệp đã gồm quyền dùng Power Apps với các connector chuẩn như SharePoint, Outlook, Teams. Khi ứng dụng cần Dataverse hoặc connector Premium như SQL Server, người dùng cần license Power Apps Premium hoặc gói theo ứng dụng.",
      },
      { type: "h2", text: "Thời gian triển khai" },
      {
        type: "p",
        text: "Với các ứng dụng dựng sẵn của DVAI, thời gian triển khai từ 1 tuần; ứng dụng quản lý vận tải từ 2 tuần. Ứng dụng thiết kế riêng được báo thời gian sau buổi khảo sát quy trình.",
      },
      { type: "cta", intent: "tu-van", text: "Đặt lịch xem demo ứng dụng trên quy trình của chính doanh nghiệp bạn." },
    ],
  },
];

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
