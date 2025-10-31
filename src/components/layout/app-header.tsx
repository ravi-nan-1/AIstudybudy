"use client";

import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChevronRight,
  Menu,
  MessageCircle,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AppSidebar } from "./app-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const pathToTitleMap: { [key: string]: string } = {
  "/": "Dashboard",
  "/chat": "Chat and Learn",
  "/upload": "Upload Content",
  "/library": "Content Library",
  "/summary": "Generate Summary",
  "/practice": "Practice Quiz",
  "/logs": "Learning Logs",
};

export function AppHeader() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const title = pathToTitleMap[pathname] || "AI Study Buddy";

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6 sticky top-0 z-30">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
            <SheetDescription>
              Main navigation links for the application.
            </SheetDescription>
          </SheetHeader>
          <AppSidebar isMobile />
        </SheetContent>
      </Sheet>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="text-foreground">
          <BookOpen className="h-5 w-5" />
        </Link>
        {segments.length > 0 && <ChevronRight className="h-4 w-4" />}
        <span className="font-medium text-foreground">{title}</span>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src="https://picsum.photos/seed/user/40/40" />
                <AvatarFallback>SB</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
