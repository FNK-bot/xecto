import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="w-full py-24 md:py-32 lg:py-40 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="mx-auto grid max-w-4xl gap-6 text-center">
          <div
            className="animate-in fade-in slide-in-from-bottom-12 duration-500"
          >
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Building the Future of the Web. Precisely.
            </h1>
          </div>
          <p className="text-lg text-muted-foreground md:text-xl animate-in fade-in slide-in-from-bottom-16 duration-500 delay-100">
            Xacto Hub is a premier web development agency dedicated to crafting
            elegant, high-performance digital experiences that drive results.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center animate-in fade-in slide-in-from-bottom-20 duration-500 delay-200">
            <Button size="lg" asChild>
              <Link href="#contact">Start a Project</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#projects">Explore Our Work</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
