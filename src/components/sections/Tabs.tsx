"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Check } from "lucide-react";

export type TabItem = { label: string; title: string; text: string; points?: string[] };

/** Tab có điều hướng bằng phím mũi tên theo mẫu WAI-ARIA. */
export function Tabs({ items, label }: { items: TabItem[]; label: string }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const last = items.length - 1;
    let next = active;
    if (event.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (event.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  const current = items[active];
  return (
    <div>
      <div role="tablist" aria-label={label} className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <button
            key={item.label}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${index}`}
            aria-selected={index === active}
            aria-controls={`${baseId}-panel`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={onKeyDown}
            className={`min-h-11 cursor-pointer rounded-full border px-4 text-[14px] font-semibold transition-colors ${
              index === active
                ? "border-navy bg-navy text-white"
                : "border-line-strong bg-white text-navy hover:border-navy"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${active}`}
        className="card mt-4 grid gap-6 p-6 sm:p-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
      >
        <div>
          <h3 className="display-3 mb-3">{current.title}</h3>
          <p className="text-[15.5px] text-muted">{current.text}</p>
        </div>
        {current.points && (
          <ul className="grid content-start gap-3">
            {current.points.map((point) => (
              <li key={point} className="flex gap-2.5 text-[15px] text-ink">
                <Check aria-hidden className="mt-0.5 size-5 flex-none text-teal" />
                {point}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
