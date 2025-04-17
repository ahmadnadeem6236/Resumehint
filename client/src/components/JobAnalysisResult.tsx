import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Building,
  Users,
  DollarSign,
  Clock,
  ListChecks,
  BarChart,
} from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface JobAnalysis {
  Name: string;
  Role: string;
  Salary: string;
  JobType?: string;
  KeyResponsibilities: string[];
  TechnicalSkills: string[];
  SoftSkills: string[];
  CompanyCulture: string;
  PotentialRedFlags: string[];
  JobLevel: string;
  CareerAdvancement: string;
  RecommendedQualifications: string[];
}

interface JobAnalysisResultProps {
  jobAnalysis: JobAnalysis;
  isLoading: boolean;
}

const JobAnalysisResult: React.FC<JobAnalysisResultProps> = ({
  jobAnalysis,
  isLoading,
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (isLoading) {
    return (
      <Card className="w-full mt-6">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            Analyzing job description...
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="loading-shimmer h-8 w-3/4 mx-auto"></div>
          <div className="loading-shimmer h-4 w-1/2 mx-auto"></div>
          <div className="space-y-2">
            <div className="loading-shimmer h-6 w-full"></div>
            <div className="loading-shimmer h-6 w-full"></div>
            <div className="loading-shimmer h-6 w-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="loading-shimmer h-4 w-1/3"></div>
              <div className="loading-shimmer h-32 w-full rounded-md"></div>
            </div>
            <div className="space-y-2">
              <div className="loading-shimmer h-4 w-1/3"></div>
              <div className="loading-shimmer h-32 w-full rounded-md"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle className="text-xl text-center">
          Job Analysis Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {jobAnalysis.Role}
          </h2>
          <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-600">
            <span className="flex items-center">
              <Building className="h-4 w-4 mr-1" />
              {jobAnalysis.Name}
            </span>
            <span className="flex items-center">
              <Briefcase className="h-4 w-4 mx-1" />
              {jobAnalysis.JobType}
            </span>
            <span className="flex items-center">
              <DollarSign className="h-4 w-4 mx-1" />
              {jobAnalysis.Salary}
            </span>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Employer Requirements</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="space-y-2 ">
              <div className="">
                <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                  <BarChart className="h-4 w-4 mr-2 text-brand-600" />
                  Required Skills & Importance
                </h3>
                <div className="flex flex-col space-y-2  ">
                  <div className="flex flex-col gap-1 ">
                    <h3>Technical Skills</h3>
                    <div className="flex space-y-2 flex-wrap gap-2  ">
                      {jobAnalysis.TechnicalSkills.map((skill, index) => (
                        <div key={index} className="">
                          <Badge
                            variant="outline"
                            className="bg-red-400 text-white font-medium h-8  "
                          >
                            {skill}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 ">
                    <h3>Soft Skills</h3>
                    <div className="flex flex-wrap gap-2 space-y-2">
                      {jobAnalysis.SoftSkills.map((skill, index) => (
                        <div key={index}>
                          <Badge
                            variant="outline"
                            className="bg-amber-400 text-white font-medium h-8"
                          >
                            {skill}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <ListChecks className="h-4 w-4 mr-2 text-brand-600" />
                  Key Responsibilities
                </h3>
                <ul className="space-y-2">
                  {jobAnalysis.KeyResponsibilities.map(
                    (responsibility, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <span className="text-brand-600 mr-2">•</span>
                        <span>{responsibility}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-brand-600" />
                  Recommended Qualiafications
                </h3>
                <ul className="space-y-2">
                  {jobAnalysis.RecommendedQualifications.map(
                    (qualification, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <span className="text-brand-600 mr-2">•</span>
                        <span>{qualification}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="company" className="mt-4">
            <ScrollArea>
              <div className="space-y-6">
                <div className="grid grid-cols-1  gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Company Profile
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex flex-col justify-between">
                        <span className="text-gray-600">Culture: </span>
                        <span className="font-medium">
                          {jobAnalysis.CompanyCulture}
                        </span>
                      </div>
                      <div className="flex flex-col justify-between">
                        <span className="text-md text-gray-600">
                          Career Advancement:
                        </span>
                        <span className="font-medium">
                          {jobAnalysis.CareerAdvancement}
                        </span>
                      </div>
                      <div className="flex flex-col justify-between">
                        <span className="text-md text-gray-600">
                          Funding Stage:
                        </span>
                        {jobAnalysis.PotentialRedFlags.map((pt, idx) => {
                          return (
                            <div key={idx} className="flex items-center">
                              <span className="font-medium">- {pt}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          {/* <TabsContent value="competition" className="mt-4">
            <div className="space-y-6">

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-brand-600" />
                  Requirements & Process
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="border p-3 rounded-md">
                    <p className="text-gray-600 mb-1">Experience</p>
                    <p className="font-medium">
                      {jobAnalysis.competitiveAnalysis.requiredExperience}

                    </p>
                  </div>
                  <div className="border p-3 rounded-md">
                    <p className="text-gray-600 mb-1">Education</p>
                    <p className="font-medium">
                      {jobAnalysis.competitiveAnalysis.education}
                    </p>
                  </div>
                  <div className="border p-3 rounded-md">
                    <p className="text-gray-600 mb-1">Interview Process</p>
                    <p className="font-medium">
                      {jobAnalysis.competitiveAnalysis.interviewProcess}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent> */}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default JobAnalysisResult;
