"use client";
import JobDescription from "@/components/JobDescription";
import ResumeJobUploadProps from "@/components/ResumeUpload";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import ResumeScore from "@/components/ResumeScore";

export default function Home() {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resume || !jobDescription) {
      toast("Please upload a resume and provide a job description.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);

    console.log(formData);
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/job-resume-upload/",
        {
          resume: formData.get("resume"),
          description: formData.get("jobDescription"),
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status == 201) {
        toast("Submission successful!");
      } else {
        const errorData = await response.data;
        toast(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      toast("An error occurred while uploading the files.");
    }
    setIsLoading(false);
  };
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Resume Evaluation & Optimization
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Upload your resume and a job description to get personalized feedback
          and improvements
        </p>
      </div>
      {analysisComplete ? (
        "job"
      ) : (
        <form onSubmit={handleSubmit}>
          <Card className="w-full">
            <CardContent className="flex flex-col gap-4">
              <ResumeJobUploadProps onFileUpload={setResume} />
              <JobDescription onJobDescriptionChange={setJobDescription} />
              <Button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-700"
              >
                {isLoading ? <Spinner size={"medium"} /> : "Analyze"}
              </Button>
            </CardContent>
          </Card>
        </form>
      )}
    </div>
  );
}
