"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  Send,
  FileCheck,
  LetterText,
  FileChartColumn,
  FileChartLine,
  FileQuestion,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const location = usePathname();
  console.log(location);

  const isActive = (path: string) => {
    return location === path;
  };
  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between h-16 mx-auto px-4 sm:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <FileCheck className="h-8 w-8 text-brand-600" />
          <span className="text-xl font-bold text-brand-800">ResumeHint</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className={cn(
              "flex items-center space-x-1 text-sm font-medium transition-colors hover:text-brand-600",
              isActive("/") ? "text-brand-600" : "text-gray-600"
            )}
          >
            <FileText className="h-4 w-4" />
            <span>Resume Review</span>
          </Link>

          <Link
            href="/email"
            className={cn(
              "flex items-center space-x-1 text-sm font-medium transition-colors hover:text-brand-600",
              isActive("/email") ? "text-brand-600" : "text-gray-600"
            )}
          >
            <Send className="h-4 w-4" />
            <span>Email</span>
          </Link>

          <Link
            href="/coverletter"
            className={cn(
              "flex items-center space-x-1 text-sm font-medium transition-colors hover:text-brand-600",
              isActive("/coverletter") ? "text-brand-600" : "text-gray-600"
            )}
          >
            <LetterText className="h-4 w-4" />
            <span>Cover Letter</span>
          </Link>

          <Link
            href="/jobanalyze"
            className={cn(
              "flex items-center space-x-1 text-sm font-medium transition-colors hover:text-brand-600",
              isActive("/jobanalyze") ? "text-brand-600" : "text-gray-600"
            )}
          >
            <FileChartLine className="h-4 w-4" />
            <span>Job Analyze</span>
          </Link>
          <Link
            href="/prep"
            className={cn(
              "flex items-center space-x-1 text-sm font-medium transition-colors hover:text-brand-600",
              isActive("/prep") ? "text-brand-600" : "text-gray-600"
            )}
          >
            <FileQuestion className="h-4 w-4" />
            <span>Preparation QA</span>
          </Link>
        </nav>

        <div className="md:hidden">
          <div className="flex space-x-4">
            <Link
              href="/"
              className={cn(
                "p-2 rounded-md",
                isActive("/") ? "bg-brand-50 text-brand-600" : "text-gray-600"
              )}
            >
              <FileText className="h-5 w-5" />
            </Link>

            <Link
              href="/emails"
              className={cn(
                "p-2 rounded-md",
                isActive("/emails")
                  ? "bg-brand-50 text-brand-600"
                  : "text-gray-600"
              )}
            >
              <Send className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
