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
  Check,
  Combine,
  Split,
  RotateCcw,
  Trash2,
  ListOrdered,
  Scissors,
  CopyPlus,
  TextSelect,
  Shield,
  KeyRound,
  Layers,
  FileScan,
  Share2,
  FileSignature,
  FileImage,
  FileSliders,
  FileTerminal,
  BrainCircuit,
  Languages,
  HelpCircle,
  FileKey2,
  PenSquare,
  BookText,
  ScanText,
  MousePointerClick,
  ShieldCheck,
  Lock,
  Download,
  Camera,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const features = [
  {
    title: "Chat and Learn",
    description:
      "Use our AI chatbot for study. Ask questions and get detailed explanations from your AI tutor about your documents.",
    href: "/chat",
    icon: MessageCircle,
    imageId: "dashboard-card-chat",
  },
  {
    title: "Upload Content",
    description:
      "Add your study materials. This AI PDF tutor can learn from PDFs, videos, and web links.",
    href: "/upload",
    icon: Upload,
    imageId: "dashboard-card-upload",
  },
  {
    title: "Content Library",
    description:
      "Browse and manage all your uploaded study materials in one place.",
    href: "/library",
    icon: Library,
    imageId: "dashboard-card-library",
  },
  {
    title: "Generate Summary",
    description:
      "Use the AI summary generator to summarize PDF online and grasp key points quickly.",
    href: "/summary",
    icon: FileText,
    imageId: "dashboard-card-summary",
  },
  {
    title: "Practice Quiz",
    description:
      "Use the AI quiz generator to test your knowledge and generate questions from text. A great AI exam preparation tool.",
    href: "/practice",
    icon: ClipboardCheck,
    imageId: "dashboard-card-quiz",
  },
  {
    title: "Learning Logs",
    description:
      "Review what your AI learning companion has learned from your materials.",
    href: "/logs",
    icon: FileClock,
    imageId: "dashboard-card-logs",
  },
];

const toolCategories = [
    {
      title: 'AI PDF',
      tools: [
        { name: 'AI PDF Assistant', icon: BrainCircuit, href: '/chat' },
        { name: 'Chat with PDF', icon: MessageCircle, href: '/chat' },
        { name: 'AI PDF Summarizer', icon: FileTerminal, href: '/summary' },
        { name: 'Translate PDF', icon: Languages, href: '#' },
        { name: 'AI Question Generator', icon: HelpCircle, href: '/practice' },
      ],
    },
    {
      title: 'Organize',
      tools: [
        { name: 'Merge PDF', icon: Combine, href: '#' },
        { name: 'Split PDF', icon: Split, href: '#' },
        { name: 'Rotate PDF', icon: RotateCcw, href: '#' },
        { name: 'Delete PDF Pages', icon: Trash2, href: '#' },
        { name: 'Extract PDF Pages', icon: Scissors, href: '#' },
        { name: 'Organize PDF', icon: CopyPlus, href: '#' },
      ],
    },
    {
      title: 'View & Edit',
      tools: [
        { name: 'Edit PDF', icon: PenSquare, href: '#' },
        { name: 'PDF Annotator', icon: MousePointerClick, href: '#' },
        { name: 'PDF Reader', icon: BookText, href: '#' },
        { name: 'Number Pages', icon: ListOrdered, href: '#' },
        { name: 'Crop PDF', icon: Scissors, href: '#' },
        { name: 'Redact PDF', icon: TextSelect, href: '#' },
        { name: 'Watermark PDF', icon: ShieldCheck, href: '#' },
        { name: 'PDF Form Filler', icon: FileSliders, href: '#' },
        { name: 'Share PDF', icon: Share2, href: '#' },
      ],
    },
    {
      title: 'Convert to PDF',
      tools: [
        { name: 'Word to PDF', icon: FileText, href: '#' },
        { name: 'Excel to PDF', icon: FileText, href: '#' },
        { name: 'PPT to PDF', icon: FileText, href: '#' },
        { name: 'JPG to PDF', icon: FileImage, href: '#' },
        { name: 'PDF OCR', icon: ScanText, href: '#' },
      ],
    },
    {
      title: 'More',
      tools: [
        { name: 'Sign PDF', icon: FileSignature, href: '#' },
        { name: 'Unlock PDF', icon: Lock, href: '#' },
        { name: 'Protect PDF', icon: Shield, href: '#' },
        { name: 'Flatten PDF', icon: Download, href: '#' },
        { name: 'PDF Scanner', icon: Camera, href: '#' },
      ],
    },
  ];

const heroImage = PlaceHolderImages.find((img) => img.id === "dashboard-hero");

const faqItems = [
  {
    question: "Is this AI Tutor free to use?",
    answer: "Yes, AI Tutor is completely free with no sign-up required.",
  },
  {
    question: "Can I upload PDFs?",
    answer: "Yes — AI reads and understands your PDF fully.",
  },
  {
    question: "Can I input website links?",
    answer:
      "Yes — the tool scrapes webpage content and extracts the important information.",
  },
  {
    question: "Does it support quiz generation?",
    answer:
      "Yes — AI can generate 10, 20, or 30 questions based on your content.",
  },
  {
    question: "Is my data safe?",
    answer: "All files are processed securely and deleted automatically.",
  },
  {
    question: "Can I chat with the AI?",
    answer:
      "Yes — chat mode allows you to ask questions based on your uploaded content.",
  },
];

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
            Your AI Study Tool and Learning Assistant
          </h1>
          <p className="mt-2 text-lg md:text-xl text-white/90 max-w-3xl drop-shadow-sm">
            Your personal AI partner to study faster with AI. Upload your
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
          understands your uploaded content. An AI study helper, free and
          secure. This AI tool for students can be your primary AI tutor from
          PDF or an AI tutor from a website link.
        </p>
      </div>

      <section>
        <h2 className="text-3xl font-bold tracking-tight mb-6">
          Explore Features
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const image = PlaceHolderImages.find(
              (img) => img.id === feature.imageId
            );
            return (
              <Card
                key={feature.href}
                className="flex flex-col group overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      data-ai-hint={image.imageHint}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 p-4">
                     <div className="bg-primary/10 p-3 rounded-lg inline-block mb-2">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                    <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                  </div>
                </div>

                <CardContent className="pt-4 flex-grow">
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
            );
          })}
        </div>
      </section>

      {/*
      <section>
        <h2 className="text-3xl font-bold tracking-tight text-center mb-8">Discover Our Tools</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
            {toolCategories.map((category) => (
                <div key={category.title} className="space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground tracking-wider uppercase">{category.title}</h3>
                    <div className="space-y-3">
                        {category.tools.map(tool => (
                             <Link key={tool.name} href={tool.href} className="flex items-center gap-3 text-foreground hover:text-primary group">
                                <div className="p-1.5 rounded-md bg-muted group-hover:bg-primary/10 transition-colors">
                                    <tool.icon className="h-5 w-5 text-primary" />
                                </div>
                                <span className="font-medium text-sm">{tool.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </section>
      */}

      <section>
        <Tabs defaultValue="what-is" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto">
            <TabsTrigger value="what-is">What is AI Tutor?</TabsTrigger>
            <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
            <TabsTrigger value="features">Features &amp; Benefits</TabsTrigger>
            <TabsTrigger value="use-cases">Use-Cases</TabsTrigger>
            <TabsTrigger value="guide">Step-By-Step Guide</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="what-is" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>What is AI Tutor?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  AI Tutor is an intelligent study assistant that reads and
                  understands your content — PDFs, website links, research
                  papers, textbooks, and more.
                </p>
                <p>
                  It summarizes, explains, quizzes you, and allows you to chat
                  with an AI that fully understands the uploaded content.
                </p>
                <p>
                  It’s like having a personal private tutor available 24/7,
                  powered by smart AI.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="how-it-works" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
                <CardDescription>
                  AI Tutor processes your content using advanced machine
                  learning models:
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-2">
                    1. Upload Your Content
                  </h4>
                  <p className="text-muted-foreground">
                    Upload: PDF files, URL links, Articles, Notes, Documents.
                    The system reads and extracts text, headings, images, and
                    structure.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">
                    2. AI Reads &amp; Understands Everything
                  </h4>
                  <p className="text-muted-foreground">
                    The tool analyzes the entire document using: Text
                    segmentation, Topic modeling, Content mapping,
                    Context-aware understanding.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">
                    3. Choose What You Want
                  </h4>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="flex flex-col gap-2 p-4 rounded-lg bg-muted/50">
                      <h5 className="font-semibold">
                        <Check className="inline-block mr-2 h-5 w-5 text-green-500" />
                        Generate Summary
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        AI creates a clean, easy-to-understand summary of your
                        content. Perfect for revision, studying faster, or
                        previewing chapters.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 p-4 rounded-lg bg-muted/50">
                      <h5 className="font-semibold">
                        <Check className="inline-block mr-2 h-5 w-5 text-green-500" />
                        Generate Quiz
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        You select 10, 20, or 30 questions. AI generates MCQs,
                        true/false, and short answer questions based entirely on
                        your uploaded content.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 p-4 rounded-lg bg-muted/50">
                      <h5 className="font-semibold">
                        <Check className="inline-block mr-2 h-5 w-5 text-green-500" />
                        Chat With AI
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        Ask anything like: “Explain this in simple words,”
                        “Give examples,” “Create practice questions.” The AI
                        responds based on your file only.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Features &amp; Benefits</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Smart Summaries</h4>
                    <p className="text-sm text-muted-foreground">
                      Instant summaries that capture key ideas and important
                      details.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Quiz Generator</h4>
                    <p className="text-sm text-muted-foreground">
                      Custom quizzes generated directly from the content you
                      upload.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">AI Chat</h4>
                    <p className="text-sm text-muted-foreground">
                      A conversational tutor that explains concepts,
                      definitions, and examples.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Free &amp; Easy</h4>
                    <p className="text-sm text-muted-foreground">
                      No account required. Use instantly.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Secure</h4>
                    <p className="text-sm text-muted-foreground">
                      Files are processed securely and never stored
                      permanently.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">
                      Perfect for Students &amp; Professionals
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Use it for notes, textbooks, assignments, reports,
                      research, and more.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="use-cases" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Use-Cases</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-lg mb-2">Students</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 mr-2 mt-1 shrink-0 text-green-500" />
                      <span>Summarize textbook chapters</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 mr-2 mt-1 shrink-0 text-green-500" />
                      <span>Create quizzes for exam prep</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 mr-2 mt-1 shrink-0 text-green-500" />
                      <span>Understand complex topics</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 mr-2 mt-1 shrink-0 text-green-500" />
                      <span>Chat with AI to clear doubts</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Teachers</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 mr-2 mt-1 shrink-0 text-green-500" />
                      <span>Auto-generate quiz sets</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 mr-2 mt-1 shrink-0 text-green-500" />
                      <span>Create lesson summaries</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 mr-2 mt-1 shrink-0 text-green-500" />
                      <span>Build study guides</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">
                    Businesses / Offices
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 mr-2 mt-1 shrink-0 text-green-500" />
                      <span>Summarize reports</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 mr-2 mt-1 shrink-0 text-green-500" />
                      <span>Extract insights</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 mr-2 mt-1 shrink-0 text-green-500" />
                      <span>Train employees faster</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Researchers</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 mr-2 mt-1 shrink-0 text-green-500" />
                      <span>Summarize long papers</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 mr-2 mt-1 shrink-0 text-green-500" />
                      <span>Create question banks</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 mr-2 mt-1 shrink-0 text-green-500" />
                      <span>Discuss findings with the AI</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guide" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Step-By-Step Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="relative border-l border-gray-200 dark:border-gray-700">
                  <li className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/20 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-primary/90">
                      1
                    </span>
                    <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                      Upload Content
                    </h3>
                    <p className="text-base font-normal text-muted-foreground">
                      Upload a PDF or paste a URL.
                    </p>
                  </li>
                  <li className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/20 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-primary/90">
                      2
                    </span>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                      Choose Action
                    </h3>
                    <p className="text-base font-normal text-muted-foreground">
                      Choose: Summary, Quiz, or Chat.
                    </p>
                  </li>
                  <li className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/20 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-primary/90">
                      3
                    </span>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                      AI Processing
                    </h3>
                    <p className="text-base font-normal text-muted-foreground">
                      Our AI processes your content instantly.
                    </p>
                  </li>
                  <li className="ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/20 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-primary/90">
                      4
                    </span>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                      Get Results
                    </h3>
                    <p className="text-base font-normal text-muted-foreground">
                      Download your summary/quiz or start chatting.
                    </p>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Find answers to common questions about the AI Tutor.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
