import os

from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate
from langchain_groq import ChatGroq
from openai import OpenAI

load_dotenv()


class AnalyzeResume:
    def __init__(self):
        self.llm = ChatGroq(
            temperature=0,
            groq_api_key=os.getenv("GROQ"),
            model_name="llama-3.3-70b-versatile",
        )
        # self.llm = ChatOpenAI(
        #     openai_api_key=os.getenv("OPENROUTER_API_KEY"),
        #     openai_api_base=os.getenv("OPENROUTER_BASE_URL"),
        #     model_name="google/gemma-3-1b-it:free",
        # )

        self.client = OpenAI(
            api_key=os.getenv("OPENROUTER_API_KEY"),
            base_url=os.getenv("OPENROUTER_BASE_URL"),
        )
        self.model = "google/gemma-3-1b-it:free"

    def generate_job_interview_qa(self, job, resume):
        prompt = f"""
            ### INSTRUCTION:
            Based on the following job description and resume, generate 10 interview questions that are likely to be asked during a job interview. 
            For each question, also generate a strong, customized answer based on the candidate's resume.

            Focus areas:
            - Technical and role-specific questions
            - Behavioral questions (STAR format encouraged)
            - Questions related to soft skills, experience, and projects

            ### JOB DESCRIPTION:
            {job}

            ### RESUME:
            {resume}

            Format your response in JSON like below:
            {{
                "InterviewPrep": [
                    {{
                        "Question": "What experience do you have with React?",
                        "Answer": "In my previous role at XYZ Corp, I led the development of a customer dashboard using React."
                    }},
                    {{
                        "Question": "Tell me about a challenging project you worked on.",
                        "Answer": "At ABC Company, I was tasked with optimizing database performance for our main product."
                    }}
                    // Include 10 more similar question-answer pairs
                ]
            }}

            IMPORTANT: Return ONLY valid JSON with no additional text. Ensure all quotes and brackets are properly balanced.
            Each question-answer pair must have proper JSON syntax with comma separators between objects.
            Do not include any placeholders or comments in the final JSON.
            """

        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant that generates JSON.",
                },
                {"role": "user", "content": prompt},
            ],
            temperature=0.2,  # Lower temperature for more consistent, structured output
        )

        return response.choices[0].message.content

    def analyze_resume(self, job, resume):
        prompt = f"""
        ### INSTRUCTION:
        You are a top recruiter according to you analyze the job description and resume to calculate an **ATS Compatibility Score** and provide the details in following format:
        1. ATS Score (0-100)
        2. Skills Matched
        3. Keywords Missing
        4. Detailed Comments and Observations
        5. Suggestions (organized by category):
            - Content Improvements
            - Formatting Suggestions
            - Language Optimization

        ### JOB DESCRIPTION:
        {job}

        ### RESUME:
        {resume}

        Generate the response in JSON format as follows:
        {{
            "ATS_Score": 87,
            "SkillsMatched": ["React", "JavaScript", "Agile"],
            "KeywordsMissing": ["REST API", "GraphQL", "CI/CD"],
            "Comments": "Resume aligns well with front-end requirements but lacks specific backend integration skills mentioned in JD.",
            "Suggestions": [
                {{
                    "category": "Content Improvements",
                    "items": [
                        {{
                            "title": "Quantify your achievements",
                            "description": "Add metrics and numbers to demonstrate the impact of your work",
                            "severity": "high"
                        }},
                        {{
                            "title": "Add missing technical skills",
                            "description": "Consider adding experience with Three.js and WebGL if you have any familiarity with these technologies.",
                            "severity": "medium"
                        }}
                    ]
                }},
                {{
                    "category": "Formatting Suggestions",
                    "items": [
                        {{
                            "title": "Use bullet points consistently",
                            "description": "Format all of your job descriptions with bullet points for better readability.",
                            "severity": "low"
                        }}
                    ]
                }},
                {{
                    "category": "Language Optimization",
                    "items": [
                        {{
                            "title": "Use action verbs",
                            "description": "Start bullet points with strong action verbs like Developed, Implemented, or Designed instead of passive language.",
                            "severity": "medium"
                        }},
                        {{
                            "title": "Mirror job description language",
                            "description": "Incorporate more terminology from the job description, especially regarding frontend development methodologies.",
                            "severity": "high"
                        }}
                    ]
                }}
            ]
        }}

        ### IMPORTANT:
        - Return ONLY the raw JSON object.
        - Do NOT include markdown code block syntax (```json or ```) in your response.
        - Ensure all quotes and brackets are properly balanced.
        - Do not include any explanatory text or anything else outside the JSON.
        """

        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {
                    "role": "system",
                    "content": "You are a JSON generator that creates structured ATS analysis. Return only valid JSON with no markdown formatting.",
                },
                {"role": "user", "content": prompt},
            ],
            temperature=0.2,  # Lower temperature for more consistent output
        )

        return response.choices[0].message.content

    def write_mail(self, job, resume):
        prompt_email = PromptTemplate.from_template(
            """
            ### JOB DESCRIPTION:
            {job_description}

            ### INSTRUCTION:
            Write a professional email from the job_description including the details from the resume:

            ### RESUME
            {resume}

            ### Cover letter (NO PREAMBLE):

            """
        )
        chain_email = prompt_email | self.llm
        res = chain_email.invoke(
            {"job_description": str(job), "resume": str(resume)}
        )
        return res.content

    def write_coverLetter(self, job, resume):
        prompt = f"""
        ### JOB DESCRIPTION:
        {job}

        ### INSTRUCTION:
        Write a detailed cover letter for a [job position] at [company]. 
        Start with a brief introduction about my interest in the role and the company. Highlight my key achievements in [specific skill] and how my previous experience at [previous job] has prepared me for this position. 
        Emphasize why I would be a great fit for the company's culture and goals, and conclude by expressing my eagerness for an interview.

        ### Resume:
        {resume}

        Cover letter should not be more than 400 words.
        It should be in three paragraphs.
        
        ### Cover Letter (NO PREAMBLE):
        """

        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {
                    "role": "system",
                    "content": "You are a professional cover letter writer for job applications.",
                },
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,  # A bit higher temperature for more creative writing
        )

        return response.choices[0].message.content

    def analyze_job_description(self, job_description):
        prompt = f"""
        ### INSTRUCTION:
        Please analyze the following job description and provide detailed insights on:
        1. Key responsibilities and expectations of the role
        2. Required technical skills and experience
        3. Soft skills and personal qualities sought
        4. Company culture indicators based on language used
        5. Potential red flags or warning signs (if any)
        6. Job level and career advancement potential
        7. Recommended qualifications or experiences to highlight in an application
        8. Suggested questions to ask during an interview to learn more about the position
        
        ### JOB DESCRIPTION:
        {job_description}
        
        Please provide a comprehensive analysis covering all these aspects to help understand what this role truly entails beyond the surface-level requirements.
        
        Format your response as JSON with the following structure:
        {{
            "KeyResponsibilities": ["Responsibility 1", "Responsibility 2", ...],
            "TechnicalSkills": ["Skill 1", "Skill 2", ...],
            "SoftSkills": ["Soft skill 1", "Soft skill 2", ...],
            "CompanyCulture": "Analysis of company culture based on job description...",
            "PotentialRedFlags": ["Red flag 1", "Red flag 2", ...],
            "JobLevel": "Analysis of job level and seniority...",
            "CareerAdvancement": "Insights on potential career growth...",
            "RecommendedQualifications": ["Qualification 1", "Qualification 2", ...],
            "SuggestedQuestions": ["Question 1?", "Question 2?", ...]
        }}
        
        ### IMPORTANT:
        - Return ONLY the raw JSON object.
        - Do NOT include markdown code block syntax (```json or ```) in your response.
        - Ensure all quotes and brackets are properly balanced.
        - Provide thorough analysis in each section.
        """

        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {
                    "role": "system",
                    "content": "You are a professional job description analyst that provides structured insights in JSON format.",
                },
                {"role": "user", "content": prompt},
            ],
            temperature=0.5,  # Balanced between creativity and consistency
        )

        return response.choices[0].message.content

    # def analyze_resume(self, job, resume):
    #     prompt_ats = PromptTemplate.from_template(
    #         """
    #
    #         ### INSTRUCTION:
    #         You are a top recruiter according to you analyze the job description and resume to calculate an **ATS Compatibility Score** and provide the details in  following format:
    #         1. ATS Score (0-100)
    #         2. Skills Matched
    #         3. Keywords Missing
    #         4. Detailed Comments and Observations
    #         5. Suggestions (organized by category):
    #             - Content Improvements
    #             - Formatting Suggestions
    #             - Language Optimization
    #
    #         ### JOB DESCRIPTION:
    #         {job_description}
    #
    #         ### RESUME:
    #         {resume_data}
    #
    #         This is an example, Generate the response in JSON format as follows:
    #         '''
    #         {{
    #             "ATS_Score": 87,
    #             "SkillsMatched": ["React", "JavaScript", "Agile"],
    #             "KeywordsMissing": ["REST API", "GraphQL", "CI/CD"],
    #             "Comments": "Resume aligns well with front-end requirements but lacks specific backend integration skills mentioned in JD.",
    #             "Suggestions": [
    #             {{
    #             "category": "Content Improvements",
    #             "items": [
    #                 "{{
    #                     "title": "Quantify your achievements",
    #                     "description": "Add metrics and numbers to demonstrate the impact of your work",
    #                     "severity": "high",
    #                 }}"
    #                 "{{
    #                     "title": "Add missing technical skills",
    #                     "description": "Consider adding experience with Three.js and WebGL if you have any familiarity with these technologies.",
    #                     "severity": "medium",
    #                 }}"
    #             ],
    #             }},
    #             {{
    #             "category": "Formatting Suggestions",
    #             "items": [
    #                 "{{
    #                     "title": "Use bullet points consistently",
    #                     "description": "Format all of your job descriptions with bullet points for better readability.",
    #                     "severity": "low"
    #                 }}"
    #             ]
    #             }},
    #             {{
    #             "category": "Language Optimization",
    #             "items": [
    #                 "{{
    #                     "title": "Use action verbs",
    #                     "description": `Start bullet points with strong action verbs like Developed, Implemented, or Designed instead of passive language.`,
    #                     "severity": "medium"
    #                 }}",
    #                 "{{
    #                     "title": "Mirror job description language",
    #                     "description": "Incorporate more terminology from the job description, especially regarding frontend development methodologies.",
    #                     "severity": "high"
    #                 }}"
    #             ]
    #             }}
    #           ]
    #         }}
    #         '''
    #
    #         ### Only return raw JSON, no explanations. (NO PREAMBLE):
    #
    #         """
    #     )
    #     chain_ats = prompt_ats | self.llm
    #     res = chain_ats.invoke(
    #         {"job_description": str(job), "resume_data": str(resume)}
    #     )
    #     return res.content
    #
    # def write_mail(self, job, resume):
    #     prompt_email = PromptTemplate.from_template(
    #         """
    #         ### JOB DESCRIPTION:
    #         {job_description}
    #
    #         ### INSTRUCTION:
    #        Write a professional email from the job_description including the resume details:
    #
    #        ### Resume:
    #        {resume_data}
    #
    #         Email should not be more than 300 words.
    #         It should be in three paragraph.
    #         ### Email (NO PREAMBLE):
    #
    #         """
    #     )
    #     chain_email = prompt_email | self.llm
    #     res = chain_email.invoke(
    #         {"job_description": str(job), "resume_data": str(resume)}
    #     )
    #     return res.content
    #
    # def write_coverLetter(self, job, resume):
    #     prompt_coverLetter = PromptTemplate.from_template(
    #         """
    #         ### JOB DESCRIPTION:
    #         {job_description}
    #
    #         ### INSTRUCTION:
    #        Write a professional cover letter from the job_description including the resume details:
    #
    #        ### Resume:
    #        {resume_data}
    #
    #         Cover letter should not be more than 300 words.
    #         It should be in three paragraph.
    #         ### Email (NO PREAMBLE):
    #
    #         """
    #     )
    #     chain_email = prompt_coverLetter | self.llm
    #     res = chain_email.invoke(
    #         {"job_description": str(job), "resume_data": str(resume)}
    #     )
    #     return res.content
    #
    # def analyze_job_description(self, job, resume):
    #     prompt_analyze = PromptTemplate.from_template(
    #         """
    #         ### INSTRUCTION:
    #         Review the following job description and resume. Provide a detailed analysis with the following JSON fields:
    #         1. KeySkills - A concise list of the most relevant technical and soft skills inferred from the job description.
    #         2. ExperienceLevel - A numeric estimation of the minimum years of experience required.
    #         3. Analysis - A short paragraph assessing how well the resume aligns with the job considering skills experience and relevance.
    #
    #         ### JOB DESCRIPTION:
    #         {job_description}
    #
    #         ### RESUME:
    #         {resume_data}
    #
    #         ### OUTPUT FORMAT:
    #         Return raw JSON only No explanations headings or extra text.
    #         '''
    #         {{
    #             "KeySkills": ["React", "JavaScript", "Python"],
    #             "ExperienceLevel": 2,
    #             "Analysis": "Your resume covers several required skills but lacks clarity on recent project impact and leadership.",
    #         }}
    #         '''
    #         """
    #     )
    #     chain_analyze = prompt_analyze | self.llm
    #     res = chain_analyze.invoke(
    #         {"job_description": str(job), "resume_data": str(resume)}
    #     )
    #     return res.content
    #
    # def generate_job_interview_qa(self, job, resume):
    #     prompt_qa = PromptTemplate.from_template(
    #         """
    #         ### INSTRUCTION:
    #         Based on the following job description and resume, generate 10 interview questions that are likely to be asked during a job interview.
    #         For each question, also generate a strong, customized answer based on the candidate's resume.
    #
    #         Focus areas:
    #         - Technical and role-specific questions
    #         - Behavioral questions (STAR format encouraged)
    #         - Questions related to soft skills, experience, and projects
    #
    #         ### JOB DESCRIPTION:
    #         {job_description}
    #
    #         ### RESUME:
    #         {resume_data}
    #
    #         Format your response in JSON:
    #         '''
    #         {{
    #             "InterviewPrep": [
    #                 {{
    #                     "Question": "What experience do you have with React?",
    #                     "Answer": "In my previous role at XYZ Corp, I led the development of a customer dashboard using React."
    #                 }},
    #                 {{
    #                     "Question": "Tell me about a challenging project you worked on.",
    #                     "Answer": "At ABC Company, I was tasked with optimizing database performance for our main product."
    #                 }}
    #                 // Include 8 more similar question-answer pairs
    #             ]
    #         }}
    #         '''
    #
    #         IMPORTANT: Return ONLY valid JSON with no additional text. Ensure all quotes and brackets are properly balanced.
    #         Each question-answer pair must have proper JSON syntax with comma separators between objects.
    #         Do not include any placeholders like '...' or comments in the final JSON.
    #         """
    #     )
    #     chain_qa = prompt_qa | self.llm
    #     res = chain_qa.invoke(
    #         {"job_description": str(job), "resume_data": str(resume)}
    #     )
    #     return res.content


if __name__ == "__main__":
    print(os.getenv("GROQ"))
