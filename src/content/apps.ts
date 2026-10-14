// 6 ứng dụng dựng sẵn. Thời gian triển khai do DVAI xác nhận ngày 14/10/2026.

export type AppPackage = {
  slug: string;
  name: string;
  summary: string;
  weeks: number;
  forWho: string;
  features: string[];
};

export const appPackages: AppPackage[] = [
  {
    slug: "duyet-chi-phi",
    name: "Duyệt chi phí",
    summary: "Đề nghị tạm ứng, thanh toán, đính kèm hoá đơn, duyệt nhiều cấp theo hạn mức.",
    weeks: 1,
    forWho: "Kế toán và mọi bộ phận phát sinh chi phí",
    features: [
      "Tạo đề nghị trên điện thoại, chụp và đính kèm hoá đơn",
      "Duyệt nhiều cấp theo hạn mức số tiền",
      "Thông báo qua Teams và email, nhắc người duyệt quá hạn",
      "Lưu vết toàn bộ lịch sử duyệt",
    ],
  },
  {
    slug: "quan-ly-van-tai",
    name: "Quản lý vận tải",
    summary: "Lệnh vận chuyển, điều xe, tài xế cập nhật trạng thái, chi phí từng chuyến.",
    weeks: 2,
    forWho: "Bộ phận điều vận, tài xế, kế toán vận tải",
    features: [
      "Tạo lệnh vận chuyển và điều xe, tài xế",
      "Tài xế cập nhật trạng thái chuyến trên điện thoại",
      "Ghi nhận chi phí từng chuyến",
      "Báo cáo sản lượng và chi phí theo xe, theo tuyến",
    ],
  },
  {
    slug: "crm-ban-hang",
    name: "CRM bán hàng",
    summary: "Khách hàng, cơ hội, báo giá và lịch chăm sóc trong Teams.",
    weeks: 1,
    forWho: "Đội kinh doanh và quản lý bán hàng",
    features: [
      "Danh sách khách hàng và người liên hệ",
      "Theo dõi cơ hội theo giai đoạn",
      "Lịch chăm sóc và nhắc việc",
      "Báo cáo pipeline theo nhân viên",
    ],
  },
  {
    slug: "de-nghi-mua-hang",
    name: "Đề nghị mua hàng",
    summary: "Đề nghị, duyệt, đặt hàng nhà cung cấp, theo dõi giao hàng.",
    weeks: 1,
    forWho: "Bộ phận mua hàng và các phòng có nhu cầu mua",
    features: [
      "Đề nghị mua hàng theo danh mục",
      "Duyệt theo phòng ban và ngân sách",
      "Theo dõi đơn đặt hàng nhà cung cấp",
      "Cập nhật tình trạng giao hàng",
    ],
  },
  {
    slug: "quan-ly-tai-lieu",
    name: "Quản lý tài liệu",
    summary: "Lưu trữ tập trung, phiên bản, hạn hiệu lực hợp đồng, phân quyền.",
    weeks: 1,
    forWho: "Hành chính, pháp chế và các phòng ban",
    features: [
      "Kho tài liệu tập trung theo phòng ban",
      "Quản lý phiên bản",
      "Nhắc hạn hiệu lực hợp đồng, giấy phép",
      "Phân quyền xem và chỉnh sửa",
    ],
  },
  {
    slug: "nhan-su-kpi",
    name: "Nhân sự và KPI",
    summary: "Giao chỉ tiêu, tự đánh giá, quản lý duyệt, tổng hợp điểm.",
    weeks: 1,
    forWho: "Nhân sự, quản lý và nhân viên",
    features: [
      "Giao chỉ tiêu theo kỳ",
      "Nhân viên tự đánh giá, quản lý duyệt",
      "Tổng hợp điểm theo phòng ban",
      "Lưu lịch sử đánh giá",
    ],
  },
];
