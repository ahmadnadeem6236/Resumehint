import json
import re

# import viewsets
from rest_framework import viewsets
from rest_framework.response import Response

# import models
from .models import JobDescription, Resume

# import local data
from .serializers import JobDescriptionSerializer, ResumeSerializer
from .services.analyze import AnalyzeResume

# import services
from .services.pdf_services import extract_pdf_text


# create a viewset
class JobDescriptionViewSet(viewsets.ModelViewSet):
    # define queryset
    queryset = JobDescription.objects.all()

    # specify serializer to be used
    serializer_class = JobDescriptionSerializer


class ResumeViewSet(viewsets.ModelViewSet):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer


# @api_view(["GET"])
# def get_resume(request):
#     resume = Resume.objects.last()
#     # serializer = ResumeSerializer(resume)
#     # data = serializer.data
#     pdf = resume.resume.path
#     extracted_text = extract_pdf_text(pdf)
#     return Response({"text": extracted_text.replace("\n", "")})
#
#
# @api_view(["GET"])
# def get_email(request):
#     job = JobDescription.objects.last()
#     job_des = job.description
#
#     resume = Resume.objects.last()
#     pdf = resume.resume.path
#     extracted_text = extract_pdf_text(pdf)
#     resume_data = extracted_text.replace("\n", "")
#     print("job_des", job_des)
#     print("resume_data", resume_data)
#
#     analyze = AnalyzeResume()
#     data = analyze.write_mail(job=job_des, resume=resume_data)
#     if data:
#         return Response({"genrated_mail": data})


class GetResumeViewSet(viewsets.ViewSet):
    def list(self, request):
        resume = Resume.objects.last()
        # serializer = ResumeSerializer(resume)
        # data = serializer.data
        pdf = resume.resume.path
        extracted_text = extract_pdf_text(pdf)
        return Response({"text": extracted_text.replace("\n", "")})


class EmailViewSet(viewsets.ViewSet):
    def list(self, request):
        job = JobDescription.objects.last()
        job_des = job.description

        resume = Resume.objects.last()
        pdf = resume.resume.path
        extracted_text = extract_pdf_text(pdf)
        resume_data = extracted_text.replace("\n", "")
        print("job_des", job_des)
        print("resume_data", resume_data)

        analyze = AnalyzeResume()
        data = analyze.write_mail(job=job_des, resume=resume_data)
        if data:
            return Response({"genrated_mail": data})


class CoverLetterViewSet(viewsets.ViewSet):
    def list(self, request):
        job = JobDescription.objects.last()
        job_des = job.description

        resume = Resume.objects.last()
        pdf = resume.resume.path
        extracted_text = extract_pdf_text(pdf)
        resume_data = extracted_text.replace("\n", "")
        print("job_des", job_des)
        print("resume_data", resume_data)

        analyze = AnalyzeResume()
        data = analyze.write_coverLetter(job=job_des, resume=resume_data)
        if data:
            return Response({"genrated_mail": data})


class AnalyzeJobViewSet(viewsets.ViewSet):
    def list(self, request):
        job = JobDescription.objects.last()
        job_des = job.description

        resume = Resume.objects.last()
        pdf = resume.resume.path
        extracted_text = extract_pdf_text(pdf)
        resume_data = extracted_text.replace("\n", "")
        print("job_des", job_des)
        print("resume_data", resume_data)

        analyze = AnalyzeResume()
        data = analyze.analyze_job_description(job=job_des, resume=resume_data)
        match = re.search(r"{.*}", data, re.DOTALL)
        if match:
            json_str = match.group()
            json_str = json_str.replace("'", '"')

            parsed = json.loads(json_str)
            return Response(parsed)


class AnalyzeResumeViewSet(viewsets.ViewSet):
    def list(self, request):
        job = JobDescription.objects.last()
        job_des = job.description

        resume = Resume.objects.last()
        pdf = resume.resume.path
        extracted_text = extract_pdf_text(pdf)
        resume_data = extracted_text.replace("\n", "")
        print("job_des", job_des)
        print("resume_data", resume_data)

        analyze = AnalyzeResume()
        data = analyze.analyze_resume(job=job_des, resume=resume_data)
        match = re.search(r"{.*}", data, re.DOTALL)
        if match:
            json_str = match.group()
            json_str = json_str.replace("'", '"')

            parsed = json.loads(json_str)
            return Response(parsed)


class PrepViewSet(viewsets.ViewSet):
    def list(self, request):
        job = JobDescription.objects.last()
        job_des = job.description

        resume = Resume.objects.last()
        pdf = resume.resume.path
        extracted_text = extract_pdf_text(pdf)
        resume_data = extracted_text.replace("\n", "")
        print("job_des", job_des)
        print("resume_data", resume_data)

        analyze = AnalyzeResume()
        data = analyze.generate_job_interview_qa(
            job=job_des, resume=resume_data
        )
        match = re.search(r"{.*}", data, re.DOTALL)
        if match:
            json_str = match.group()
            json_str = json_str.replace("'", '"')

            parsed = json.loads(json_str)
            return Response(parsed)
