'use server';

/**
 * @fileOverview A flow that summarizes uploaded content.
 *
 * - summarizeUploadedContent - A function that handles the content summarization process.
 * - SummarizeUploadedContentInput - The input type for the summarizeUploadedContent function.
 * - SummarizeUploadedContentOutput - The return type for the summarizeUploadedContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeUploadedContentInputSchema = z.object({
  content: z.string().describe('The content to be summarized.'),
});
export type SummarizeUploadedContentInput = z.infer<
  typeof SummarizeUploadedContentInputSchema
>;

const SummarizeUploadedContentOutputSchema = z.object({
  summary: z.string().describe('The summary of the content.'),
});
export type SummarizeUploadedContentOutput = z.infer<
  typeof SummarizeUploadedContentOutputSchema
>;

export async function summarizeUploadedContent(
  input: SummarizeUploadedContentInput
): Promise<SummarizeUploadedContentOutput> {
  return summarizeUploadedContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeUploadedContentPrompt',
  input: {schema: SummarizeUploadedContentInputSchema},
  output: {schema: SummarizeUploadedContentOutputSchema},
  prompt: `You are an expert at creating detailed study guides. Create a comprehensive "cheat sheet" summary of the following content. The summary should cover all key aspects, concepts, and important details in a structured and easy-to-digest format, such as using bullet points or numbered lists for clarity. The output must be a JSON object with a "summary" field containing the detailed cheat sheet.\n\nContent: {{{content}}}`,
});

const summarizeUploadedContentFlow = ai.defineFlow(
  {
    name: 'summarizeUploadedContentFlow',
    inputSchema: SummarizeUploadedContentInputSchema,
    outputSchema: SummarizeUploadedContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
