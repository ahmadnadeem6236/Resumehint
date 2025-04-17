"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Briefcase,
  Zap,
  ListChecks,
  PieChart,
  AlertCircle,
} from "lucide-react";
import JobAnalysisResult from "@/components/JobAnalysisResult";
import { toast } from "sonner";
import axios from "axios";

export default function page() {
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [locaData, setLocaData] = useState({
    Name: "",
    Role: "",
    Salary: "",
    JobType: "",
    TechnicalSkills: [],
    KeyResponsibilities: [],
    SoftSkills: [],
    CompanyCulture: "",
    PotentialRedFlags: [],
    JobLevel: "",
    CareerAdvancement: "",
    RecommendedQualifications: [],
  });

  // Mock data - in a real app, this would come from the backend
  const mockJobAnalysis = {
    Name: "About the",
    Role: "Front Deve",
    Salary: "$120,000 - $150,000",
    JobType: "Full-time",
    TechnicalSkills: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "RESTful APIs",
      "Git",
      "Responsive Design",
      "Agile/Scrum",
      "Problem Solving",
    ],
    KeyResponsibilities: [
      "Develop and maintain web applications using React, TypeScript, and modern frontend technologies",
      "Collaborate with designers to implement responsive and intuitive user interfaces",
      "Work with backend developers to integrate frontend systems with APIs and data sources",
      "Optimize applications for maximum speed and scalability",
      "Implement automated testing to ensure code quality and functionality",
    ],
    SoftSkills: [
      "Fast-moving",
      "Highly communicative",
      "Self-aware",
      "Motivated",
    ],
    CompanyCulture:
      "The company emphasizes innovation, a desire to build something huge, and a focus on rapid iteration.  There's a strong belief in collaboration and a willingness to experiment.  The language used suggests a culture that values problem-solving and a proactive approach to challenges.",
    PotentialRedFlags: [
      "Lack of specific details about team structure or collaboration processes.",
      "Overly vague language about 'huge' - could indicate a large, potentially chaotic environment.",
    ],
    JobLevel: "Mid-level",
    CareerAdvancement:
      "Opportunities for growth within a rapidly expanding team.  Potential for moving into more senior roles as the project progresses and the application evolves.  Growth potential is tied to the success of the MVP and the team's ability to adapt.",
    RecommendedQualifications: [
      "Strong understanding of web development technologies (HTML, CSS, JavaScript)",
      "Experience with frontend frameworks (e.g., React, Angular, Vue.js)",
      "Familiarity with backend technologies (Node.js, Python, etc.)",
      "Experience with AI/ML concepts and tools is a significant plus.",
      "Experience with web scraping and data extraction",
    ],
  };

  const handleAnalyzeJob = async () => {
    if (!jobDescription.trim()) {
      toast.warning("Job description required", {
        description: "Please enter a job description to analyze.",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      const response = await axios.post(
        "http://localhost:8000/api/analyze-job/",
        {
          job: jobDescription,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setLocaData({
        Name: response.data.Name,
        Role: response.data.Role,
        Salary: response.data.Salary,
        JobType: response.data.JobType,
        TechnicalSkills: response.data.TechnicalSkills,
        KeyResponsibilities: response.data.KeyResponsibilities,
        SoftSkills: response.data.SoftSkills,
        CompanyCulture: response.data.CompanyCulture,
        PotentialRedFlags: response.data.PotentialRedFlags,
        JobLevel: response.data.JobLevel,
        CareerAdvancement: response.data.CareerAdvancement,
        RecommendedQualifications: response.data.RecommendedQualifications,
      });

      // Simulate successful analysis
      setAnalysisComplete(true);

      toast.success("Job description analyzed successfully!");
    } catch (error) {
      toast.warning("Analysis failed", {
        description: "There was an error analyzing the job. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Job Analysis
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Analyze any job description to understand key requirements and company
          expectations
        </p>
      </div>

      <Card className="w-full mb-8">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Briefcase className="mr-2 h-5 w-5 text-brand-600" />
            Job Description Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <div className="mb-4">
            <Textarea
              placeholder="Paste a job description here..."
              className="min-h-[200px] w-full"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              disabled={isLoading}
            />
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <AlertCircle className="h-3 w-3 mr-1" />
              <span>Enter a complete job description for the best results</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center text-sm text-gray-600">
              <Zap className="h-4 w-4 mr-2 text-brand-600" />
              <span>Identify key skills</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <ListChecks className="h-4 w-4 mr-2 text-brand-600" />
              <span>Understand expectations</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <PieChart className="h-4 w-4 mr-2 text-brand-600" />
              <span>Assess competitiveness</span>
            </div>
          </div>

          <Button
            className="w-full bg-brand-600 hover:bg-brand-700"
            onClick={handleAnalyzeJob}
            disabled={!jobDescription.trim() || isLoading}
          >
            {isLoading ? "Analyzing..." : "Analyze Job Description"}
          </Button>
        </CardContent>
      </Card>

      {(isLoading || analysisComplete) && (
        <JobAnalysisResult jobAnalysis={locaData} isLoading={isLoading} />
      )}
    </div>
  );
}
