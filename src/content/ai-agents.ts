// AI Agent hải quan và logistics. Nội dung theo mô tả DVAI gửi ngày 15/10/2026.
// Trạng thái: đang phát triển. Không ghi kết quả đo được cho AI Agent khi chưa có số liệu thật;
// số liệu 20–50% là của các ứng dụng số hoá quy trình đã triển khai.
// Chỉ mô tả đúng sự thật «dùng mô hình Claude của Anthropic», không ghi quan hệ đối tác với Anthropic.

export type AiAgent = {
  key: "hs" | "docs" | "permits" | "trucks";
  name: string;
  summary: string;
  inputs: string[];
  outputs: string[];
};

export const aiAgents: AiAgent[] = [
  {
    key: "hs",
    name: "Phân loại hàng hoá, xác định mã HS",
    summary: "Phân tích mô tả sản phẩm, catalogue và hoá đơn thương mại để xác định mã HS phù hợp.",
    inputs: ["Mô tả sản phẩm", "Catalogue", "Commercial Invoice"],
    outputs: ["Mã HS đề xuất", "Căn cứ phân loại để người khai hải quan kiểm tra"],
  },
  {
    key: "docs",
    name: "Trích xuất, đối chiếu chứng từ và điền trước tờ khai",
    summary:
      "Trích xuất, đối chiếu và xác thực thông tin giữa Commercial Invoice, Packing List, Bill of Lading, rồi điền trước dữ liệu vào tờ khai hải quan.",
    inputs: ["Commercial Invoice", "Packing List", "Bill of Lading"],
    outputs: ["Dữ liệu chứng từ theo từng trường", "Cảnh báo chỗ lệch giữa các chứng từ", "Dữ liệu điền trước cho tờ khai hải quan"],
  },
  {
    key: "permits",
    name: "Hồ sơ kiểm tra chuyên ngành và giấy phép",
    summary:
      "Đọc Commercial Invoice, Packing List, Bill of Lading và điền trước dữ liệu vào các mẫu hồ sơ có sẵn cho thủ tục kiểm tra chuyên ngành, giấy phép.",
    inputs: ["Commercial Invoice", "Packing List", "Bill of Lading"],
    outputs: ["Mẫu hồ sơ kiểm tra chuyên ngành đã điền trước", "Mẫu hồ sơ xin giấy phép đã điền trước"],
  },
  {
    key: "trucks",
    name: "Bố trí xe tải và chọn nhà cung cấp",
    summary:
      "Phân tích khối lượng hàng hoá và tuyến đường để đề xuất bố trí xe tải phù hợp, tự động chọn nhà cung cấp vận tải.",
    inputs: ["Khối lượng hàng hoá", "Tuyến đường"],
    outputs: ["Phương án bố trí xe tải", "Nhà cung cấp vận tải được đề xuất"],
  },
];
