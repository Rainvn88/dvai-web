import { Check } from "lucide-react";

/** Khung nền xanh nhạt liệt kê các ý, dùng ở cột phải của bố cục 2 cột. */
export function ChecklistPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-blue/16 bg-blue-soft p-7.5">
      <p className="eyebrow mb-4 text-navy">{title}</p>
      <ul className="grid gap-3.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-normal font-medium text-navy">
            <Check aria-hidden className="mt-0.5 size-5 flex-none text-blue" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
