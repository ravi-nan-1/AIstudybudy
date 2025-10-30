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
import { Globe, UploadCloud } from "lucide-react";
import { useState } from "react";

export default function UploadPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock submission handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Content Uploaded",
      description: "Your content has been successfully added to the library.",
    });
    
    // Reset form or state here if needed
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
              <form onSubmit={handleSubmit}>
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
                      <Input id="file-upload" type="file" className="hidden" />
                    </div>
                  </CardContent>
                </Card>
                <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
                    {isSubmitting ? "Uploading..." : "Upload File"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="url">
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="url">Web or YouTube URL</Label>
                  <Input
                    id="url"
                    placeholder="https://example.com"
                    required
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
