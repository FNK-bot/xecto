import Image from "next/image";
import { companies } from "@/lib/data";
import { Section } from "./Section";

export function Companies() {
  return (
    <Section id="companies">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Trusted by Industry Leaders
        </h2>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          We've had the privilege of working with a diverse range of forward-thinking companies.
        </p>
      </div>
      <div className="mt-12">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {companies.map((company) => (
            <div key={company.id} className="flex items-center justify-center">
              <Image
                src={company.logo.src}
                alt={company.name}
                width={160}
                height={40}
                className="object-contain grayscale transition-all hover:grayscale-0"
                data-ai-hint={company.logo.hint}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
