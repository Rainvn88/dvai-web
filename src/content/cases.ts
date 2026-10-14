// Dự án và số liệu do DVAI cung cấp ngày 14/10/2026.
// Chỉ ghi công nghệ cụ thể khi DVAI xác nhận cho từng dự án.

export type CaseStudy = {
  slug: string;
  industry: string;
  size?: string;
  title: string;
  metric: string;
  metricLabel: string;
  summary: string;
  scope: string[];
  results: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "so-hoa-dieu-phoi-van-tai-logistics",
    industry: "Logistics",
    size: "100 nhân sự",
    title: "Số hoá nghiệp vụ điều phối vận tải",
    metric: "50%",
    metricLabel: "thời gian vận hành giảm so với trước",
    summary:
      "Số hoá nghiệp vụ điều phối vận tải cho một công ty logistics quy mô 100 nhân sự. Thời gian vận hành giảm 50% so với trước đây ở cả bộ phận điều vận, kế toán và hành chính nhân sự.",
    scope: ["Điều vận", "Kế toán", "Hành chính nhân sự"],
    results: [
      "Giảm 50% thời gian vận hành so với trước khi số hoá",
      "Ba bộ phận điều vận, kế toán, hành chính nhân sự cùng làm việc trên một hệ thống",
    ],
  },
  {
    slug: "so-hoa-van-hanh-noi-bo-thuong-mai",
    industry: "Thương mại",
    title: "Số hoá vận hành nội bộ, tập trung dữ liệu",
    metric: "20%",
    metricLabel: "thời gian vận hành giảm",
    summary:
      "Số hoá nghiệp vụ vận hành nội bộ cho một công ty thương mại: đề nghị thanh toán, đánh giá KPI, quản lý thông tin khách hàng và nhà cung cấp. Dữ liệu được tập trung, không còn phân mảnh.",
    scope: ["Đề nghị thanh toán", "Đánh giá KPI", "Khách hàng", "Nhà cung cấp"],
    results: [
      "Giảm 20% thời gian vận hành",
      "Dữ liệu thanh toán, KPI, khách hàng và nhà cung cấp nằm ở một nơi, không còn phân mảnh",
    ],
  },
  {
    slug: "app-thong-quan-xuat-nhap-khau-forwarder",
    industry: "Forwarder",
    size: "60 nhân sự",
    title: "App vận hành thông quan và thủ tục xuất nhập khẩu",
    metric: "30%",
    metricLabel: "thời gian vận hành giảm",
    summary:
      "Triển khai các app vận hành nghiệp vụ thông quan hải quan, kiểm hoá và giám sát các thủ tục xuất nhập khẩu cho một công ty forwarder quy mô 60 nhân sự.",
    scope: ["Thông quan hải quan", "Kiểm hoá", "Giám sát thủ tục xuất nhập khẩu"],
    results: [
      "Giảm 30% thời gian vận hành nhờ dữ liệu được dùng chung",
      "Bỏ được các báo cáo định kỳ vì bộ phận vận hành cập nhật dữ liệu chính xác, kịp thời",
    ],
  },
];

export const companyStats = [
  { value: "5", label: "năm làm việc với hệ sinh thái Microsoft" },
  { value: "15", label: "dự án đã triển khai" },
  { value: "5", label: "doanh nghiệp đang được quản trị" },
];
