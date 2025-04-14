
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import GeneratedEmail from '@/components/GeneratedEmail';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const EmailsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data - in a real app, this would come from your backend
  const mockEmailTemplates = [
    {
      type: 'standard',
      subject: 'Frontend Developer Position at [Company Name] - Application Follow-up',
      body: `Dear [Hiring Manager's Name],

I recently submitted my application for the Frontend Developer position at [Company Name], and I wanted to follow up to express my continued interest in the role. 

Having reviewed the position requirements thoroughly, I believe that my experience with React, JavaScript, and TypeScript aligns well with what you're looking for. In my current role at [Your Current Company], I've developed responsive web applications that improved user engagement metrics by 40% while maintaining clean, maintainable code.

I'm particularly drawn to [Company Name]'s work on [specific project or product], and I'd be excited to contribute my skills to your team. I've attached my resume again for your convenience and would welcome the opportunity to discuss how my background matches your needs.

Thank you for considering my application. I look forward to the possibility of speaking with you soon.

Best regards,
[Your Name]
[Your Phone Number]
[Your LinkedIn/Portfolio URL]`
    },
    {
      type: 'networking',
      subject: 'Connection Request from a Fellow Frontend Developer',
      body: `Dear [Contact's Name],

I hope this email finds you well. My name is [Your Name], and I'm a frontend developer with experience in [key technologies]. I came across your profile on LinkedIn and was impressed by your work at [Their Company], particularly your contributions to [specific project or achievement].

I'm reaching out because I'm currently exploring new opportunities in frontend development, and I admire the work being done at [Their Company]. I'd love to connect briefly to learn more about your experience and any insights you might have about the industry or company culture.

Would you be open to a 15-minute virtual coffee chat in the coming weeks? I'd greatly appreciate the opportunity to learn from your experience.

Thank you for considering my request. I look forward to potentially connecting with you.

Best regards,
[Your Name]
[Your LinkedIn Profile]
[Your Portfolio Website]`
    },
    {
      type: 'recruiter',
      subject: 'Frontend Developer with React & TypeScript Expertise Available for New Opportunities',
      body: `Dear [Recruiter's Name],

I hope this email finds you well. I'm reaching out because I noticed you specialize in placing frontend development talent with companies in the [specific industry/location] area.

I'm a frontend developer with [X] years of experience and expertise in React, TypeScript, and modern frontend frameworks. I'm currently exploring new opportunities where I can leverage my skills in building responsive, user-focused web applications.

Some highlights from my experience include:
• Developing and maintaining multiple React applications with complex state management
• Implementing responsive designs and ensuring cross-browser compatibility
• Collaborating closely with UX/UI designers to translate mockups into functional code
• Working in agile environments with CI/CD pipelines

I've attached my resume for your review. I'm particularly interested in opportunities that involve [specific type of work or industry], but I'm open to discussing any roles that might be a good match for my skillset.

Would you have time for a brief conversation to discuss potential opportunities? I'm available at your convenience and can be reached at [your phone number].

Thank you for your consideration. I look forward to potentially working with you.

Best regards,
[Your Name]
[Your Phone Number]
[Your LinkedIn/Portfolio URL]`
    }
  ];

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Cold Email Templates</h1>
          <p className="mt-2 text-lg text-gray-600">
            Personalized cold emails to help you reach out to potential employers
          </p>
        </div>
        
        {!isLoading && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Cold Email Strategy</CardTitle>
              <CardDescription>Tips for effectively using your personalized email templates</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-brand-600 mr-2 font-bold">•</span>
                  <span><span className="font-medium">Personalize each template</span> before sending by replacing all bracketed placeholders with relevant information.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-600 mr-2 font-bold">•</span>
                  <span><span className="font-medium">Research the recipient</span> on LinkedIn or the company website to add personalized details to your message.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-600 mr-2 font-bold">•</span>
                  <span><span className="font-medium">Follow up respectfully</span> if you don't receive a response within 1-2 weeks.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-600 mr-2 font-bold">•</span>
                  <span><span className="font-medium">Track your outreach</span> using a spreadsheet or CRM to manage your job search effectively.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        )}
        
        <GeneratedEmail 
          emailTemplates={mockEmailTemplates}
          isLoading={isLoading}
        />
      </div>
    </Layout>
  );
};

export default EmailsPage;
