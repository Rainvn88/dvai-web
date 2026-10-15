import Link from "next/link";
import { ArrowRight, CircleCheck, FileSearch, Tags, TriangleAlert, Truck, ClipboardList, type LucideIcon } from "lucide-react";
import { aiAgents, type AiAgent } from "@/content/ai-agents";

const icons: Record<AiAgent["key"], LucideIcon> = {
  hs: Tags,
  docs: FileSearch,
  permits: ClipboardList,
  trucks: Truck,
};

/** Nhãn trạng thái: giải pháp đang phát triển. */
export function DevStatus({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex w-max items-center gap-2 rounded-full border border-teal/25 bg-white px-3 py-1 text-[12.5px] font-semibold text-teal ${className}`}
    >
      <span aria-hidden className="size-2 rounded-full bg-teal" />
      Đang phát triển, nhận doanh nghiệp thử nghiệm
    </span>
  );
}

/** Thẻ chi tiết cho trang AI Agent: đầu vào và kết quả của từng agent. */
export function AiAgentCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {aiAgents.map((agent) => {
        const Icon = icons[agent.key];
        return (
          <article key={agent.key} className="card flex flex-col gap-4 p-6.5">
            <div className="flex items-center gap-3">
              <span className="icon-tile bg-teal-soft text-teal">
                <Icon aria-hidden className="size-5" strokeWidth={1.8} />
              </span>
              <h3 className="text-[17px] leading-snug font-semibold text-navy">{agent.name}</h3>
            </div>
            <p className="text-[14.5px] text-muted">{agent.summary}</p>
            <div className="grid gap-3 border-t border-line pt-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-[12.5px] font-semibold text-muted">Đầu vào</p>
                <ul className="flex flex-wrap gap-1.5">
                  {agent.inputs.map((input) => (
                    <li key={input} className="chip">
                      {input}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 text-[12.5px] font-semibold text-muted">Kết quả</p>
                <ul className="grid gap-1.5 text-[14px]">
                  {agent.outputs.map((output) => (
                    <li key={output} className="flex gap-2">
                      <ArrowRight aria-hidden className="mt-1 size-3.5 flex-none text-teal" />
                      {output}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

/** Lưới gọn cho trang chủ. */
export function AiAgentMini() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {aiAgents.map((agent) => {
        const Icon = icons[agent.key];
        return (
          <li key={agent.key}>
            <Link
              href="/giai-phap/ai-agent-hai-quan/"
              className="card flex h-full flex-col gap-3 p-5.5 transition-colors hover:border-teal"
            >
              <span className="icon-tile bg-teal-soft text-teal">
                <Icon aria-hidden className="size-5" strokeWidth={1.8} />
              </span>
              <h3 className="text-[15.5px] leading-snug font-semibold text-navy">{agent.name}</h3>
              <p className="text-[13.5px] text-muted">{agent.summary}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

const rows = [
  { field: "Số kiện", ci: "120", pl: "120", bl: "120", ok: true },
  { field: "Trọng lượng (kg)", ci: "2.450", pl: "2.450", bl: "2.480", ok: false },
  { field: "Số container", ci: "", pl: "", bl: "TCLU 482193-0", ok: true },
];

/** Khung minh hoạ: AI Agent đối chiếu 3 chứng từ và gợi ý mã HS. Dữ liệu minh hoạ. */
export function DocCheckMock() {
  return (
    <div className="card overflow-hidden" role="img" aria-label="Ví dụ AI Agent đối chiếu Invoice, Packing List, Bill of Lading và gợi ý mã HS, dữ liệu minh hoạ">
      <div className="flex items-center justify-between gap-3 bg-navy px-5 py-3.5 text-white">
        <p className="text-[14px] font-semibold">Đối chiếu chứng từ, lô hàng xuất khẩu</p>
        <span className="text-[11.5px] text-white/70">AI Agent</span>
      </div>
      <div className="overflow-x-auto px-5 pt-4">
        <table className="w-full min-w-[320px] text-[12.5px]">
          <thead>
            <tr className="text-left text-muted">
              <th className="pb-2 font-semibold">Trường</th>
              <th className="pb-2 font-semibold">Invoice</th>
              <th className="pb-2 font-semibold">Packing List</th>
              <th className="pb-2 font-semibold">B/L</th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {rows.map((row) => (
              <tr key={row.field} className={`border-t border-line ${row.ok ? "" : "bg-warn-soft"}`}>
                <td className="py-2 pr-2 font-medium text-navy">{row.field}</td>
                <td className="py-2 pr-2">{row.ci || "–"}</td>
                <td className="py-2 pr-2">{row.pl || "–"}</td>
                <td className="py-2">{row.bl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-2.5 px-5 py-4 text-[13px]">
        <p className="flex gap-2 text-warn">
          <TriangleAlert aria-hidden className="mt-0.5 size-4 flex-none" />
          Trọng lượng trên B/L lệch 30 kg so với Invoice và Packing List. Cần kiểm tra lại.
        </p>
        <div className="rounded-[10px] bg-teal-soft p-3">
          <p className="text-[12px] text-muted">Mô tả hàng: Áo sơ mi nam, 100% cotton, dệt thoi</p>
          <p className="mt-1 font-semibold text-navy">Mã HS đề xuất: 6205.20</p>
          <p className="text-[12px] text-muted">Nhóm 62.05: áo sơ mi nam hoặc bé trai. Người khai xác nhận mã 8 số theo Biểu thuế.</p>
        </div>
        <p className="flex gap-2 text-teal">
          <CircleCheck aria-hidden className="mt-0.5 size-4 flex-none" />
          Đã điền trước 24 trường của tờ khai, chờ nhân viên duyệt.
        </p>
      </div>
      <p className="border-t border-line px-5 py-2.5 text-[11.5px] text-muted">Ví dụ minh hoạ, dữ liệu không có thật.</p>
    </div>
  );
}
