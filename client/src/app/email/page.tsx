"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import GeneratedEmail from "@/components/GeneratatedEmail";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function page() {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState({
    generatedMail: "",
  });
  const [generatedMail, setGeneratedMail] = useState(false);

  const handleClick = async () => {
    // API call
    setIsLoading(true);
    setGeneratedMail(true);
    try {
      const response = await axios.get("http://localhost:8000/api/get-email/");
      console.log(response.data);

      setEmail({ generatedMail: response.data.email });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setGeneratedMail(false);
      toast.error("Error generating email. Please try again.");
      console.error("Error fetching email:", error);
    }
  };

  console.log(email);
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-3 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Cold Email Templates
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Personalized cold emails to help you reach out to potential employers
        </p>
      </div>

      <Card className="mb-2">
        <CardHeader>
          <CardTitle className="text-lg">Cold Email Strategy</CardTitle>
          <CardDescription>
            Tips for effectively using your personalized email templates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1 text-sm">
            <li className="flex items-start">
              <span className="text-brand-600 mr-2 font-bold">•</span>
              <span>
                <span className="font-medium">Personalize each template</span>{" "}
                before sending check for space and line breaks.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-brand-600 mr-2 font-bold">•</span>
              <span>
                <span className="font-medium">Research the recipient</span> on
                LinkedIn or the company website to add personalized details to
                your message.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-brand-600 mr-2 font-bold">•</span>
              <span>
                <span className="font-medium">Follow up respectfully</span> if
                you don't receive a response within 1-2 weeks.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-brand-600 mr-2 font-bold">•</span>
              <span>
                <span className="font-medium">Track your outreach</span> using a
                spreadsheet or CRM to manage your job search effectively.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
      {generatedMail ? (
        <GeneratedEmail
          generated_mail={email.generatedMail}
          isLoading={isLoading}
        />
      ) : (
        <Button
          onClick={handleClick}
          className="w-28 h-10 ml-3 mt-2 bg-brand-500 hover:bg-brand-600 text-white"
        >
          <span className="text-sm font-medium">Generate Email</span>
        </Button>
      )}
    </div>
  );
}
