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
  const [localData, setLocalData] = useState({
    ATS_Score: 0,
    SkillsMatched: [],
    KeywordsMissing: [],
    Suggestions: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resume || !jobDescription) {
      toast.warning("Please upload a resume and provide a job description.");
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
        toast.success("Submission successful!");
      } else {
        const errorData = await response.data;
        toast.warning(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.warning("An error occurred while uploading the files.");
    }
    setIsLoading(false);
    handleAnalyzeResume();
    setAnalysisComplete(true);
  };

  const handleAnalyzeResume = async () => {
    setIsLoading(true); // Set loading state to true at the start
    try {
      const response = await axios.get(
        "http://localhost:8000/api/analyze-resume/"
      );
      const result = response.data;

      // Update localData with the fetched result
      setLocalData(result);
      console.log("Analysis data:", localData);
      toast.success("Resume analysis completed successfully!");
      setAnalysisComplete(true);
    } catch (error) {
      console.error("Error analyzing resume:", error);
    } finally {
      setIsLoading(false); // Ensure loading state is reset
    }
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
        <>
          <ResumeScore
            score={localData.ATS_Score}
            missingKeywords={localData.KeywordsMissing}
            matchedKeywords={localData.SkillsMatched}
            suggestions={localData.Suggestions}
            isLoading={isLoading}
          />
        </>
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
