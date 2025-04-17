import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Nabar";
import { Toaster } from "sonner";

const roboto = Roboto({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ResumeHint",
  description: "Get personalized feedback on your resume",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 container mx-auto px-4 sm:px-6 py-8">
            {children}
          </main>
          <Toaster richColors />
        </div>
      </body>
    </html>
  );
}
