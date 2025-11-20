'use server';

/**
 * @fileOverview Analyzes project submissions for potential issues before publication.
 *
 * - analyzeProjectSubmission - A function that analyzes a project submission and identifies potential issues.
 * - AnalyzeProjectSubmissionInput - The input type for the analyzeProjectSubmission function.
 * - AnalyzeProjectSubmissionOutput - The return type for the analyzeProjectSubmission function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeProjectSubmissionInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  projectDescription: z.string().describe('A detailed description of the project.'),
  technologiesUsed: z.string().describe('A comma-separated list of technologies used in the project.'),
  imageUrl: z.string().describe('URL of the project image.'),
  companyName: z.string().describe('The name of the client company.'),
  testimonial: z.string().optional().describe('A testimonial from the client, if available.'),
  contactEmail: z.string().describe('The contact email for the project.'),
});
export type AnalyzeProjectSubmissionInput = z.infer<
  typeof AnalyzeProjectSubmissionInputSchema
>;

const AnalyzeProjectSubmissionOutputSchema = z.object({
  missingInformation: z
    .array(z.string())
    .describe('A list of fields with missing information.'),
  inappropriateContent: z
    .array(z.string())
    .describe('A list of fields with inappropriate content.'),
  suggestions: z
    .string()
    .describe('Suggestions for improving the project submission.'),
});

export type AnalyzeProjectSubmissionOutput = z.infer<
  typeof AnalyzeProjectSubmissionOutputSchema
>;

export async function analyzeProjectSubmission(
  input: AnalyzeProjectSubmissionInput
): Promise<AnalyzeProjectSubmissionOutput> {
  return analyzeProjectSubmissionFlow(input);
}

const analyzeProjectSubmissionPrompt = ai.definePrompt({
  name: 'analyzeProjectSubmissionPrompt',
  input: {schema: AnalyzeProjectSubmissionInputSchema},
  output: {schema: AnalyzeProjectSubmissionOutputSchema},
  prompt: `You are an expert project submission analyzer.

  Your task is to review project submissions and identify any potential issues.
  Specifically, you should check for:
  - Missing information: Identify any required fields that are empty or incomplete.
  - Inappropriate content: Flag any content that is offensive, misleading, or irrelevant.

  Based on your analysis, provide suggestions for improving the project submission.

  Project Name: {{{projectName}}}
  Project Description: {{{projectDescription}}}
  Technologies Used: {{{technologiesUsed}}}
  Image URL: {{{imageUrl}}}
  Company Name: {{{companyName}}}
  Testimonial: {{{testimonial}}}
  Contact Email: {{{contactEmail}}}

  Respond with a JSON object that has the following structure:
  {
    "missingInformation": ["list", "of", "missing", "fields"],
    "inappropriateContent": ["list", "of", "inappropriate", "content", "fields"],
    "suggestions": "suggestions for improving the project submission"
  }`,
});

const analyzeProjectSubmissionFlow = ai.defineFlow(
  {
    name: 'analyzeProjectSubmissionFlow',
    inputSchema: AnalyzeProjectSubmissionInputSchema,
    outputSchema: AnalyzeProjectSubmissionOutputSchema,
  },
  async input => {
    const {output} = await analyzeProjectSubmissionPrompt(input);
    return output!;
  }
);
