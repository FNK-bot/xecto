import { ProjectSubmissionForm } from "./ProjectSubmissionForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function SubmitProjectPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>
      <div className="space-y-4 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          Submit a New Project
        </h1>
        <p className="text-muted-foreground">
          Fill out the details below to add a new project to the Xacto Hub
          showcase. The submission will be analyzed by AI before publishing.
        </p>
      </div>
      <ProjectSubmissionForm />
    </main>
  );
}
