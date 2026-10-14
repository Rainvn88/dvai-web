import { ArrowDown, ArrowRight } from "lucide-react";
import { Fragment } from "react";

type Node = { title: string; text: string };

/** Sơ đồ luồng ngang trên desktop, dọc trên điện thoại. */
export function FlowDiagram({ nodes, label }: { nodes: Node[]; label: string }) {
  return (
    <ol aria-label={label} className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
      {nodes.map((node, index) => (
        <Fragment key={node.title}>
          {index > 0 && (
            <li aria-hidden className="grid place-items-center text-line-strong">
              <ArrowRight className="hidden size-5 lg:block" />
              <ArrowDown className="size-5 lg:hidden" />
            </li>
          )}
          <li className="card flex-1 p-4.5">
            <p className="text-[15px] font-semibold text-navy">{node.title}</p>
            <p className="mt-1 text-[13.5px] text-muted">{node.text}</p>
          </li>
        </Fragment>
      ))}
    </ol>
  );
}
