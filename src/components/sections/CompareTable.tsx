import { Check, Minus } from "lucide-react";

type Props = {
  head: [string, string, string];
  rows: [string, string, string][];
  caption: string;
};

/** Bảng so sánh 3 cột, cột giữa là DVAI. */
export function CompareTable({ head, rows, caption }: Props) {
  return (
    <div className="card overflow-hidden">
      <div className="relative overflow-x-auto">
        <table className="w-full min-w-[620px] border-collapse text-[15px]">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              <th scope="col" className="bg-[#f6f9fa] px-5.5 py-4 text-left text-[13px] font-semibold text-muted">
                {head[0]}
              </th>
              <th scope="col" className="bg-teal-soft px-5.5 py-4 text-left text-[13px] font-semibold text-teal">
                {head[1]}
              </th>
              <th scope="col" className="bg-[#f6f9fa] px-5.5 py-4 text-left text-[13px] font-semibold text-muted">
                {head[2]}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, us, them]) => (
              <tr key={label} className="border-t border-line">
                <th scope="row" className="px-5.5 py-4 text-left font-normal">
                  {label}
                </th>
                <td className="bg-teal-soft/50 px-5.5 py-4 font-semibold text-navy">
                  <span className="flex items-center gap-2.5">
                    <Check aria-hidden className="size-5 flex-none text-teal" />
                    {us}
                  </span>
                </td>
                <td className="px-5.5 py-4 text-muted">
                  <span className="flex items-center gap-2.5">
                    <Minus aria-hidden className="size-5 flex-none text-[#9db0b8]" />
                    {them}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
