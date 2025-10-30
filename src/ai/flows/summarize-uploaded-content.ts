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
  prompt: `Summarize the following content to help students quickly grasp the key information:\n\nContent: {{{content}}}`,
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
