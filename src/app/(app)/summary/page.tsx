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
import { Loader2, FileText, Download } from "lucide-react";
import jsPDF from "jspdf";

type State = {
  summary: string | null;
  error: string | null;
  title: string | null;
};

export default function SummaryPage() {
  const { content: availableContent } = useContent();
  const [contentId, setContentId] = useState<string | null>(null);

  const [state, formAction, isPending] = useActionState(
    async (prevState: State, formData: FormData): Promise<State> => {
      const id = formData.get("contentId") as string;
      if (!id) {
        return { summary: null, error: "Please select a content to summarize.", title: null };
      }

      const selectedContent = availableContent.find((c) => c.id === id);
      if (!selectedContent) {
        return { summary: null, error: "Content not found.", title: null };
      }

      try {
        const result = await summarizeUploadedContent({
          content: selectedContent.fullText,
        });
        return { summary: result.summary, error: null, title: selectedContent.title };
      } catch (error) {
        console.error(error);
        return { summary: null, error: "Failed to generate summary.", title: null };
      }
    },
    { summary: null, error: null, title: null }
  );

  const handleDownloadPdf = () => {
    if (!state.summary || !state.title) return;

    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;
    let yPos = 20;

    doc.addFont("courier", "normal", "Courier");

    const checkAndAddPage = (spaceNeeded: number) => {
      if (yPos + spaceNeeded > pageHeight - margin) {
        doc.addPage();
        yPos = 20;
      }
    };

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(`Cheat Sheet: ${state.title}`, pageWidth / 2, yPos, {
      align: "center",
    });
    yPos += 15;

    const lines = state.summary.split('\n');
    let inCodeBlock = false;
    let codeBlockLines: string[] = [];

    const drawCodeBlock = () => {
      if (codeBlockLines.length > 0) {
        const blockHeight = codeBlockLines.length * 4 + 6;
        checkAndAddPage(blockHeight + 2);
        doc.setFillColor(245, 245, 245);
        doc.rect(margin, yPos - 3, contentWidth, blockHeight, 'F');
        doc.setFont("courier", "normal");
        doc.setFontSize(9);
        doc.setTextColor(50, 50, 50);
        doc.text(codeBlockLines.join('\n'), margin + 3, yPos + 1);
        yPos += blockHeight;
        codeBlockLines = [];
      }
    };

    lines.forEach(line => {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith('```')) {
        if (inCodeBlock) {
          drawCodeBlock();
        }
        inCodeBlock = !inCodeBlock;
        return;
      }

      if (inCodeBlock) {
        codeBlockLines.push(line);
        return;
      }

      if (!trimmedLine) {
        yPos += 5;
        checkAndAddPage(5);
        return;
      }

      if (/^\d+\.\s/.test(trimmedLine) || /^###\s/.test(trimmedLine)) {
        checkAndAddPage(12);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setFillColor(231, 235, 240);
        const titleText = trimmedLine.replace(/^\d+\.\s/, '').replace(/^###\s/, '');
        doc.rect(margin, yPos - 5, contentWidth, 10, 'F');
        doc.setTextColor(40, 40, 40);
        doc.text(titleText, margin + 2, yPos);
        yPos += 12;
      } else if (trimmedLine.startsWith('*   **') && trimmedLine.endsWith('**')) {
        checkAndAddPage(8);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(60, 60, 60);
        const text = trimmedLine.replace(/\*   \*\*|\*\*/g, '');
        doc.text(text, margin + 5, yPos);
        yPos += 6;
      } else if (trimmedLine.startsWith('*   ')) {
        checkAndAddPage(5);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(80, 80, 80);
        const bulletContent = doc.splitTextToSize(trimmedLine.replace('*   ', ''), contentWidth - 10);
        doc.text('•', margin + 8, yPos);
        doc.text(bulletContent, margin + 12, yPos);
        yPos += bulletContent.length * 4 + 2;
      } else {
        checkAndAddPage(5 * doc.splitTextToSize(trimmedLine, contentWidth).length);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(80, 80, 80);
        const textLines = doc.splitTextToSize(trimmedLine, contentWidth);
        doc.text(textLines, margin, yPos);
        yPos += textLines.length * 4 + 2;
      }
    });

    drawCodeBlock();

    doc.save(`${state.title.replace(/\s+/g, '_').toLowerCase()}_cheat_sheet.pdf`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Generate Study Guide</h1>
        <p className="text-muted-foreground">
          Create a comprehensive cheat sheet from your uploaded content.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Cheat Sheet</CardTitle>
          <CardDescription>
            Select a piece of content to create a detailed study guide.
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
              Generate Cheat Sheet
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

      {state.summary && !isPending && state.title && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{state.title} - Cheat Sheet</CardTitle>
              <CardDescription>
                A comprehensive summary of your selected content.
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
