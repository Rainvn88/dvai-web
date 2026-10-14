import Link from "next/link";

export type NumberedRow = {
  cond: string;
  title: string;
  text: string;
  href: string;
  linkLabel?: string;
  highlight?: boolean;
};

const condTones = ["text-teal", "text-blue", "text-slate"];

/** Danh sách lộ trình đánh số. Chỉ dùng khi nội dung thật sự là một trình tự. */
export function NumberedRows({ rows }: { rows: NumberedRow[] }) {
  return (
    <ol className="card overflow-hidden rounded-2xl">
      {rows.map((row, index) => {
        const hi = row.highlight;
        return (
          <li key={row.title} className="border-b border-line last:border-b-0">
            <Link
              href={row.href}
              className={`grid grid-cols-[56px_minmax(0,1fr)] sm:grid-cols-[88px_minmax(0,1fr)_180px] ${hi ? "on-dark bg-navy" : "hover:bg-[#f8fbfc]"}`}
            >
              <span
                className={`grid place-items-center border-r font-display text-[22px] sm:text-[30px] ${hi ? "border-white/10 text-sky" : "border-line text-[#a6bcc7]"}`}
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 px-4.5 py-4.5 sm:px-6.5 sm:py-5">
                <span
                  className={`block text-[11.5px] font-bold tracking-[0.1em] uppercase ${hi ? "text-sky" : condTones[index % condTones.length]}`}
                >
                  {row.cond}
                </span>
                <span className={`mt-1 mb-0.5 block text-[17px] font-semibold ${hi ? "text-white" : "text-navy"}`}>
                  {row.title}
                </span>
                <span className={`block text-[14.5px] ${hi ? "text-white/70" : "text-muted"}`}>{row.text}</span>
              </span>
              <span
                className={`col-start-2 flex items-center px-4.5 pb-4.5 text-[14px] font-semibold sm:col-start-auto sm:justify-end sm:border-l sm:px-6.5 sm:pb-0 ${hi ? "border-white/10 text-sky" : "border-line text-teal"}`}
              >
                {row.linkLabel ?? "Xem chi tiết"} →
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
