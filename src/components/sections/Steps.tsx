type Step = { title: string; text: string };

const cols = {
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-5",
  6: "sm:grid-cols-2 lg:grid-cols-3",
} as const;

/** Các bước theo thứ tự thật của quy trình. */
export function Steps({ items }: { items: Step[] }) {
  const columns = cols[items.length as keyof typeof cols] ?? cols[4];
  return (
    <ol className={`grid gap-x-6 gap-y-8 border-t border-line-strong ${columns}`}>
      {items.map((step, index) => (
        <li key={step.title} className="relative pt-6">
          <span
            aria-hidden
            className="absolute -top-[7px] left-0 size-[13px] rounded-full border-[3px] border-bg bg-teal"
          />
          <span className="mb-2 block font-display text-[28px] leading-none text-teal" aria-hidden>
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mb-1.5 text-[16px] font-semibold text-navy">{step.title}</h3>
          <p className="text-[14px] text-muted">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
