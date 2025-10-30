'use server';

/**
 * @fileOverview A flow to display detailed learning logs of the AI tutor.
 *
 * - showDetailedLearningLogs - A function that retrieves and formats the learning logs.
 * - ShowDetailedLearningLogsInput - The input type for the showDetailedLearningLogs function.
 * - ShowDetailedLearningLogsOutput - The return type for the showDetailedLearningLogs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ShowDetailedLearningLogsInputSchema = z.object({
  contentId: z.string().describe('The ID of the content to retrieve learning logs for.'),
});
export type ShowDetailedLearningLogsInput = z.infer<
  typeof ShowDetailedLearningLogsInputSchema
>;

const ShowDetailedLearningLogsOutputSchema = z.object({
  logs: z.string().describe('Detailed learning logs from the content.'),
});
export type ShowDetailedLearningLogsOutput = z.infer<
  typeof ShowDetailedLearningLogsOutputSchema
>;

export async function showDetailedLearningLogs(
  input: ShowDetailedLearningLogsInput
): Promise<ShowDetailedLearningLogsOutput> {
  return showDetailedLearningLogsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'showDetailedLearningLogsPrompt',
  input: {schema: ShowDetailedLearningLogsInputSchema},
  output: {schema: ShowDetailedLearningLogsOutputSchema},
  prompt: `You are an AI tutor.  You are being asked to provide detailed learning logs.

  Content ID: {{{contentId}}}
  Give verbose, complete logs of everything you have learned from this content ID. Include every detail.
  `,
});

const showDetailedLearningLogsFlow = ai.defineFlow(
  {
    name: 'showDetailedLearningLogsFlow',
    inputSchema: ShowDetailedLearningLogsInputSchema,
    outputSchema: ShowDetailedLearningLogsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
