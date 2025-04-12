import os

from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate
from langchain_groq import ChatGroq

load_dotenv()


class AnalyzeResume:
    def __init__(self):
        self.llm = ChatGroq(
            temperature=0,
            groq_api_key=os.getenv("GROQ"),
            model_name="llama-3.3-70b-versatile",
        )

    def analyze_resume(self, job, resume):
        prompt_ats = PromptTemplate.from_template(
            """

            ### INSTRUCTION:
            Analyze the job description and resume to calculate an **ATS Compatibility Score** and provide a breakdown in the following format:
            1. ATS Score (0-100)
            2. Skills Matched
            3. Keywords Missing
            4. Detailed Comments and Observations

            ### JOB DESCRIPTION:
            {job_description}

            ### RESUME:
            {resume_data}

            Generate the response in JSON format as follows:
            '''
            {{
                "ATS_Score": 87,
                "SkillsMatched": ["React", "JavaScript", "Agile"],
                "KeywordsMissing": ["REST API", "GraphQL", "CI/CD"],
                "Comments": "Resume aligns well with front-end requirements but lacks specific backend integration skills mentioned in JD."
            }}
            '''

            ### Only return raw JSON, no explanations. (NO PREAMBLE):

            """
        )
        chain_ats = prompt_ats | self.llm
        res = chain_ats.invoke(
            {"job_description": str(job), "resume_data": str(resume)}
        )
        return res.content

    def write_mail(self, job, resume):
        prompt_email = PromptTemplate.from_template(
            """
            ### JOB DESCRIPTION:
            {job_description}

            ### INSTRUCTION:
           Write a professional email from the job_description including the resume details:

           ### Resume:
           {resume_data}

            Email should not be more than 300 words.
            It should be in three paragraph.
            ### Email (NO PREAMBLE):

            """
        )
        chain_email = prompt_email | self.llm
        res = chain_email.invoke(
            {"job_description": str(job), "resume_data": str(resume)}
        )
        return res.content

    def write_coverLetter(self, job, resume):
        prompt_coverLetter = PromptTemplate.from_template(
            """
            ### JOB DESCRIPTION:
            {job_description}

            ### INSTRUCTION:
           Write a professional cover letter from the job_description including the resume details:

           ### Resume:
           {resume_data}

            Cover letter should not be more than 300 words.
            It should be in three paragraph.
            ### Email (NO PREAMBLE):

            """
        )
        chain_email = prompt_coverLetter | self.llm
        res = chain_email.invoke(
            {"job_description": str(job), "resume_data": str(resume)}
        )
        return res.content

    def analyze_job_description(self, job, resume):
        prompt_analyze = PromptTemplate.from_template(
            """
            ### INSTRUCTION:
            Review the following job description and resume. Provide a detailed analysis with the following JSON fields:
            1. "KeySkills" - A concise list of the most relevant technical and soft skills inferred from the job description.
            2. "ExperienceLevel" - A numeric estimation of the minimum years of experience required (e.g., 0, 1, 3, 5).
            3. "Analysis" - A short paragraph assessing how well the resume aligns with the job, considering skills, experience, and relevance.
            4. "Suggestions" - Actionable, resume-specific tips to improve chances for this role (e.g., add specific tools, clarify achievements, tailor summaries).

            ### JOB DESCRIPTION:
            {job_description}

            ### RESUME:
            {resume_data}

            ### OUTPUT FORMAT:
            Return raw JSON only. No explanations, headings, or extra text.

            '''
            {{
                "KeySkills": ["React", "JavaScript", "Python"],
                "ExperienceLevel": 2,
                "Analysis": "Your resume covers several required skills, but lacks clarity on recent project impact and leadership. Moderate match overall.",
                "Suggestions": ["Add project metrics", "Clarify role in team-based projects", "Include recent tools mentioned in JD"]
            }}
            '''
            """
        )
        chain_analyze = prompt_analyze | self.llm
        res = chain_analyze.invoke(
            {"job_description": str(job), "resume_data": str(resume)}
        )
        return res.content

    def generate_job_interview_qa(self, job, resume):
        prompt_qa = PromptTemplate.from_template(
            """
            ### INSTRUCTION:
            Based on the following job description and resume, generate 10 interview questions that are likely to be asked during a job interview. 
            For each question, also generate a strong, customized answer based on the candidate's resume.

            Focus areas:
            - Technical and role-specific questions
            - Behavioral questions (STAR format encouraged)
            - Questions related to soft skills, experience, and projects

            ### JOB DESCRIPTION:
            {job_description}

            ### RESUME:
            {resume_data}

            Format your response in JSON:
            '''
            {{
                "InterviewPrep": [
                    {{
                        "Question": "What experience do you have with React?",
                        "Answer": "In my previous role at XYZ Corp, I led the development of a customer dashboard using React..."
                    }},
                    ...
                    {{ "Question": "...", "Answer": "..." }}
                ]
            }}
            '''

            ### Only return raw JSON, no explanations. (NO PREAMBLE):
            """
        )
        chain_qa = prompt_qa | self.llm
        res = chain_qa.invoke(
            {"job_description": str(job), "resume_data": str(resume)}
        )
        return res.content


if __name__ == "__main__":
    print(os.getenv("GROQ"))
