// Thông tin công ty và điều hướng dùng chung cho toàn site.
// Quy tắc: không dùng từ mô tả quan hệ với Microsoft (Partner, Reseller, CSP, đối tác,
// uỷ quyền, chính hãng) cho đến khi DVAI xác nhận đã có danh hiệu thật.

export const site = {
  name: "DVAI",
  legalName: "Công ty TNHH DVAI",
  englishName: "DVAI Corporation",
  url: "https://dvai.vn",
  tagline: "Microsoft Cloud & Business Solutions for SMEs in Vietnam",
  description:
    "Microsoft 365, Power Platform, Azure và Copilot cho doanh nghiệp Việt Nam. Một đầu mối cho license, triển khai, ứng dụng nội bộ và vận hành.",
  taxId: "3002271794",
  hotline: "088066999",
  email: "sales@dvai.vn",
  responseTime: "4 giờ làm việc",
  licenseFrom: "70.200 ₫",
  offices: [
    {
      name: "Văn phòng Hà Nội",
      address:
        "TN6-185, Đường Thiên Nga 6, Khu Tinh Hoa, Vinhomes Global Gate, Xã Đông Anh, TP Hà Nội",
      locality: "Hà Nội",
    },
    {
      name: "Văn phòng Hà Tĩnh",
      address: "Tòa nhà DVL, Tổ dân phố Đông Trinh, Phường Sông Tri, Tỉnh Hà Tĩnh",
      locality: "Hà Tĩnh",
    },
  ],
} as const;

export type LeadIntent = "bao-gia" | "tu-van";

export const ctaLabels: Record<LeadIntent, string> = {
  "bao-gia": "Nhận báo giá",
  "tu-van": "Đặt lịch tư vấn",
};

export const products = [
  "Microsoft 365",
  "Power Apps",
  "Power Automate",
  "Power BI",
  "Azure",
  "Copilot",
  "Ứng dụng thiết kế riêng",
  "AI Agent hải quan và logistics",
  "Chuyển đổi dữ liệu",
  "Quản trị và vận hành",
] as const;

export type Product = (typeof products)[number];

/** Link tới trang liên hệ, mở đúng tab và điền sẵn sản phẩm. */
export function leadHref(intent: LeadIntent, product?: Product, note?: string) {
  const params = new URLSearchParams({ loai: intent });
  if (product) params.set("sp", product);
  if (note) params.set("ghichu", note);
  return `/lien-he/?${params.toString()}`;
}

export type NavLink = { label: string; href: string; desc?: string };
export type NavGroup = { label: string; items: NavLink[] };
export type NavEntry = NavLink | NavGroup;

export const mainNav: NavEntry[] = [
  {
    label: "Microsoft",
    items: [
      { label: "Microsoft 365", href: "/microsoft-365/", desc: "Email, Teams, Office cho doanh nghiệp" },
      { label: "Power Apps", href: "/power-apps/", desc: "Ứng dụng nội bộ trên Microsoft 365" },
      { label: "Power Automate", href: "/power-automate/", desc: "Tự động duyệt, nhắc việc, chuyển dữ liệu" },
      { label: "Power BI", href: "/power-bi/", desc: "Báo cáo quản trị tự cập nhật" },
      { label: "Azure", href: "/azure/", desc: "Máy chủ, sao lưu, bảo mật trên cloud" },
      { label: "Copilot", href: "/copilot/", desc: "AI trên dữ liệu doanh nghiệp" },
    ],
  },
  {
    label: "Giải pháp",
    items: [
      { label: "AI Agent hải quan và logistics", href: "/giai-phap/ai-agent-hai-quan/", desc: "Đọc chứng từ, gợi ý mã HS, điền trước tờ khai" },
      { label: "Làm việc số", href: "/microsoft-365/", desc: "Email, họp, lưu trữ tài liệu tập trung" },
      { label: "Ứng dụng thiết kế riêng", href: "/power-apps/#thiet-ke-rieng", desc: "App vận hành làm theo nghiệp vụ của bạn" },
      { label: "Tự động hoá quy trình", href: "/power-apps/#goi-ung-dung", desc: "Ứng dụng duyệt và luồng tự động" },
      { label: "Dữ liệu và báo cáo", href: "/power-bi/", desc: "Dashboard cho ban giám đốc và phòng ban" },
      { label: "Tự động hoá bằng AI", href: "/copilot/#ai-workflow", desc: "Copilot, trợ lý AI nội bộ, đọc chứng từ" },
      { label: "Cloud và bảo mật", href: "/azure/", desc: "Hạ tầng, sao lưu, kiểm soát truy cập" },
    ],
  },
  {
    label: "Dịch vụ",
    items: [
      { label: "Triển khai và chuyển đổi", href: "/dich-vu/trien-khai-chuyen-doi/", desc: "Chuyển email, dữ liệu sang Microsoft 365" },
      { label: "Quản trị và vận hành", href: "/dich-vu/quan-tri-van-hanh/", desc: "Quản trị Microsoft 365 hằng tháng" },
      { label: "Tư vấn", href: "/lien-he/?loai=tu-van", desc: "Khảo sát và đề xuất phương án" },
    ],
  },
  { label: "Dự án", href: "/du-an/" },
  { label: "Kiến thức", href: "/kien-thuc/" },
  { label: "Về chúng tôi", href: "/ve-chung-toi/" },
];

export const footerNav: NavGroup[] = [
  {
    label: "Microsoft",
    items: [
      { label: "Microsoft 365", href: "/microsoft-365/" },
      { label: "Power Apps", href: "/power-apps/" },
      { label: "Power Automate", href: "/power-automate/" },
      { label: "Power BI", href: "/power-bi/" },
      { label: "Azure", href: "/azure/" },
      { label: "Copilot", href: "/copilot/" },
    ],
  },
  {
    label: "Công ty",
    items: [
      { label: "AI Agent hải quan", href: "/giai-phap/ai-agent-hai-quan/" },
      { label: "Triển khai và chuyển đổi", href: "/dich-vu/trien-khai-chuyen-doi/" },
      { label: "Quản trị và vận hành", href: "/dich-vu/quan-tri-van-hanh/" },
      { label: "Dự án", href: "/du-an/" },
      { label: "Kiến thức", href: "/kien-thuc/" },
      { label: "Về chúng tôi", href: "/ve-chung-toi/" },
      { label: "Liên hệ", href: "/lien-he/" },
    ],
  },
];

export const trademarkNote =
  "Microsoft, Microsoft 365, Azure, Power Apps, Power Automate, Power BI, Copilot là nhãn hiệu của Microsoft Corporation. Claude là nhãn hiệu của Anthropic, PBC.";
