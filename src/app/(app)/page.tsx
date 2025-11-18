import Link from "next/link";
import Image from "next/image";
import {
  MessageCircle,
  Upload,
  Library,
  FileText,
  ClipboardCheck,
  FileClock,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const features = [
  {
    title: "Chat and Learn",
    description:
      "Ask questions and get detailed explanations from your AI tutor.",
    href: "/chat",
    icon: MessageCircle,
  },
  {
    title: "Upload Content",
    description: "Add your study materials like PDFs, videos, and web links.",
    href: "/upload",
    icon: Upload,
  },
  {
    title: "Content Library",
    description: "Browse and manage all your uploaded study materials.",
    href: "/library",
    icon: Library,
  },
  {
    title: "Generate Summary",
    description: "Get quick summaries of your documents to grasp key points.",
    href: "/summary",
    icon: FileText,
  },
  {
    title: "Practice Quiz",
    description:
      "Test your knowledge with AI-generated quizzes from your content.",
    href: "/practice",
    icon: ClipboardCheck,
  },
  {
    title: "Learning Logs",
    description: "Review what your AI tutor has learned from your materials.",
    href: "/logs",
    icon: FileClock,
  },
];

const heroImage = PlaceHolderImages.find((img) => img.id === "dashboard-hero");

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-12">
      <section className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 text-white">
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight drop-shadow-md">
            Welcome to your AI Study Buddy
          </h1>
          <p className="mt-2 text-lg md:text-xl text-white/90 max-w-3xl drop-shadow-sm">
            Your personal AI partner to learn faster and smarter. Upload your
            content, and let our AI create summaries, quizzes, and answer your
            questions.
          </p>
          <p className="mt-4 text-sm md:text-base text-white/80 max-w-3xl drop-shadow-sm font-medium">
            AI Tutor – Upload PDF & Websites | Summaries, Quizzes & Smart Chat
          </p>
          <Button
            asChild
            className="mt-6 w-fit bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg py-6 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            <Link href="/chat">
              Start Learning Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <div className="text-center">
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
          Free AI Tutor that learns from your PDFs and website links. Generate
          summaries, quizzes (10/20/30 questions), and chat with an AI that
          understands your uploaded content. Fast, accurate, and secure.
        </p>
      </div>

      <section>
        <h2 className="text-3xl font-bold tracking-tight mb-6">
          Explore Features
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.href}
              className="flex flex-col hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-in-out"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant="outline">
                  <Link href={feature.href}>
                    Go to {feature.title}{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
