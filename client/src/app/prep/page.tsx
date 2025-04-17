"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, BookOpen, AlertCircle } from "lucide-react";
import InterviewQuestions from "@/components/InterviewQuestions";
import { toast } from "sonner";
import axios from "axios";

export default function page() {
  const [isLoading, setIsLoading] = useState(false);
  const [questionsGenerated, setQuestionsGenerated] = useState(false);
  const [localData, setLocalData] = useState<
    Array<{
      category: string;
      questions: Array<{
        question: string;
        answer: string;
      }>;
    }>
  >([]);

  // Mock data - in a real app, this would come from the backend
  const mockQuestions: Array<{
    category: string;
    questions: Array<{
      question: string;
      answer: string;
      importance: "high" | "medium" | "low";
    }>;
  }> = [
    {
      category: "Technical Skills",
      questions: [
        {
          question:
            "Can you explain your experience with React and how you've used it in previous projects?",
          answer:
            "In my experience with React, I've built several web applications including a customer dashboard that improved user engagement by 30%. I've worked extensively with hooks, context API, and Redux for state management. One challenging project involved migrating a legacy application to React, which required careful planning to ensure backward compatibility while modernizing the codebase.",
          importance: "high",
        },
        {
          question:
            "How do you handle state management in large-scale React applications?",
          answer:
            "For large-scale applications, I typically use Redux for global state management combined with the Context API for more localized state. I organize redux stores by feature and implement selector patterns to optimize performance. For simpler components, I use React's built-in useState and useReducer hooks to maintain clean and maintainable code.",
          importance: "medium",
        },
        {
          question:
            "Describe your experience with TypeScript and how it improves your development process.",
          answer:
            "I've been using TypeScript for the past three years, and it has significantly improved code quality through static type checking. By defining interfaces and types, I catch errors during development rather than runtime. This has reduced bugs in production by about 40% on my projects. I particularly value TypeScript when refactoring code, as it helps identify all the places that need to be updated.",
          importance: "high",
        },
      ],
    },
    {
      category: "Problem Solving",
      questions: [
        {
          question:
            "Tell me about a challenging technical problem you've solved recently.",
          answer:
            "Recently, I encountered a performance issue in a data visualization component that was rendering thousands of elements. After profiling, I identified that unnecessary re-renders were happening with every data update. I implemented memo, useCallback, and virtualization techniques to only render visible elements, which improved performance by 80% and significantly enhanced the user experience.",
          importance: "high",
        },
        {
          question:
            "How do you approach debugging complex issues in your code?",
          answer:
            "I follow a systematic approach to debugging. First, I reproduce the issue consistently and isolate when it occurs. Then I use browser dev tools, logging, and breakpoints to trace the execution flow. For more complex issues, I'll create minimal test cases to identify the root cause. Recently, I debugged a memory leak by using Chrome's memory profiler to identify components that weren't being properly unmounted.",
          importance: "medium",
        },
      ],
    },
    {
      category: "Behavioral Questions",
      questions: [
        {
          question:
            "Describe a situation where you had to work under tight deadlines.",
          answer:
            "For a product launch, we had an unexpected requirement change three weeks before release. I worked with stakeholders to prioritize features, created a detailed implementation plan, and coordinated with team members to distribute tasks efficiently. I focused on high-impact features first and implemented a continuous integration pipeline to catch issues early. We successfully launched on time with all critical features completed.",
          importance: "medium",
        },
        {
          question:
            "How do you stay updated with the latest frontend technologies?",
          answer:
            "I dedicate time each week to learning through a combination of online courses, technical blogs, and open-source contributions. I'm active in several developer communities where I participate in discussions about emerging tools and practices. I also attend monthly meetups and annual conferences to network with other developers and gain insights from industry experts.",
          importance: "low",
        },
        {
          question:
            "Tell me about a time when you had to collaborate with a difficult team member.",
          answer:
            "I once worked with a colleague who had a very different communication style, which led to misunderstandings. I initiated a private conversation to understand their perspective better and shared my own work preferences. We established a structured communication process with regular check-ins and documentation of decisions. This approach greatly improved our working relationship and resulted in successful project delivery.",
          importance: "medium",
        },
      ],
    },
  ];

  const handleGenerateQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/prep/");
      setLocalData([...response.data.questions]);
      console.log("api", response.data);
      console.log(localData);

      // Simulate successful generation
      setQuestionsGenerated(true);

      toast.success("Questions generated successfully!");
    } catch (error) {
      toast.warning("Generation failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Interview Preparation
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Generate tailored interview questions and suggested answers based on
          your resume and job description
        </p>
      </div>

      <Card className="w-full mb-8">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-brand-600" />
            Generate Interview Questions
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pr-6 pl-6 pb-2">
          <ul className="space-y-1 text-sm">
            <li className="flex items-start">
              <span className="text-brand-600 mr-2 font-bold">•</span>
              <span>
                <span className="font-medium">
                  Recieve categorized questions covering technical,
                  problem-solving, and behavioral aspects.
                </span>
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-brand-600 mr-2 font-bold">•</span>
              <span>
                <span className="font-medium">
                  Suggested answers to help you prepare effectively.
                </span>
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-brand-600 mr-2 font-bold">•</span>
              <span>
                <span className="font-medium">
                  Focus on high-impact questions based on your resume and job
                  description.
                </span>
              </span>
            </li>
          </ul>

          <div>
            <Button
              className="min-w-64 h-10 mt-3 flex items-center justify-center bg-brand-600 hover:bg-brand-700"
              onClick={handleGenerateQuestions}
            >
              {isLoading
                ? "Generating Questions..."
                : "Generate Interview Questions"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {(isLoading || questionsGenerated) && (
        <InterviewQuestions questions={localData} isLoading={isLoading} />
      )}
    </div>
  );
}
