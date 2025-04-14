
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ResumeUpload from '@/components/ResumeUpload';
import ResumeScore from '@/components/ResumeScore';
import GeneratedCoverLetter from '@/components/GeneratedCoverLetter';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const { toast } = useToast();

  // Mock data - in a real app, this would come from the backend
  const mockScore = 72;
  const mockMatchedKeywords = ['JavaScript', 'React', 'Frontend Development', 'UI/UX', 'API Integration', 'TypeScript', 'HTML', 'CSS'];
  const mockMissingKeywords = ['Three.js', 'WebGL', 'GraphQL', 'Docker'];
  const mockSuggestions = [
    {
      category: 'Content Improvements',
      items: [
        {
          title: 'Quantify your achievements',
          description: 'Add metrics and numbers to demonstrate the impact of your work. For example, "Improved website performance by 35%" instead of just "Improved website performance".',
          severity: 'high' as 'high'
        },
        {
          title: 'Add missing technical skills',
          description: 'Consider adding experience with Three.js and WebGL if you have any familiarity with these technologies.',
          severity: 'medium' as 'medium'
        }
      ]
    },
    {
      category: 'Formatting Suggestions',
      items: [
        {
          title: 'Use bullet points consistently',
          description: 'Format all of your job descriptions with bullet points for better readability.',
          severity: 'low' as 'low'
        }
      ]
    },
    {
      category: 'Language Optimization',
      items: [
        {
          title: 'Use action verbs',
          description: 'Start bullet points with strong action verbs like "Developed," "Implemented," or "Designed" instead of passive language.',
          severity: 'medium' as 'medium'
        },
        {
          title: 'Mirror job description language',
          description: 'Incorporate more terminology from the job description, especially regarding frontend development methodologies.',
          severity: 'high' as 'high'
        }
      ]
    }
  ];
  
  const mockCoverLetter = `Dear Hiring Manager,

I am writing to express my interest in the Frontend Developer position at [Company Name], as advertised. With over three years of experience building responsive and interactive web applications using React, JavaScript, and TypeScript, I am confident in my ability to make a significant contribution to your team.

The job description mentions the need for someone who can create seamless user experiences while implementing complex frontend functionality. In my current role at [Current Company], I have led the development of several key features that improved user engagement by 25% and reduced bounce rates by 15%. I've worked extensively with RESTful APIs, state management solutions, and modern CSS frameworks to build scalable and maintainable code.

Your focus on creating innovative digital solutions for clients across various industries particularly appeals to me. I thrive in collaborative environments where I can apply my technical skills to solve real business challenges. My experience working in agile teams and coordinating with designers and backend developers ensures that I can integrate smoothly into your development workflow.

I am particularly excited about the opportunity to work with your team on [specific project or company goal mentioned in job posting]. My background in UI/UX principles and performance optimization would be valuable assets for this initiative.

I would welcome the chance to discuss how my skills and experience align with the needs of [Company Name]. Thank you for considering my application. I look forward to the possibility of working together.

Sincerely,
[Your Name]`;

  const handleResumeUpload = (file: File) => {
    setResumeFile(file);
    handleAnalyzeResume(file, jobDescription);
  };

  const handleJobDescriptionSet = (description: string) => {
    setJobDescription(description);
  };

  const handleAnalyzeResume = async (file: File, description: string) => {
    // In a real app, this would send the file and job description to your backend
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate successful analysis
      setAnalysisComplete(true);
      
      toast({
        title: "Analysis complete",
        description: "Your resume has been successfully analyzed.",
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Resume Evaluation & Optimization</h1>
          <p className="mt-2 text-lg text-gray-600">
            Upload your resume and a job description to get personalized feedback and improvements
          </p>
        </div>
        
        <ResumeUpload 
          onResumeUploaded={handleResumeUpload}
          onJobDescriptionSet={handleJobDescriptionSet}
          isLoading={isLoading}
        />
        
        {(isLoading || analysisComplete) && (
          <>
            <ResumeScore 
              score={mockScore}
              matchedKeywords={mockMatchedKeywords}
              missingKeywords={mockMissingKeywords}
              suggestions={mockSuggestions}
              isLoading={isLoading}
            />
            
            <GeneratedCoverLetter 
              coverLetter={mockCoverLetter}
              isLoading={isLoading} 
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Index;
