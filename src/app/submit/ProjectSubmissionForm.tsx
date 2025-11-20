"use client";

import { useFormState } from "react-hook-form";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { submitProject } from "@/app/actions";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  FileWarning,
  MessageCircleQuestion,
  Sparkles,
  ThumbsUp,
} from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Analyzing & Submitting..." : "Submit Project"}
    </Button>
  );
}

const initialState = {
  message: "",
  errors: {},
  analysis: null,
};

export function ProjectSubmissionForm() {
  const [state, formAction] = useFormState(submitProject, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state.message) return;

    if (state.errors && Object.keys(state.errors).length === 0 && !state.analysis?.missingInformation?.length && !state.analysis?.inappropriateContent?.length) {
      toast({
        title: "Success!",
        description: state.message,
        className: "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100",
        action: <ThumbsUp className="text-green-500" />
      });
      formRef.current?.reset();
    } else {
       toast({
        variant: "destructive",
        title: "Action Required",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="mt-12">
      <Card>
        <form action={formAction} ref={formRef}>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>
              All fields are required unless marked optional.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input id="projectName" name="projectName" />
                {state.errors?.projectName && (
                  <p className="text-sm text-destructive">{state.errors.projectName[0]}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="companyName">Client Company Name</Label>
                <Input id="companyName" name="companyName" />
                 {state.errors?.companyName && (
                  <p className="text-sm text-destructive">{state.errors.companyName[0]}</p>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="projectDescription">Project Description</Label>
              <Textarea id="projectDescription" name="projectDescription" className="min-h-32" />
               {state.errors?.projectDescription && (
                  <p className="text-sm text-destructive">{state.errors.projectDescription[0]}</p>
                )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input id="imageUrl" name="imageUrl" type="url" placeholder="https://example.com/image.png"/>
               {state.errors?.imageUrl && (
                  <p className="text-sm text-destructive">{state.errors.imageUrl[0]}</p>
                )}
            </div>
             <div className="grid gap-2">
              <Label htmlFor="technologiesUsed">Technologies Used</Label>
              <Input id="technologiesUsed" name="technologiesUsed" placeholder="Next.js, Tailwind CSS, Firebase"/>
              <p className="text-sm text-muted-foreground">Comma-separated list.</p>
               {state.errors?.technologiesUsed && (
                  <p className="text-sm text-destructive">{state.errors.technologiesUsed[0]}</p>
                )}
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="grid gap-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input id="contactEmail" name="contactEmail" type="email" />
                {state.errors?.contactEmail && (
                    <p className="text-sm text-destructive">{state.errors.contactEmail[0]}</p>
                    )}
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="testimonial">Testimonial (Optional)</Label>
                    <Textarea id="testimonial" name="testimonial" />
                </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-4">
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      {state.analysis && (
        <div className="mt-8 space-y-4 animate-in fade-in">
          <h3 className="font-headline text-2xl font-bold">AI Analysis Report</h3>
          {state.analysis.suggestions && (
             <Alert className="border-blue-500/50 text-blue-900 dark:text-blue-200">
              <Sparkles className="h-4 w-4 !text-blue-500" />
              <AlertTitle className="text-blue-700 dark:text-blue-300">Improvement Suggestions</AlertTitle>
              <AlertDescription>{state.analysis.suggestions}</AlertDescription>
            </Alert>
          )}
           {state.analysis.missingInformation.length > 0 && (
            <Alert variant="destructive" className="border-yellow-500/50 text-yellow-900 dark:text-yellow-200">
              <MessageCircleQuestion className="h-4 w-4 !text-yellow-500" />
              <AlertTitle className="text-yellow-700 dark:text-yellow-300">Missing Information</AlertTitle>
              <AlertDescription>
                The following fields may be incomplete: {state.analysis.missingInformation.join(", ")}.
              </AlertDescription>
            </Alert>
          )}
          {state.analysis.inappropriateContent.length > 0 && (
            <Alert variant="destructive">
              <FileWarning className="h-4 w-4" />
              <AlertTitle>Inappropriate Content Detected</AlertTitle>
              <AlertDescription>
                Potential issues found in fields: {state.analysis.inappropriateContent.join(", ")}. Please review.
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  );
}
