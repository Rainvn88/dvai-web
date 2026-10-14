"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { leadHref } from "@/content/site";

type Answer = { users?: string; desktop?: string; security?: string };

const questions = [
  { key: "users", label: "Bao nhiêu người cần email công ty?", options: ["Dưới 20", "20–100", "100–300", "Trên 300"] },
  { key: "desktop", label: "Nhân viên có cần Word, Excel cài trên máy tính?", options: ["Có", "Không cần"] },
  {
    key: "security",
    label: "Có cần quản lý laptop, điện thoại công ty và chặn đăng nhập lạ?",
    options: ["Có", "Chưa cần"],
  },
] as const;

function recommend(a: Required<Answer>) {
  if (a.users === "Trên 300")
    return { plan: "Microsoft 365 E3 hoặc E5", reason: "Gói Business áp dụng tối đa 300 người dùng." };
  if (a.security === "Có")
    return {
      plan: "Business Premium",
      reason: "Có quản lý thiết bị (Intune), chống mã độc và lừa đảo (Defender for Business), kiểm soát đăng nhập (Entra ID P1).",
    };
  if (a.desktop === "Có")
    return { plan: "Business Standard", reason: "Có Word, Excel, PowerPoint, Outlook cài trên máy tính." };
  return { plan: "Business Basic", reason: "Đủ cho email, Teams, lưu trữ và Office bản web, mobile." };
}

export function PlanChooser() {
  const [answer, setAnswer] = useState<Answer>({});
  const uid = useId();
  const done = answer.users && answer.desktop && answer.security;
  const result = done ? recommend(answer as Required<Answer>) : null;

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
      <div className="card grid gap-6 p-6 sm:p-7">
        {questions.map((q, index) => (
          <fieldset key={q.key}>
            <legend className="mb-2.5 text-[15px] font-semibold text-navy">
              {index + 1}. {q.label}
            </legend>
            <div className="flex flex-wrap gap-2">
              {q.options.map((option) => {
                const id = `${uid}-${q.key}-${option}`;
                const checked = answer[q.key] === option;
                return (
                  <label
                    key={option}
                    htmlFor={id}
                    className={`flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-[14px] font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-teal ${
                      checked ? "border-teal bg-teal-soft text-teal" : "border-line-strong bg-white text-ink hover:border-teal"
                    }`}
                  >
                    <input
                      id={id}
                      type="radio"
                      name={`${uid}-${q.key}`}
                      value={option}
                      checked={checked}
                      onChange={() => setAnswer((prev) => ({ ...prev, [q.key]: option }))}
                      className="sr-only"
                    />
                    {option}
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div aria-live="polite" className="flex flex-col gap-3 rounded-[14px] bg-teal-soft p-6 sm:p-7">
        {result ? (
          <>
            <p className="text-[13px] font-semibold tracking-[0.1em] text-teal uppercase">Gợi ý cho bạn</p>
            <p className="display-3">{result.plan}</p>
            <p className="text-[15px] text-ink">{result.reason}</p>
            <p className="text-[14px] text-muted">
              Có thể kết hợp nhiều gói: kho và tài xế dùng Basic, văn phòng dùng Standard, quản lý dùng Premium.
            </p>
            <Link
              href={leadHref("bao-gia", "Microsoft 365", `Gói gợi ý: ${result.plan}`)}
              className="btn btn-primary mt-auto w-full sm:w-auto"
            >
              Nhận báo giá {result.plan}
            </Link>
          </>
        ) : (
          <>
            <p className="text-[13px] font-semibold tracking-[0.1em] text-teal uppercase">Gợi ý nhanh</p>
            <ul className="grid gap-2.5 text-[15px] text-ink">
              <li>
                <strong className="text-navy">5–20 nhân viên:</strong> Business Basic hoặc Standard
              </li>
              <li>
                <strong className="text-navy">20–100 nhân viên:</strong> Business Standard hoặc Premium
              </li>
              <li>
                <strong className="text-navy">Dữ liệu nhạy cảm, yêu cầu bảo mật cao:</strong> Business Premium
              </li>
              <li>
                <strong className="text-navy">Trên 300 người dùng:</strong> Microsoft 365 E3 hoặc E5
              </li>
            </ul>
            <p className="mt-auto text-[14px] text-muted">Trả lời 3 câu hỏi bên cạnh để xem gói gợi ý.</p>
          </>
        )}
      </div>
    </div>
  );
}
