"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import axios from "axios";
import GeneratedCoverLetter from "@/components/GeneratedCoverLetter";

export default function page() {
  const [isLoading, setIsLoading] = useState(true);
  const [cover, setCover] = useState({
    generatedCover: "",
  });
  const [generatedCover, setGeneratedCover] = useState(false);

  const handleClick = async () => {
    // stimulate an API call

    // setIsLoading(true);
    // setGeneratedCover(true);
    // setTimeout(() => {
    //   setCover({ generatedCover: temp });
    //   setIsLoading(false);
    // }, 2000);

    // real API call
    setIsLoading(true);
    setGeneratedCover(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/get-coverletter/"
      );
      console.log(response.data);

      setCover({ generatedCover: response.data.cover_letter });
      setIsLoading(false);
      toast.success("Cover Letter generated successfully!");
    } catch (error) {
      setIsLoading(false);
      setGeneratedCover(false);
      toast.error("Error generating email. Please try again.");
      console.error("Error fetching email:", error);
    }
  };

  console.log(cover);
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-3 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Cold Cover Letter Templates
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Personalized cold cover letter to help you reach out to potential
          employers
        </p>
      </div>

      <Card className="mb-2">
        <CardHeader>
          <CardTitle className="text-lg">Cold Cover Letter Strategy</CardTitle>
          <CardDescription>
            Tips for effectively using your personalized cover letter templates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1 text-sm">
            <li className="flex items-start">
              <span className="text-brand-600 mr-2 font-bold">•</span>
              <span>
                <span className="font-medium">Personalize every Letter</span> to
                the specific job and company. Replace all bracketed placeholders
                with relevant and accurate details.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-brand-600 mr-2 font-bold">•</span>
              <span>
                <span className="font-medium">Do Your Research</span> on Look up
                the company{"'"}s mission, recent news, or the hiring manager
                {"'"}s background to include meaningful, personalized touches.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-brand-600 mr-2 font-bold">•</span>
              <span>
                <span className="font-medium">Address a Real Person </span>
                the letter to the hiring manager by name instead of using
                generic salutations like “To Whom It May Concern.”
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-brand-600 mr-2 font-bold">•</span>
              <span>
                <span className="font-medium">Show, Don{"'"}t Tell</span>,{" "}
                instead of just saying you're a "strong communicator," briefly
                highlight a specific achievement or scenario.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
      {generatedCover ? (
        <GeneratedCoverLetter
          generated_coverletter={cover.generatedCover}
          isLoading={isLoading}
        />
      ) : (
        <Button
          onClick={handleClick}
          className="w-38 h-10 ml-3 mt-2 bg-brand-500 hover:bg-brand-600 text-white"
        >
          <span className="text-sm font-medium">Generate Cover Letter</span>
        </Button>
      )}
    </div>
  );
}
