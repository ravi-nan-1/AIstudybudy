"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Globe, UploadCloud, FileText, Youtube, CheckCircle } from "lucide-react";
import { useState, useRef, ChangeEvent } from "react";
import { useContent, type Content } from "@/context/content-context";

export default function UploadPage() {
  const { toast } = useToast();
  const { addContent } = useContent();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, type: 'file' | 'url') => {
    event.preventDefault();
    setIsSubmitting(true);
    
    let newContent: Omit<Content, 'id' | 'createdAt'> | null = null;
    
    if (type === 'file' && selectedFile) {
        const file = selectedFile;
        newContent = {
            title: file.name,
            type: 'PDF',
            source: file.name,
            description: `A file uploaded by the user.`,
            fullText: `Mock full text for ${file.name}. This would be extracted from the file.`,
            icon: FileText,
        };
    } else if (type === 'url' && urlInputRef.current?.value) {
        const url = urlInputRef.current.value;
        const isYoutube = url.includes('youtube.com') || url.includes('youtu.be');
        newContent = {
            title: `Content from ${url.substring(0, 30)}...`,
            type: isYoutube ? 'YouTube' : 'URL',
            source: url,
            description: `Content fetched from a URL.`,
            fullText: `Mock full text for content from ${url}. This would be scraped from the URL.`,
            icon: isYoutube ? Youtube : Globe,
        };
    }

    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (newContent) {
      addContent({
        ...newContent,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      });

      toast({
        title: "Content Uploaded",
        description: "Your content has been successfully added to the library.",
      });
      setSelectedFile(null);
    } else {
       toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Please select a file or provide a URL.",
      });
    }
    
    (event.target as HTMLFormElement).reset();
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload Content</h1>
        <p className="text-muted-foreground">
          Add your study materials to power your AI tutor.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add New Content</CardTitle>
          <CardDescription>
            Choose your preferred method to upload content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="file">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="file">
                <UploadCloud className="mr-2 h-4 w-4" />
                File Upload
              </TabsTrigger>
              <TabsTrigger value="url">
                <Globe className="mr-2 h-4 w-4" />
                From URL
              </TabsTrigger>
            </TabsList>
            <TabsContent value="file">
              <form onSubmit={(e) => handleSubmit(e, 'file')}>
                <Card className="border-dashed mt-4">
                  <CardContent className="p-6 text-center">
                    <div className="space-y-2">
                      <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                      <Label htmlFor="file-upload" className="font-semibold text-primary cursor-pointer hover:underline">
                        Choose a file
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        PDF, MP3, MP4, etc.
                      </p>
                      <Input id="file-upload" type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                    </div>
                    {selectedFile && (
                        <div className="mt-4 text-sm text-muted-foreground flex items-center justify-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>{selectedFile.name}</span>
                        </div>
                    )}
                  </CardContent>
                </Card>
                <Button type="submit" className="w-full mt-4" disabled={isSubmitting || !selectedFile}>
                    {isSubmitting ? "Uploading..." : "Upload File"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="url">
              <form onSubmit={(e) => handleSubmit(e, 'url')} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="url">Web or YouTube URL</Label>
                  <Input
                    id="url"
                    placeholder="https://example.com"
                    required
                    ref={urlInputRef}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                   {isSubmitting ? "Processing..." : "Process URL"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
