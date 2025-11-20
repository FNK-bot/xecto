import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("w-full border-t", className)}
    >
      <div className="container px-4 md:px-6 py-16 md:py-24 lg:py-32">{children}</div>
    </section>
  );
}
