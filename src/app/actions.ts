"use server";

import { z } from "zod";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { analyzeProjectSubmission } from "@/ai/flows/analyze-project-submissions";
import type { AnalyzeProjectSubmissionOutput } from "@/ai/flows/analyze-project-submissions";

// Schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors below.",
    };
  }

  // Here you would typically send an email or save to a database.
  console.log("Contact form submitted:", validatedFields.data);

  return {
    message: "Thank you for your message! We will get back to you soon.",
    errors: {},
  };
}

// Schema for project submission
const projectSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  projectDescription: z.string().min(1, "Project description is required"),
  technologiesUsed: z.string().min(1, "Technologies are required"),
  imageUrl: z.string().url("A valid image URL is required"),
  companyName: z.string().min(1, "Company name is required"),
  testimonial: z.string().optional(),
  contactEmail: z.string().email("A valid contact email is required"),
});

type ProjectSubmissionState = {
  message: string;
  errors?: {
    [key: string]: string[] | undefined;
  };
  analysis?: AnalyzeProjectSubmissionOutput | null;
}

export async function submitProject(
  prevState: ProjectSubmissionState,
  formData: FormData
): Promise<ProjectSubmissionState> {
  const validatedFields = projectSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your input.",
      analysis: null,
    };
  }

  try {
    // Step 1: Analyze with GenAI
    const analysisResult = await analyzeProjectSubmission(validatedFields.data);

    if (
      analysisResult.missingInformation.length > 0 ||
      analysisResult.inappropriateContent.length > 0
    ) {
      return {
        errors: {},
        message: "Submission has issues that need to be addressed before it can be published.",
        analysis: analysisResult,
      };
    }

    // Step 2: Save to Firebase
    await addDoc(collection(db, "projects"), {
      name: validatedFields.data.projectName,
      description: validatedFields.data.projectDescription,
      technologies: validatedFields.data.technologiesUsed
        .split(",")
        .map((t) => t.trim()),
      imageUrl: validatedFields.data.imageUrl,
      company: validatedFields.data.companyName,
      testimonial: validatedFields.data.testimonial || "",
      submittedAt: new Date(),
    });

    // Step 3: Revalidate cache for the homepage
    revalidatePath("/");

    return {
      message: "Project submitted successfully and is now live!",
      errors: {},
      analysis: analysisResult,
    };
  } catch (error) {
    console.error("Error submitting project:", error);
    return {
      message: "An unexpected error occurred. Please try again.",
      errors: {},
      analysis: null,
    };
  }
}
