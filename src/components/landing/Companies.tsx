import Image from "next/image";
import { companies } from "@/lib/data";
import { Section } from "./Section";

export function Companies() {
  const allCompanies = [...companies, ...companies]; // Duplicate for seamless scroll

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
      <div className="relative mt-12 w-full overflow-hidden">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {allCompanies.map((company, index) => (
            <div key={`${company.id}-${index}`} className="flex flex-shrink-0 items-center justify-center px-8 md:px-12 lg:px-16">
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
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent"></div>
      </div>
    </Section>
  );
}
