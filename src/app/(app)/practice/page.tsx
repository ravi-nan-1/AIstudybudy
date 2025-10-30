"use client";

import { useActionState, useEffect, useState, useRef } from "react";
import { generatePracticeQuiz, type GeneratePracticeQuizOutput } from "@/ai/flows/generate-practice-quiz";
import { useContent, type Content } from "@/context/content-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, ClipboardCheck, Timer, CheckCircle, XCircle } from "lucide-react";

type QuizState = "setup" | "loading" | "active" | "finished";
type Question = GeneratePracticeQuizOutput["quiz"][0];

export default function PracticePage() {
  const { content: MOCK_CONTENT } = useContent();
  const [quizState, setQuizState] = useState<QuizState>("setup");
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [numQuestions, setNumQuestions] = useState("10");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [state, formAction, isPending] = useActionState(
    async (prevState, formData: FormData) => {
      setQuizState("loading");
      const contentId = formData.get("contentId") as string;
      const num = formData.get("numQuestions") as "10" | "20" | "30";

      const content = MOCK_CONTENT.find((c) => c.id === contentId);
      if (!content) return { error: "Content not found." };
      
      setSelectedContent(content);
      setNumQuestions(num);

      try {
        const result = await generatePracticeQuiz({ content: content.fullText, numQuestions: num });
        setQuestions(result.quiz);
        setUserAnswers(new Array(result.quiz.length).fill(null));
        setTimeLeft(result.quiz.length * 60); // 1 minute per question
        setCurrentQuestionIndex(0);
        setQuizState("active");
        return { error: null };
      } catch (e) {
        setQuizState("setup");
        return { error: "Failed to generate quiz. Please try again." };
      }
    },
    { error: null }
  );

  useEffect(() => {
    if (quizState === "active" && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft <= 0 && quizState === "active") {
      if (timerRef.current) clearInterval(timerRef.current);
      finishQuiz();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizState, timeLeft]);

  const handleAnswerChange = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const finishQuiz = () => {
    let correctAnswers = 0;
    questions.forEach((q, index) => {
      if (q.answer === userAnswers[index]) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setQuizState("finished");
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };
  
  const restartQuiz = () => {
    setQuizState("setup");
    setQuestions([]);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(0);
  };

  if (quizState === "setup" || quizState === "loading") {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Practice Quiz</h1>
          <p className="text-muted-foreground">Generate a quiz to test your knowledge.</p>
        </div>
        <Card className="max-w-2xl mx-auto w-full">
          <CardHeader>
            <CardTitle>Quiz Setup</CardTitle>
            <CardDescription>Select your content and number of questions to start.</CardDescription>
          </CardHeader>
          <form action={formAction}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contentId">Content</Label>
                <Select name="contentId" required disabled={MOCK_CONTENT.length === 0}>
                  <SelectTrigger id="contentId"><SelectValue placeholder="Select content..." /></SelectTrigger>
                  <SelectContent>{MOCK_CONTENT.map((c) => <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Number of Questions</Label>
                <RadioGroup name="numQuestions" defaultValue="10" className="flex gap-4">
                  {["10", "20", "30"].map(val => (
                    <div key={val} className="flex items-center space-x-2">
                      <RadioGroupItem value={val} id={`q-${val}`} />
                      <Label htmlFor={`q-${val}`}>{val}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
               {state?.error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{state.error}</AlertDescription></Alert>}
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isPending || MOCK_CONTENT.length === 0} className="w-full">
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ClipboardCheck className="mr-2 h-4 w-4" />}
                Start Quiz
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }

  if (quizState === "active" && questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
      <div className="max-w-4xl mx-auto w-full space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Quiz in Progress</CardTitle>
                <CardDescription>{selectedContent?.title}</CardDescription>
              </div>
              <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                <Timer className="h-5 w-5" />
                <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
              </div>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="mb-6" />
            <div className="space-y-4">
              <p className="font-semibold text-lg">{currentQuestionIndex + 1}. {currentQuestion.question}</p>
              <RadioGroup value={userAnswers[currentQuestionIndex]} onValueChange={handleAnswerChange} className="space-y-2">
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted has-[[data-state=checked]]:border-primary transition-colors">
                    <RadioGroupItem value={option} id={`q-${currentQuestionIndex}-o-${index}`} />
                    <Label htmlFor={`q-${currentQuestionIndex}-o-${index}`} className="flex-1 cursor-pointer">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
           <CardFooter>
             <Button onClick={handleNextQuestion} className="ml-auto">
                {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  if (quizState === "finished") {
     const percentage = Math.round((score / questions.length) * 100);
     return (
        <div className="flex flex-col gap-8 items-center">
            <h1 className="text-3xl font-bold tracking-tight">Quiz Results</h1>
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle>Your Score</CardTitle>
                    <CardDescription>Results for "{selectedContent?.title}"</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className={`text-6xl font-bold ${percentage >= 70 ? 'text-chart-2' : percentage >= 40 ? 'text-accent' : 'text-destructive'}`}>
                        {percentage}%
                    </div>
                    <div className="flex justify-around">
                      <div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-chart-2"/> Correct: {score}</div>
                      <div className="flex items-center gap-2"><XCircle className="h-5 w-5 text-destructive"/> Incorrect: {questions.length - score}</div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={restartQuiz} className="w-full">Try Again</Button>
                </CardFooter>
            </Card>
        </div>
     );
  }

  return (
     <div className="flex flex-col gap-8 items-center justify-center min-h-[400px]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading quiz...</p>
    </div>
  );
}
