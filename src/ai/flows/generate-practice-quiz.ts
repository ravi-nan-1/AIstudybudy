'use server';

/**
 * @fileOverview A practice quiz generation AI agent.
 *
 * - generatePracticeQuiz - A function that handles the quiz generation process.
 * - GeneratePracticeQuizInput - The input type for the generatePracticeQuiz function.
 * - GeneratePracticeQuizOutput - The return type for the generatePracticeQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePracticeQuizInputSchema = z.object({
  content: z.string().describe('The content to generate the quiz from.'),
  numQuestions: z
    .enum(['10', '20', '30'])
    .describe('The number of questions to generate.'),
});
export type GeneratePracticeQuizInput = z.infer<typeof GeneratePracticeQuizInputSchema>;

const GeneratePracticeQuizOutputSchema = z.object({
  quiz: z.array(
    z.object({
      question: z.string().describe('The quiz question.'),
      options: z.array(z.string()).describe('The possible answers.'),
      answer: z.string().describe('The correct answer.'),
    })
  ).
describe('The generated quiz questions and answers.'),
});
export type GeneratePracticeQuizOutput = z.infer<typeof GeneratePracticeQuizOutputSchema>;

export async function generatePracticeQuiz(input: GeneratePracticeQuizInput): Promise<GeneratePracticeQuizOutput> {
  return generatePracticeQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePracticeQuizPrompt',
  input: {schema: GeneratePracticeQuizInputSchema},
  output: {schema: GeneratePracticeQuizOutputSchema},
  prompt: `You are an expert quiz generator. Generate a quiz with {{{numQuestions}}} questions based on the following content: {{{content}}}. The output must be a JSON array of question objects. Each question object should have a question field, an options field that's an array of possible answers, and an answer field with the correct answer.\n\nEnsure that the answer is always present in the options array.\n`,
});

const generatePracticeQuizFlow = ai.defineFlow(
  {
    name: 'generatePracticeQuizFlow',
    inputSchema: GeneratePracticeQuizInputSchema,
    outputSchema: GeneratePracticeQuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
