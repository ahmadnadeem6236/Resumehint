"use client";
import React, { useState, useEffect } from "react";
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

// Mock data - in a real app, this would come from your backend
const tempEmail = `I hope this email finds you well. My name is [Your Name], and I'm a frontend developer with experience in [key technologies]. I came across your profile on LinkedIn and was impressed by your work at [Their Company], particularly your contributions to [specific project or achievement].

I'm reaching out because I'm currently exploring new opportunities in frontend development, and I admire the work being done at [Their Company]. I'd love to connect briefly to learn more about your experience and any insights you might have about the industry or company culture.

Would you be open to a 15-minute virtual coffee chat in the coming weeks? I'd greatly appreciate the opportunity to learn from your experience.

Thank you for considering my request. I look forward to potentially connecting with you.
Thank you for considering my request. I look forward to potentially connecting with you.
Thank you for considering my request. I look forward to potentially connecting with you.
Thank you for considering my request. I look forward to potentially connecting with you.
Thank you for considering my request. I look forward to potentially connecting with you.
Thank you for considering my request. I look forward to potentially connecting with you.
Thank you for considering my request. I look forward to potentially connecting with you.
Thank you for considering my request. I look forward to potentially connecting with you.
Thank you for considering my request. I look forward to potentially connecting with you.
Thank you for considering my request. I look forward to potentially connecting with you.

Best regards,
[Your Name]
[Your LinkedIn Profile]
[Your Portfolio Website]`;

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
                before sending by replacing all bracketed placeholders with
                relevant information.
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
