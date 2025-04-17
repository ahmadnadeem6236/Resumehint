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
  Briefcase,
  Menu,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
            <Briefcase className="h-4 w-4" />
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
          <Sheet>
            <SheetTrigger className="p-2 rounded-md text-gray-600 hover:bg-gray-100">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-64 pt-10">
              <SheetHeader>
                <SheetTitle></SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col justify-center pl-6 space-y-7">
                <Link
                  href="/"
                  className={cn(
                    "flex items-center space-x-1 text-md font-medium transition-colors hover:text-brand-600",
                    isActive("/")
                      ? "text-brand-600 border-brand-300 p-3 max-w-44 border-[1px] rounded-xl"
                      : "text-gray-600"
                  )}
                >
                  <FileText className="h-4 w-4" />
                  <span>Resume Review</span>
                </Link>

                <Link
                  href="/email"
                  className={cn(
                    "flex items-center space-x-1 text-md font-medium transition-colors hover:text-brand-600",
                    isActive("/email")
                      ? "text-brand-600 border-brand-300 p-3 max-w-44 border-[1px] rounded-xl"
                      : "text-gray-600"
                  )}
                >
                  <Send className="h-4 w-4" />
                  <span>Email</span>
                </Link>

                <Link
                  href="/coverletter"
                  className={cn(
                    "flex items-center space-x-1 text-md font-medium transition-colors hover:text-brand-600",
                    isActive("/coverletter")
                      ? "text-brand-600 border-brand-300 p-3 max-w-44 border-[1px] rounded-xl"
                      : "text-gray-600"
                  )}
                >
                  <LetterText className="h-4 w-4" />
                  <span>Cover Letter</span>
                </Link>

                <Link
                  href="/jobanalyze"
                  className={cn(
                    "flex items-center space-x-1 text-md font-medium transition-colors hover:text-brand-600",
                    isActive("/jobanalyze")
                      ? "text-brand-600 border-brand-300 p-3 max-w-44 border-[1px] rounded-xl"
                      : "text-gray-600"
                  )}
                >
                  <Briefcase className="h-4 w-4" />
                  <span>Job Analyze</span>
                </Link>
                <Link
                  href="/prep"
                  className={cn(
                    "flex items-center space-x-1 text-md font-medium transition-colors hover:text-brand-600",
                    isActive("/prep")
                      ? "text-brand-600 border-brand-300 p-3 max-w-44 border-[1px] rounded-xl"
                      : "text-gray-600"
                  )}
                >
                  <FileQuestion className="h-4 w-4" />
                  <span>Preparation QA</span>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
