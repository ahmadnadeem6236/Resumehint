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

    # def extract_jobs(self, cleaned_text):
    #     prompt_extract = PromptTemplate.from_template(
    #         """
    #         ### SCRAPED TEXT FROM WEBSITE:
    #         {page_data}
    #         ### INSTRUCTION:
    #         The scraped text is from the career's page of a website.
    #         Your job is to extract the upwork postings and return them in JSON format containing the following keys: `role`, `skills` and `description`.
    #         Only return the valid JSON.
    #         ### VALID JSON (NO PREAMBLE):
    #         """
    #     )
    #     chain_extract = prompt_extract | self.llm
    #     res = chain_extract.invoke(input={"page_data": cleaned_text})
    #     try:
    #         json_parser = JsonOutputParser()
    #         res = json_parser.parse(res.content)
    #     except OutputParserException:
    #         raise OutputParserException(
    #             "Context too big. Unable to parse jobs."
    #         )
    #     return res if isinstance(res, list) else [res]
    #

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
            Analyze this job description and provide a detailed response with the following sections:
            1. Key Skills Required
            2. Experience Level
            3. Match Analysis with current resume
            4. Suggestions for Improvement

            ### JOB DESCRIPTION:
            {job_description}

            ### Resume:
            {resume_data}

            Generate the the response in json with four key sections.
            # Expected output Structure:
            '''
            
            {{"KeySkills"}}: ["React", "JavaScript","Python"],
            {{"ExperienceLevel"}}: 1,
            {{"Analysis"}}: "The chances of you getting this job is high",
            {{"Suggestions"}}: ["Improve Communication", "React", "System Design"]
           
            '''

            ### Only return raw JSON, no explanations.(NO PREAMBLE):

            """
        )
        chain_email = prompt_analyze | self.llm
        res = chain_email.invoke(
            {"job_description": str(job), "resume_data": str(resume)}
        )
        return res.content


if __name__ == "__main__":
    print(os.getenv("GROQ"))
