'use server';

/**
 * @fileOverview Implements the ChatWithAiTutor flow for interactive Q&A with an AI tutor.
 *
 * - chatWithAiTutor - The main function to initiate the chat and get detailed answers.
 * - ChatWithAiTutorInput - The input type for the chatWithAiTutor function.
 * - ChatWithAiTutorOutput - The return type for the chatWithAiTutor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatWithAiTutorInputSchema = z.object({
  query: z.string().describe('The user query for the AI tutor.'),
});
export type ChatWithAiTutorInput = z.infer<typeof ChatWithAiTutorInputSchema>;

const ChatWithAiTutorOutputSchema = z.object({
  answer: z.string().describe('The detailed answer from the AI tutor.'),
});
export type ChatWithAiTutorOutput = z.infer<typeof ChatWithAiTutorOutputSchema>;

export async function chatWithAiTutor(input: ChatWithAiTutorInput): Promise<ChatWithAiTutorOutput> {
  return chatWithAiTutorFlow(input);
}

const chatWithAiTutorPrompt = ai.definePrompt({
  name: 'chatWithAiTutorPrompt',
  input: {schema: ChatWithAiTutorInputSchema},
  output: {schema: ChatWithAiTutorOutputSchema},
  prompt: `You are an AI tutor. Provide a detailed explanation to the user's question. Use your knowledge and the content you have learned to answer the query accurately and comprehensively.\n\nUser Query: {{{query}}}`,
});

const chatWithAiTutorFlow = ai.defineFlow(
  {
    name: 'chatWithAiTutorFlow',
    inputSchema: ChatWithAiTutorInputSchema,
    outputSchema: ChatWithAiTutorOutputSchema,
  },
  async input => {
    const {output} = await chatWithAiTutorPrompt(input);
    return output!;
  }
);
