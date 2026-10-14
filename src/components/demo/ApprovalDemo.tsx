"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

type Request = { id: number; title: string; dept: string; note: string; amount: string; state: "wait" | "done" | "no" };

const initial: Request[] = [
  { id: 1, title: "Phí cầu đường tháng 10", dept: "Phòng Vận tải", note: "3 hoá đơn đính kèm", amount: "3.250.000 ₫", state: "wait" },
  { id: 2, title: "Tạm ứng công tác Hải Phòng", dept: "Phòng Kinh doanh", note: "cần duyệt cấp 2", amount: "6.000.000 ₫", state: "wait" },
  { id: 3, title: "Mua mực in văn phòng", dept: "Hành chính", note: "", amount: "1.180.000 ₫", state: "done" },
];

const badge = {
  done: { text: "Đã duyệt", cls: "bg-teal-soft text-teal" },
  no: { text: "Đã từ chối", cls: "bg-danger-soft text-danger" },
  wait: { text: "Chờ duyệt", cls: "bg-warn-soft text-warn" },
};

/** App «Duyệt chi phí» mẫu ở hero trang chủ. Dữ liệu minh hoạ. */
export function ApprovalDemo() {
  const [requests, setRequests] = useState(initial);
  const [toast, setToast] = useState({ key: 0, text: "Đề nghị «Mua mực in văn phòng» đã được duyệt. Đã báo cho Hành chính." });

  function decide(id: number, approve: boolean) {
    const target = requests.find((r) => r.id === id);
    if (!target) return;
    setRequests((list) => list.map((r) => (r.id === id ? { ...r, state: approve ? "done" : "no" } : r)));
    setToast((prev) => ({
      key: prev.key + 1,
      text: `Đề nghị «${target.title}» ${approve ? "đã được duyệt" : "bị từ chối"}. Đã báo cho ${target.dept}.`,
    }));
  }

  const waiting = requests.filter((r) => r.state === "wait").length;

  return (
    <div className="relative grid justify-items-center">
      <div
        className="w-[312px] max-w-full overflow-hidden rounded-[36px] border-[9px] border-[#0c2035] bg-white shadow-[0_30px_60px_rgb(7_43_78/0.22)]"
        role="region"
        aria-label="Ví dụ ứng dụng Duyệt chi phí"
      >
        <div className="bg-navy px-4.5 pt-4.5 pb-3.5 text-white">
          <p className="text-[11.5px] opacity-70">Power Apps</p>
          <p className="text-[17px] font-semibold">Duyệt chi phí</p>
          <div className="mt-3 flex gap-1.5 text-[12px]">
            <span className="rounded-full bg-white px-2.5 py-1 font-semibold text-navy">Chờ duyệt ({waiting})</span>
            <span className="rounded-full bg-white/10 px-2.5 py-1">Đã duyệt</span>
            <span className="rounded-full bg-white/10 px-2.5 py-1">Của tôi</span>
          </div>
        </div>
        <ul className="grid gap-2.5 bg-[#f4f7f8] p-3">
          {requests.map((r) => (
            <li key={r.id} className="rounded-xl border border-line bg-white p-3">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-[13.5px] leading-snug font-semibold text-navy">{r.title}</p>
                <p className="text-[13px] font-bold whitespace-nowrap tabular-nums">{r.amount}</p>
              </div>
              <p className="mt-0.5 mb-2 text-[12px] text-muted">
                {r.dept}
                {r.note ? `, ${r.note}` : ""}
              </p>
              {r.state === "wait" ? (
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => decide(r.id, true)}
                    className="min-h-9 cursor-pointer rounded-[7px] bg-teal px-3.5 text-[12px] font-semibold text-white hover:bg-teal-hover"
                  >
                    Duyệt
                  </button>
                  <button
                    type="button"
                    onClick={() => decide(r.id, false)}
                    className="min-h-9 cursor-pointer rounded-[7px] border border-line px-3.5 text-[12px] font-semibold text-muted hover:border-muted"
                  >
                    Từ chối
                  </button>
                </div>
              ) : (
                <span className={`inline-block rounded-full px-2.5 py-1 text-[11.5px] font-semibold ${badge[r.state].cls}`}>
                  {badge[r.state].text}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div
        key={toast.key}
        role="status"
        className="relative mt-[-28px] flex w-[min(290px,100%)] animate-[toast-pop_.35s_ease] gap-2.5 rounded-xl border border-line bg-white px-3.5 py-3 text-[12.5px] leading-snug shadow-[0_14px_34px_rgb(7_43_78/0.16)] lg:absolute lg:bottom-[34px] lg:-left-7 lg:mt-0 lg:w-[260px]"
      >
        <span className="grid size-7 flex-none place-items-center rounded-[7px] bg-blue-soft text-blue">
          <Bell aria-hidden className="size-4" />
        </span>
        <span>
          <span className="block text-[12px] font-semibold text-navy">Thông báo Teams, qua Power Automate</span>
          {toast.text}
        </span>
      </div>
      <p className="mt-4 text-center text-[12px] text-muted">Thử bấm Duyệt. Ứng dụng mẫu, dữ liệu minh hoạ.</p>
    </div>
  );
}
