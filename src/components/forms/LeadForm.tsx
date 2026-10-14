"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { CircleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ctaLabels, products, site, type LeadIntent, type Product } from "@/content/site";

const ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT || "/api/lead.php";
const userRanges = ["1–10", "11–50", "51–100", "101–300", "Trên 300"];

type Values = {
  company: string;
  name: string;
  email: string;
  phone: string;
  users: string;
  products: string[];
  message: string;
  consent: boolean;
  website: string; // honeypot, người thật không thấy ô này
};
type Field = Exclude<keyof Values, "website">;
type Errors = Partial<Record<Field, string>>;

const fieldOrder: Field[] = ["company", "name", "email", "phone", "users", "products", "message", "consent"];

function validate(field: Field, values: Values): string | undefined {
  const v = values[field];
  switch (field) {
    case "company":
      if (!values.company.trim()) return "Nhập tên công ty";
      if (values.company.length > 150) return "Tên công ty tối đa 150 ký tự";
      return;
    case "name":
      if (!values.name.trim()) return "Nhập họ tên người liên hệ";
      if (values.name.length > 100) return "Họ tên tối đa 100 ký tự";
      return;
    case "email":
      if (!values.email.trim()) return "Nhập email, ví dụ ten@congty.vn";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
        return "Email chưa đúng định dạng, ví dụ ten@congty.vn";
      return;
    case "phone": {
      const digits = values.phone.replace(/[\s.\-()]/g, "").replace(/^\+84/, "0");
      if (!digits) return "Nhập số điện thoại";
      if (!/^\d{8,12}$/.test(digits)) return "Số điện thoại cần từ 8 đến 12 chữ số";
      return;
    }
    case "users":
      if (!values.users) return "Chọn số lượng người dùng";
      return;
    case "products":
      if (values.products.length === 0) return "Chọn ít nhất một sản phẩm";
      return;
    case "message":
      if (typeof v === "string" && v.length > 2000) return "Nội dung tối đa 2000 ký tự";
      return;
    case "consent":
      if (!values.consent) return "Bạn cần đồng ý với chính sách bảo mật để gửi yêu cầu";
      return;
  }
}

type Props = {
  variant?: "compact" | "full";
  defaultIntent?: LeadIntent;
  defaultProduct?: Product;
  defaultNote?: string;
};

export function LeadForm({ variant = "compact", defaultIntent = "bao-gia", defaultProduct, defaultNote }: Props) {
  const uid = useId();
  const router = useRouter();
  const id = (name: string) => `${uid}-${name}`;
  const startedAt = useRef<number>(0);
  const summaryRef = useRef<HTMLDivElement>(null);

  const [intent, setIntent] = useState<LeadIntent>(defaultIntent);
  const [values, setValues] = useState<Values>({
    company: "",
    name: "",
    email: "",
    phone: "",
    users: "",
    products: defaultProduct ? [defaultProduct] : [],
    message: defaultNote ?? "",
    consent: false,
    website: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [failedSubmits, setFailedSubmits] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const markStart = () => {
    if (!startedAt.current) startedAt.current = Date.now();
  };

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    markStart();
    const next = { ...values, [key]: value };
    setValues(next);
    if (key !== "website" && errors[key as Field]) {
      setErrors((prev) => ({ ...prev, [key]: validate(key as Field, next) }));
    }
  }

  // Sau mỗi lần gửi thất bại, chuyển focus tới khung tóm tắt lỗi để trình đọc màn hình đọc ngay.
  useEffect(() => {
    if (failedSubmits > 0) summaryRef.current?.focus();
  }, [failedSubmits]);

  function onBlur(field: Field) {
    setErrors((prev) => ({ ...prev, [field]: validate(field, values) }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const nextErrors: Errors = {};
    for (const field of fieldOrder) {
      if (variant === "compact" && field === "message") continue;
      const message = validate(field, values);
      if (message) nextErrors[field] = message;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setShowSummary(true);
      setFailedSubmits((count) => count + 1);
      return;
    }
    setShowSummary(false);
    setStatus("sending");
    setServerError("");

    const query = new URLSearchParams(window.location.search);
    const payload = {
      intent,
      company: values.company.trim(),
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      users: values.users,
      products: values.products,
      message: values.message.trim(),
      consent: values.consent,
      website: values.website,
      elapsed: startedAt.current ? Date.now() - startedAt.current : 0,
      page: window.location.pathname,
      utm: {
        source: query.get("utm_source") ?? "",
        medium: query.get("utm_medium") ?? "",
        campaign: query.get("utm_campaign") ?? "",
      },
    };

    try {
      if (process.env.NODE_ENV === "development" && !process.env.NEXT_PUBLIC_LEAD_ENDPOINT) {
        // `next dev` không chạy PHP: giả lập gửi thành công để kiểm tra giao diện.
        console.info("[LeadForm] Bản dev, không gửi thật:", payload);
        await new Promise((resolve) => setTimeout(resolve, 500));
      } else {
        const response = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        const result = (await response.json().catch(() => null)) as
          | { ok: boolean; error?: string; fields?: Errors }
          | null;
        if (!response.ok || !result?.ok) {
          if (result?.fields) setErrors(result.fields);
          throw new Error(result?.error || "Máy chủ chưa nhận được yêu cầu.");
        }
      }
      router.push(`/cam-on/?loai=${intent}`);
    } catch (error) {
      setStatus("error");
      setServerError(error instanceof Error ? error.message : "Máy chủ chưa nhận được yêu cầu.");
    }
  }

  const errorList = fieldOrder.filter((field) => errors[field]);
  const describedBy = (field: Field, hint?: boolean) =>
    [errors[field] ? id(`${field}-error`) : "", hint ? id(`${field}-hint`) : ""].filter(Boolean).join(" ") ||
    undefined;

  const inputClass = (field: Field) =>
    `w-full rounded-lg border bg-white px-3 py-2.75 text-[15px] text-ink focus:outline-2 focus:outline-offset-0 focus:outline-teal ${
      errors[field] ? "border-danger" : "border-line-strong focus:border-teal"
    }`;

  const fieldError = (field: Field) =>
    errors[field] ? (
      <p id={id(`${field}-error`)} className="flex items-start gap-1.5 text-[13px] text-danger">
        <CircleAlert aria-hidden className="mt-0.5 size-3.5 flex-none" />
        {errors[field]}
      </p>
    ) : null;

  const label = (field: Field, text: ReactNode, required = true) => (
    <label htmlFor={id(field)} className="text-[13px] font-semibold text-navy">
      {text}
      {required && (
        <span aria-hidden className="text-danger">
          {" "}
          *
        </span>
      )}
    </label>
  );

  return (
    <form
      onSubmit={onSubmit}
      onFocus={markStart}
      noValidate
      className="grid gap-3.5 rounded-[14px] bg-white p-5 text-ink sm:p-6.5"
      aria-label={ctaLabels[intent]}
    >
      <div className="grid grid-cols-2 rounded-[9px] bg-bg p-1" role="group" aria-label="Loại yêu cầu">
        {(["bao-gia", "tu-van"] as LeadIntent[]).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={intent === option}
            onClick={() => setIntent(option)}
            className={`min-h-11 cursor-pointer rounded-[7px] px-2 text-[13.5px] font-semibold transition-colors ${
              intent === option ? "bg-white text-navy shadow-[0_1px_3px_rgb(7_43_78/0.12)]" : "text-muted hover:text-navy"
            }`}
          >
            {ctaLabels[option]}
          </button>
        ))}
      </div>

      {showSummary && errorList.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby={id("summary-title")}
          className="rounded-lg border border-danger/30 bg-danger-soft p-3.5 text-[13.5px] text-danger"
        >
          <p id={id("summary-title")} className="font-semibold">
            Còn {errorList.length} mục cần sửa:
          </p>
          <ul className="mt-1.5 list-disc pl-5">
            {errorList.map((field) => (
              <li key={field}>
                <a href={`#${id(field === "products" && variant === "full" ? "products-0" : field)}`} className="underline">
                  {errors[field]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="grid content-start gap-1.25">
          {label("company", "Tên công ty")}
          <input
            id={id("company")}
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            onBlur={() => onBlur("company")}
            aria-invalid={!!errors.company}
            aria-describedby={describedBy("company")}
            className={inputClass("company")}
          />
          {fieldError("company")}
        </div>
        <div className="grid content-start gap-1.25">
          {label("name", "Người liên hệ")}
          <input
            id={id("name")}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => onBlur("name")}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            className={inputClass("name")}
          />
          {fieldError("name")}
        </div>
        <div className="grid content-start gap-1.25">
          {label("email", "Email công việc")}
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="ten@congty.vn"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => onBlur("email")}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            className={inputClass("email")}
          />
          {fieldError("email")}
        </div>
        <div className="grid content-start gap-1.25">
          {label("phone", "Điện thoại")}
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => onBlur("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("phone")}
            className={inputClass("phone")}
          />
          {fieldError("phone")}
        </div>
        <div className="grid content-start gap-1.25">
          {label("users", "Số lượng người dùng")}
          <select
            id={id("users")}
            name="users"
            value={values.users}
            onChange={(e) => update("users", e.target.value)}
            onBlur={() => onBlur("users")}
            aria-invalid={!!errors.users}
            aria-describedby={describedBy("users")}
            className={inputClass("users")}
          >
            <option value="">Chọn</option>
            {userRanges.map((range) => (
              <option key={range}>{range}</option>
            ))}
          </select>
          {fieldError("users")}
        </div>

        {variant === "compact" ? (
          <div className="grid content-start gap-1.25">
            {label("products", "Sản phẩm quan tâm")}
            <select
              id={id("products")}
              name="product"
              value={values.products[0] ?? ""}
              onChange={(e) => update("products", e.target.value ? [e.target.value] : [])}
              onBlur={() => onBlur("products")}
              aria-invalid={!!errors.products}
              aria-describedby={describedBy("products")}
              className={inputClass("products")}
            >
              <option value="">Chọn</option>
              {products.map((product) => (
                <option key={product}>{product}</option>
              ))}
            </select>
            {fieldError("products")}
          </div>
        ) : (
          <fieldset
            className="grid gap-2 sm:col-span-2"
            aria-describedby={describedBy("products")}
            aria-invalid={!!errors.products}
          >
            <legend className="mb-1.5 text-[13px] font-semibold text-navy">
              Sản phẩm quan tâm
              <span aria-hidden className="text-danger">
                {" "}
                *
              </span>
            </legend>
            <div className="grid gap-x-4 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <label key={product} className="flex min-h-10 cursor-pointer items-center gap-2.5 text-[14.5px]">
                  <input
                    id={id(`products-${index}`)}
                    type="checkbox"
                    name="products"
                    value={product}
                    checked={values.products.includes(product)}
                    onChange={(e) =>
                      update(
                        "products",
                        e.target.checked
                          ? [...values.products, product]
                          : values.products.filter((p) => p !== product),
                      )
                    }
                    className="size-4.5 accent-teal"
                  />
                  {product}
                </label>
              ))}
            </div>
            {fieldError("products")}
          </fieldset>
        )}
      </div>

      {variant === "full" && (
        <div className="grid gap-1.25">
          {label("message", intent === "bao-gia" ? "Nội dung yêu cầu" : "Bạn muốn trao đổi về điều gì?", false)}
          <p id={id("message-hint")} className="text-[12.5px] text-muted">
            {intent === "bao-gia"
              ? "Ví dụ: số người dùng từng gói, hệ thống email đang dùng, thời gian cần triển khai."
              : "Ví dụ: quy trình muốn số hoá, thời gian thuận tiện để chúng tôi gọi lại."}
          </p>
          <textarea
            id={id("message")}
            name="message"
            rows={4}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            onBlur={() => onBlur("message")}
            aria-invalid={!!errors.message}
            aria-describedby={describedBy("message", true)}
            className={inputClass("message")}
          />
          {fieldError("message")}
        </div>
      )}

      {/* Ô bẫy chống spam: ẩn với người dùng và trình đọc màn hình */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input
          id={id("website")}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <div className="grid gap-1.25">
        <label className="flex cursor-pointer items-start gap-2.5 text-[13.5px] text-muted">
          <input
            id={id("consent")}
            type="checkbox"
            checked={values.consent}
            onChange={(e) => update("consent", e.target.checked)}
            aria-invalid={!!errors.consent}
            aria-describedby={describedBy("consent")}
            className="mt-0.5 size-4.5 flex-none accent-teal"
          />
          <span>
            Tôi đồng ý để {site.name} dùng thông tin này để liên hệ tư vấn, theo{" "}
            <Link href="/chinh-sach-bao-mat/" className="font-semibold text-teal underline">
              chính sách bảo mật
            </Link>
            .
          </span>
        </label>
        {fieldError("consent")}
      </div>

      <button type="submit" className="btn btn-primary w-full" aria-disabled={status === "sending"}>
        {status === "sending" ? "Đang gửi…" : intent === "bao-gia" ? "Gửi yêu cầu báo giá" : "Đặt lịch tư vấn"}
      </button>

      <div aria-live="polite">
        {status === "error" && (
          <p className="rounded-lg bg-danger-soft p-3 text-[13.5px] text-danger">
            {serverError} Vui lòng thử lại, hoặc gọi hotline {site.hotline} hay email {site.email}.
          </p>
        )}
      </div>
    </form>
  );
}
