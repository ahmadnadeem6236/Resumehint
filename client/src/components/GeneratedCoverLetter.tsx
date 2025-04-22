import React, { useState } from "react";
import { Copy, Download, Scroll } from "lucide-react";
import Markdown from "react-markdown";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "sonner";

interface MailgenProps {
  generated_coverletter: string;
  isLoading: boolean;
}

const GeneratedCoverLetter: React.FC<MailgenProps> = ({
  generated_coverletter,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl">Your Cold Email Templates</CardTitle>
          <CardDescription>
            Personalized emails to help you reach out to employers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-end items-start space-x-2">
            <div className="loading-shimmer h-10 w-28 rounded-md"></div>
          </div>
          <div className="loading-shimmer h-20 w-full"></div>
          <div className="loading-shimmer h-7 w-full rounded-md"></div>
          <div className="loading-shimmer h-3 w-3/4"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-xl">Your Cold Email Templates</CardTitle>
        <CardDescription>
          Personalized emails to help you reach out to employers
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <ScrollArea className="h-52 w-full ">
          <div className="text-[16px] text-gray-900">
            <Markdown>{generated_coverletter}</Markdown>
          </div>
        </ScrollArea>
      </CardContent>
      <Button
        variant="outline"
        className="md:w-28 h-10 absolute md:bottom-80 md:right-72 right-10 bottom-80 bg-white hover:bg-gray-100 text-gray-900 border-gray-300 shadow-sm"
        onClick={() => {
          navigator.clipboard.writeText(generated_coverletter);
          toast.success("Email copied to clipboard!");
        }}
      >
        <Copy className="mr-2 h-4 w-4" />
        Copy
      </Button>
    </Card>
  );
};

export default GeneratedCoverLetter;
