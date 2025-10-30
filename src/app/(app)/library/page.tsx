"use client";

import { useContent } from "@/context/content-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LibraryPage() {
  const { content, removeContent } = useContent();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Content Library</h1>
        <p className="text-muted-foreground">
          Browse and manage all your uploaded study materials.
        </p>
      </div>

      {content.length === 0 ? (
        <Card className="flex items-center justify-center h-64">
          <CardContent className="text-center">
            <p className="text-lg font-medium">Your library is empty.</p>
            <p className="text-muted-foreground">
              Upload some content to get started!
            </p>
            <Button className="mt-4" asChild>
              <a href="/upload">Upload Content</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {content.map((item) => (
            <Card key={item.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-4">
                    <item.icon className="w-6 h-6 text-muted-foreground" />
                    <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => removeContent(item.id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                <Badge variant="outline">{item.type}</Badge>
                <span>
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
