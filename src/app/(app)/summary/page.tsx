"use client";

import { useActionState, useState } from "react";
import { summarizeUploadedContent } from "@/ai/flows/summarize-uploaded-content";
import { useContent } from "@/context/content-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, FileText } from "lucide-react";

type State = {
  summary: string | null;
  error: string | null;
};

export default function SummaryPage() {
  const { content: availableContent } = useContent();
  const [contentId, setContentId] = useState<string | null>(null);

  const [state, formAction, isPending] = useActionState(
    async (prevState: State, formData: FormData): Promise<State> => {
      const id = formData.get("contentId") as string;
      if (!id) {
        return { summary: null, error: "Please select a content to summarize." };
      }
      const contentToSummarize = availableContent.find((c) => c.id === id);
      if (!contentToSummarize) {
        return { summary: null, error: "Content not found." };
      }
      try {
        const result = await summarizeUploadedContent({
          content: contentToSummarize.fullText,
        });
        return { summary: result.summary, error: null };
      } catch (error) {
        console.error(error);
        return { summary: null, error: "Failed to generate summary." };
      }
    },
    { summary: null, error: null }
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Generate Summary</h1>
        <p className="text-muted-foreground">
          Get a quick summary of your uploaded content to grasp key points.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Summarize Content</CardTitle>
          <CardDescription>
            Select a piece of content and the AI will generate a concise
            summary for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <Select
              name="contentId"
              onValueChange={setContentId}
              disabled={isPending || availableContent.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select content..." />
              </SelectTrigger>
              <SelectContent>
                {availableContent.map((content) => (
                  <SelectItem key={content.id} value={content.id}>
                    {content.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" disabled={isPending || !contentId}>
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FileText className="mr-2 h-4 w-4" />
              )}
              Generate Summary
            </Button>
          </form>
        </CardContent>
      </Card>

      {isPending && (
        <Card>
          <CardContent className="p-6 flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </CardContent>
        </Card>
      )}

      {state.error && !isPending && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{state.error}</p>
          </CardContent>
        </Card>
      )}

      {state.summary && !isPending && (
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>
              Summary for:{" "}
              {availableContent.find((c) => c.id === contentId)?.title}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-72 w-full rounded-md border p-4 bg-muted/50">
              <p className="text-sm">{state.summary}</p>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
