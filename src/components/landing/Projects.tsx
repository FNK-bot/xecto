import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Section } from "./Section";
import type { Project } from "@/lib/types";

type ProjectsProps = {
  projects: Project[];
};

export function Projects({ projects }: ProjectsProps) {
  return (
    <Section
      id="projects"
      className="bg-muted/50"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Our Recent Work
        </h2>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          A glimpse into the innovative solutions we've delivered for our
          clients.
        </p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Card
            key={project.id}
            className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300 animate-in fade-in slide-in-from-bottom-12"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <CardHeader className="p-0">
              <div className="aspect-[3/2] w-full overflow-hidden">
                <Image
                  src={project.image.src}
                  alt={project.name}
                  width={600}
                  height={400}
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  data-ai-hint={project.image.hint}
                />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="font-headline text-xl">
                {project.name}
              </CardTitle>
              <CardDescription className="mt-2 text-base">
                {project.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  );
}
