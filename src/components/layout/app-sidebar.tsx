"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  MessageCircle,
  Upload,
  Library,
  FileText,
  ClipboardCheck,
  FileClock,
  LayoutDashboard,
  Settings,
  User,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";


const NAV_LINKS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/chat", label: "Chat and Learn", icon: MessageCircle },
  { href: "/upload", label: "Upload Content", icon: Upload },
  { href: "/library", label: "Content Library", icon: Library },
  { href: "/summary", label: "Generate Summary", icon: FileText },
  { href: "/practice", label: "Practice Quiz", icon: ClipboardCheck },
  { href: "/logs", label: "Learning Logs", icon: FileClock },
];

export function AppSidebar({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();

  const content = (
    <div className="flex flex-col h-full">
      <div className="flex h-16 items-center border-b px-4 lg:px-6 shrink-0">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BookOpen className="h-6 w-6 text-primary" />
          <span>AI Study Buddy</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-4">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted",
                pathname === href && "bg-muted text-primary"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </ScrollArea>
       <div className="mt-auto p-4">
          <Separator className="my-2" />
          <Link href="https://all2ools.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted">
            <ExternalLink className="h-4 w-4" />
            <span>All2ools.com</span>
          </Link>
       </div>
    </div>
  );

  if (isMobile) {
    return content;
  }

  return (
    <aside
      className={cn(
        "hidden md:flex md:flex-col md:border-r bg-card"
      )}
    >
      {content}
    </aside>
  );
}
