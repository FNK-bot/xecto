'use server';

/**
 * @fileOverview AI-powered tool that enhances user-submitted project descriptions with more engaging and SEO-friendly content.
 *
 * - enhanceProjectDescription - A function that enhances the project description.
 * - EnhanceProjectDescriptionInput - The input type for the enhanceProjectDescription function.
 * - EnhanceProjectDescriptionOutput - The return type for the enhanceProjectDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceProjectDescriptionInputSchema = z.object({
  description: z.string().describe('The original project description.'),
  keywords: z.string().describe('Keywords related to the project for SEO optimization.'),
});
export type EnhanceProjectDescriptionInput = z.infer<typeof EnhanceProjectDescriptionInputSchema>;

const EnhanceProjectDescriptionOutputSchema = z.object({
  enhancedDescription: z.string().describe('The enhanced project description.'),
});
export type EnhanceProjectDescriptionOutput = z.infer<typeof EnhanceProjectDescriptionOutputSchema>;

export async function enhanceProjectDescription(input: EnhanceProjectDescriptionInput): Promise<EnhanceProjectDescriptionOutput> {
  return enhanceProjectDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceProjectDescriptionPrompt',
  input: {schema: EnhanceProjectDescriptionInputSchema},
  output: {schema: EnhanceProjectDescriptionOutputSchema},
  prompt: `You are an expert copywriter specializing in creating engaging and SEO-friendly project descriptions.

  Please enhance the following project description to make it more appealing and optimize it for search engines using the provided keywords.

  Original Description: {{{description}}}
  Keywords: {{{keywords}}}

  Enhanced Description:`, // The response MUST ONLY contain the enhanced description.
});

const enhanceProjectDescriptionFlow = ai.defineFlow(
  {
    name: 'enhanceProjectDescriptionFlow',
    inputSchema: EnhanceProjectDescriptionInputSchema,
    outputSchema: EnhanceProjectDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
