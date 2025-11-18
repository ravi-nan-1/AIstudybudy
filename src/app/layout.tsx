import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'AI Tutor – Upload PDF, Generate Summaries, Quizzes & Chat | Free Online AI Study Tool',
  description: 'AI Tutor lets you upload PDFs or website links to generate summaries, quizzes (10/20/30 questions), and chat with an AI that understands your content. Fast, accurate, and free.',
  keywords: 'AI Tutor, AI learning assistant, AI study tool, PDF to AI tutor, AI quiz generator, AI summary generator, study with AI, chatbot for studying, AI tutor from PDF',
  alternates: {
    canonical: 'https://aitutor.all2ools.com/',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
