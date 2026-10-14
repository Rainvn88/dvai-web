// Quy tắc kiểm tra form lead, dùng chung cho form (trình duyệt) và API /api/lead (máy chủ).
import { products, type LeadIntent } from "@/content/site";

export const userRanges = ["1–10", "11–50", "51–100", "101–300", "Trên 300"] as const;

export const intentLabels: Record<LeadIntent, string> = {
  "bao-gia": "Yêu cầu báo giá",
  "tu-van": "Đặt lịch tư vấn",
};

export type LeadValues = {
  company: string;
  name: string;
  email: string;
  phone: string;
  users: string;
  products: string[];
  message: string;
  consent: boolean;
};

export type LeadField = keyof LeadValues;
export type LeadErrors = Partial<Record<LeadField, string>>;

export const leadFields: LeadField[] = ["company", "name", "email", "phone", "users", "products", "message", "consent"];

export const limits = { company: 150, name: 100, email: 200, phone: 30, message: 2000 } as const;

export function phoneDigits(phone: string) {
  return phone.replace(/[\s.\-()]/g, "").replace(/^\+84/, "0");
}

export function validateField(field: LeadField, v: LeadValues): string | undefined {
  switch (field) {
    case "company":
      if (!v.company.trim()) return "Nhập tên công ty";
      if (v.company.length > limits.company) return `Tên công ty tối đa ${limits.company} ký tự`;
      return;
    case "name":
      if (!v.name.trim()) return "Nhập họ tên người liên hệ";
      if (v.name.length > limits.name) return `Họ tên tối đa ${limits.name} ký tự`;
      return;
    case "email":
      if (!v.email.trim()) return "Nhập email, ví dụ ten@congty.vn";
      if (v.email.length > limits.email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
        return "Email chưa đúng định dạng, ví dụ ten@congty.vn";
      return;
    case "phone": {
      const digits = phoneDigits(v.phone);
      if (!digits) return "Nhập số điện thoại";
      if (!/^\d{8,12}$/.test(digits)) return "Số điện thoại cần từ 8 đến 12 chữ số";
      return;
    }
    case "users":
      if (!(userRanges as readonly string[]).includes(v.users)) return "Chọn số lượng người dùng";
      return;
    case "products":
      if (v.products.length === 0 || v.products.some((p) => !(products as readonly string[]).includes(p)))
        return "Chọn ít nhất một sản phẩm";
      return;
    case "message":
      if (v.message.length > limits.message) return `Nội dung tối đa ${limits.message} ký tự`;
      return;
    case "consent":
      if (!v.consent) return "Bạn cần đồng ý với chính sách bảo mật để gửi yêu cầu";
      return;
  }
}

export function validateLead(v: LeadValues): LeadErrors {
  const errors: LeadErrors = {};
  for (const field of leadFields) {
    const message = validateField(field, v);
    if (message) errors[field] = message;
  }
  return errors;
}
