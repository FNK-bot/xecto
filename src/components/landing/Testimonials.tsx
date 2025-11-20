import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonials } from "@/lib/data";
import { Section } from "./Section";

export function Testimonials() {
  return (
    <Section id="testimonials" className="bg-muted/50">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          What Our Clients Say
        </h2>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          We're proud to have earned the trust of innovative companies. Here's
          what they think of our work.
        </p>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="mx-auto mt-12 w-full max-w-sm md:max-w-2xl lg:max-w-4xl"
      >
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <Card className="h-full">
                  <CardContent className="flex h-full flex-col items-start justify-between gap-6 p-6">
                    <blockquote className="text-lg italic text-foreground">
                      “{testimonial.quote}”
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src={testimonial.image.src}
                          alt={testimonial.name}
                          data-ai-hint={testimonial.image.hint}
                        />
                        <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.title}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Section>
  );
}
