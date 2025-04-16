import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResumeScoreProps {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: {
    category: string;
    items: {
      title: string;
      description: string;
    }[];
  }[];
  isLoading: boolean;
}

const ResumeScore: React.FC<ResumeScoreProps> = ({
  score,
  matchedKeywords,
  missingKeywords,
  suggestions,
  isLoading,
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!isLoading && score > 0) {
      const timer = setTimeout(() => {
        setAnimatedScore(score);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, score]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning-500";
    return "text-danger-500";
  };

  const getScoreCircleStyles = (score: number) => {
    const baseStyles = "score-circle h-40 w-40 border-[8px]";
    if (score >= 80) return `${baseStyles} border-success/20`;
    if (score >= 60) return `${baseStyles} border-warning-500/20`;
    return `${baseStyles} border-danger-500/20`;
  };

  if (isLoading) {
    return (
      <Card className="w-full mt-6">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            Analyzing your resume...
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <div className="score-circle h-40 w-40 border-[8px] border-gray-200 animate-pulse-slow"></div>
          <div className="loading-shimmer h-6 w-3/4 max-w-md"></div>
          <div className="loading-shimmer h-20 w-full"></div>
          <div className="space-y-2 w-full">
            <div className="loading-shimmer h-8 w-full"></div>
            <div className="loading-shimmer h-16 w-full"></div>
            <div className="loading-shimmer h-16 w-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle className="text-xl text-center">
          Resume Analysis Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="suggestions">Improvements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="flex flex-col md:flex-row items-center md:space-x-8">
              <div className="relative mb-6 md:mb-0">
                <div
                  className={getScoreCircleStyles(score)}
                  style={
                    {
                      "--circle-color":
                        score >= 80
                          ? "rgb(16, 185, 129)"
                          : score >= 60
                          ? "rgb(245, 158, 11)"
                          : "rgb(239, 68, 68)",
                      "--percentage": `${animatedScore}%`,
                    } as React.CSSProperties
                  }
                >
                  <div className="score-circle-bg"></div>
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <span
                      className={`text-4xl font-bold ${getScoreColor(score)}`}
                    >
                      {Math.round(animatedScore)}%
                    </span>
                    <span className="text-sm text-gray-500">Match Score</span>
                  </div>
                </div>
              </div>

              <div className="w-full space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">
                    Match Details
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Your resume matches {Math.round(score)}% of the job
                    requirements.
                    {score >= 80
                      ? " Great job! Your resume is well-optimized for this position."
                      : score >= 60
                      ? " Your resume shows promise, but could use some improvements."
                      : " Your resume needs significant improvements to better match this job."}
                  </p>

                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Keywords Match</span>
                        <span>
                          {matchedKeywords.length}/
                          {matchedKeywords.length + missingKeywords.length}
                        </span>
                      </div>
                      <Progress
                        value={
                          (matchedKeywords.length /
                            (matchedKeywords.length + missingKeywords.length)) *
                          100
                        }
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Overall Optimization</span>
                        <span>{Math.round(score)}%</span>
                      </div>
                      <Progress value={score} />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">
                    Summary
                  </h3>
                  <ul className="space-y-1">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm">
                        {matchedKeywords.length} key skills and qualifications
                        matched
                      </span>
                    </li>
                    <li className="flex items-start">
                      <XCircle className="h-4 w-4 text-danger-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm">
                        {missingKeywords.length} important keywords missing from
                        your resume
                      </span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-warning-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm">
                        {suggestions.reduce(
                          (acc, category) => acc + category.items.length,
                          0
                        )}{" "}
                        suggestions for improvement
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="keywords" className="mt-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 text-success mr-2" />
                  Matched Keywords ({matchedKeywords.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {matchedKeywords.map((keyword, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-success/10 text-success border-success/20"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <XCircle className="h-4 w-4 text-danger-500 mr-2" />
                  Missing Keywords ({missingKeywords.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {missingKeywords.map((keyword, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-danger-50 text-danger-500 border-danger-500/20"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  How to use these keywords
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="font-medium text-brand-600 mr-2">•</span>
                    <span>
                      Add missing keywords to your resume where appropriate and
                      truthful
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium text-brand-600 mr-2">•</span>
                    <span>
                      Use variations of keywords if the exact match doesn't fit
                      your experience
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium text-brand-600 mr-2">•</span>
                    <span>
                      Incorporate keywords naturally into your experience
                      descriptions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium text-brand-600 mr-2">•</span>
                    <span>
                      Include a skills section to list technical skills and
                      tools
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="suggestions" className="mt-4">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-6">
                {suggestions.map((category, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-700">
                      {category.category}
                    </h3>

                    {category.items.map((item, itemIdx) => (
                      <Card
                        key={itemIdx}
                        className="bg-white overflow-hidden border border-gray-200"
                      >
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-sm font-medium text-gray-900">
                              {item.title}
                            </h4>
                          </div>
                          <p className="text-sm text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ResumeScore;
