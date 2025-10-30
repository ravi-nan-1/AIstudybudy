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
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, FileText, Download } from "lucide-react";
import jsPDF from "jspdf";

type State = {
  summary: string | null;
  error: string | null;
};

export default function SummaryPage() {
  const { content: availableContent } = useContent();

  const [state, formAction, isPending] = useActionState(
    async (prevState: State): Promise<State> => {
      if (availableContent.length === 0) {
        return { summary: null, error: "Please upload some content first." };
      }
      
      const combinedContent = availableContent
        .map((c) => `Content from: ${c.title}\n\n${c.fullText}`)
        .join("\n\n---\n\n");

      try {
        const result = await summarizeUploadedContent({
          content: combinedContent,
        });
        return { summary: result.summary, error: null };
      } catch (error) {
        console.error(error);
        return { summary: null, error: "Failed to generate summary." };
      }
    },
    { summary: null, error: null }
  );

  const handleDownloadPdf = () => {
    if (!state.summary) return;

    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 15;
    let yPos = 20;

    const checkAndAddPage = (spaceNeeded: number) => {
        if (yPos + spaceNeeded > pageHeight - margin) {
            doc.addPage();
            yPos = 20;
        }
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("AI Study Buddy - Master Cheat Sheet", pageWidth / 2, yPos, { align: 'center' });
    yPos += 15;
    
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;

    const summaryLines = doc.splitTextToSize(state.summary, pageWidth - (margin * 2));
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    
    summaryLines.forEach((line: string) => {
        checkAndAddPage(5); // Approximate height of one line
        doc.text(line, margin, yPos);
        yPos += 5;
    });

    doc.save(`ai_study_buddy_cheat_sheet.pdf`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Generate Study Guide</h1>
        <p className="text-muted-foreground">
          Create a comprehensive cheat sheet from all your uploaded content.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Full Study Guide</CardTitle>
          <CardDescription>
            Click the button below and the AI will generate a single, unified
            summary from all the materials in your library.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <Button type="submit" disabled={isPending || availableContent.length === 0}>
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FileText className="mr-2 h-4 w-4" />
              )}
              Generate Full Study Guide
            </Button>
            {availableContent.length === 0 && (
                <p className="text-sm text-muted-foreground mt-4">
                    You don't have any content in your library. Please <a href="/upload" className="underline">upload content</a> to generate a study guide.
                </p>
            )}
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
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Master Cheat Sheet</CardTitle>
              <CardDescription>
                A comprehensive summary of all your content.
              </CardDescription>
            </div>
            <Button variant="outline" onClick={handleDownloadPdf}>
              <Download className="mr-2 h-4 w-4" />
              Download as PDF
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96 w-full rounded-md border p-4 bg-muted/50">
              <pre className="text-sm whitespace-pre-wrap font-mono">{state.summary}</pre>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
