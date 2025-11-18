import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
    { href: "https://all2ools.com", label: "All2ools" },
    { href: "https://pdf2word.all2ools.com", label: "PDF to Word" },
    { href: "https://imagecompressor.all2ools.com", label: "Image Compressor" },
    { href: "https://iloveexcel.all2ools.com", label: "Excel Learning" },
    { href: "https://imagetools.all2ools.com", label: "All Image Tools" },
];

export function AppFooter() {
    return (
        <footer className="bg-card border-t mt-auto">
            <div className="container mx-auto px-4 lg:px-6 py-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} AI Study Buddy. A part of All2ools.com
                    </p>
                    <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
                        {footerLinks.map(link => (
                            <Link key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
}
