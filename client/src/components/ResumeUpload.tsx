"use client";
import { Upload, FileText, AlertCircle, Pointer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useCallback } from "react";
import { toast } from "sonner";

interface ResumeUploadProps {
  onFileUpload: (file: File) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onFileUpload }) => {
  const [resumeFile, setResumeFile] = React.useState<File | null>();
  const [dragActive, setDragActive] = React.useState(false);

  const handleDrag = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  }, []);

  const handleFile = (file: File) => {
    if (
      file.type !== "application/pdf" &&
      file.type !== "application/msword" &&
      file.type !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      toast("Invalid file type", {
        description: "Please upload a PDF or Word document.",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast(" File too large", {
        description: "Please upload a file smaller than 5MB.",
      });
      return;
    }

    setResumeFile(file);
    onFileUpload(file);
  };

  const handleResumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      handleFile(file);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Upload className="text-brand-600 w-5 h-5 ml-2" />
        <h3 className="text-lg font-semibold">Upload Resume</h3>
      </div>
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`resume-drop-zone flex justify-center ${
          dragActive ? "active" : ""
        } ${resumeFile ? "border-success border-opacity-50 " : " "}`}
      >
        <Button type="button" variant="outline" size="sm" className="relative">
          {resumeFile ? (
            <p className="text-sm text-gray-500 ">
              Selected file: {resumeFile.name}
            </p>
          ) : (
            <p>Brwose File</p>
          )}
          <Input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleResumeChange}
            accept=".pdf,.doc,.docx"
          />
        </Button>
      </div>
      <p className="text-sm text-gray-500 pl-2 flex items-center ">
        <AlertCircle className="h-3 w-3 mr-1" />
        We only accept PDF files
      </p>
    </div>
  );
};

export default ResumeUpload;
