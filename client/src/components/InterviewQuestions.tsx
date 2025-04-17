import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { BookOpen, HelpCircle, CheckCircle2 } from "lucide-react";

interface Question {
  question: string;
  answer: string;
}

interface QuestionCategory {
  category: string;
  questions: Question[];
}

interface InterviewQuestionsProps {
  questions: QuestionCategory[];
  isLoading: boolean;
}

const InterviewQuestions: React.FC<InterviewQuestionsProps> = ({
  questions,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <Card className="w-full mt-6">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            Generating interview questions...
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
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <div className="loading-shimmer h-4 w-1/3"></div>
              <div className="loading-shimmer h-24 w-full rounded-md"></div>
            </div>
            <div className="space-y-2">
              <div className="loading-shimmer h-4 w-1/3"></div>
              <div className="loading-shimmer h-24 w-full rounded-md"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-center">
          <BookOpen className="mr-2 h-5 w-5 text-brand-600" />
          Practice Interview Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <p className="text-center text-gray-600">
            Review these questions and suggested answers to prepare for your
            interview. Practice your responses out loud for the best results.
          </p>

          {questions.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="border rounded-lg p-4 bg-gray-50"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {category.category}
              </h3>

              <Accordion type="single" collapsible className="space-y-2">
                {category.questions.map((question, questionIndex) => (
                  <AccordionItem
                    key={questionIndex}
                    value={`${categoryIndex}-${questionIndex}`}
                    className="bg-white border rounded-md"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex items-start text-left">
                        <HelpCircle className="h-5 w-5 text-brand-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {question.question}
                          </p>
                          <div className="mt-1"></div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 pt-0">
                      <div className="flex items-start mt-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div className="text-gray-700">
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            Suggested Answer:
                          </p>
                          <p>{question.answer}</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Remember to personalize these answers with your own experiences
              and examples.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewQuestions;
