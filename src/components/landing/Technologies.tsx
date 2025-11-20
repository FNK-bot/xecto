import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { technologies } from "@/lib/data";
import { Section } from "./Section";

export function Technologies() {
  return (
    <Section id="technologies">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          The Tech We Trust
        </h2>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          We leverage a modern, robust technology stack to build solutions that
          are scalable, secure, and future-proof.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-6">
        {technologies.map((tech, index) => (
          <div
            key={tech.name}
            className="animate-in fade-in slide-in-from-bottom-12 duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="group flex flex-col items-center justify-center gap-4 rounded-lg border bg-card p-6 text-center transition-all hover:bg-muted">
              <div className="rounded-full border bg-background p-3 transition-colors group-hover:border-primary">
                <tech.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-headline font-semibold">{tech.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
