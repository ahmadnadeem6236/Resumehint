import json

from django.http import JsonResponse

# import viewsets
from rest_framework import viewsets
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

# import models
from .models import JobResume

# import local data
from .serializers import JobResumeSerializer
from .services.analyze import AnalyzeResume

# import services
from .services.pdf_services import clean_json_with_regex, extract_pdf_text


class JobResumeViewSet(viewsets.ModelViewSet):
    queryset = JobResume.objects.all()
    serializer_class = JobResumeSerializer


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
        resume = JobResume.objects.last().resume.path
        # serializer = ResumeSerializer(resume)
        # data = serializer.data
        pdf = resume
        extracted_text = extract_pdf_text(pdf)
        return Response({"text": extracted_text.replace("\n", "")})


class EmailViewSet(viewsets.ViewSet):
    def list(self, request):
        try:
            job = JobResume.objects.last().description
            job_des = job

            resume = JobResume.objects.last().resume.path
            pdf = resume
            extracted_text = extract_pdf_text(pdf)
            resume_data = extracted_text.replace("\n", "")
            print("job_des", job_des)
            print("resume_data", resume_data)

            analyze = AnalyzeResume()
            data = analyze.write_mail(job=job_des, resume=resume_data)
            return JsonResponse({"email": data})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


class CoverLetterViewSet(viewsets.ViewSet):
    def list(self, request):
        try:
            job = JobResume.objects.last().description
            job_des = job

            resume = JobResume.objects.last().resume.path
            pdf = resume
            extracted_text = extract_pdf_text(pdf)
            resume_data = extracted_text.replace("\n", "")

            analyze = AnalyzeResume()
            data = analyze.write_coverLetter(job=job_des, resume=resume_data)
            return JsonResponse({"cover_letter": data})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


class AnalyzeJobViewSet(viewsets.ViewSet):
    parser_classes = [JSONParser]

    def create(self, request):
        try:
            job_data = request.data.get("job")
            if not job_data:
                return JsonResponse(
                    {"error": "No job data provided"}, status=400
                )

            analyze = AnalyzeResume()
            raw_result = analyze.analyze_job_description(job_data)

            cleaned_result = clean_json_with_regex(raw_result)
            json_data = json.loads(cleaned_result)
            return JsonResponse(json_data)
        except json.JSONDecodeError as e:
            return JsonResponse(
                {
                    "error": f"Failed to parse JSON response: {str(e)}",
                    "raw_response": raw_result,
                    "cleaned_response": cleaned_result,
                },
                status=500,
            )

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


class AnalyzeResumeViewSet(viewsets.ViewSet):
    def list(self, request):
        job = JobResume.objects.last().description
        job_des = job

        resume = JobResume.objects.last().resume.path
        pdf = resume
        extracted_text = extract_pdf_text(pdf)
        resume_data = extracted_text.replace("\n", "")

        analyze = AnalyzeResume()
        raw_result = analyze.analyze_resume(job=job_des, resume=resume_data)

        cleaned_result = clean_json_with_regex(raw_result)
        try:
            json_data = json.loads(cleaned_result)
            return JsonResponse(json_data)
        except json.JSONDecodeError as e:
            return JsonResponse(
                {
                    "error": f"Failed to parse JSON response: {str(e)}",
                    "raw_response": raw_result,
                    "cleaned_response": cleaned_result,
                },
                status=500,
            )

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


class PrepViewSet(viewsets.ViewSet):
    def list(self, request):
        job = JobResume.objects.last().description
        job_des = job

        resume = JobResume.objects.last().resume.path
        pdf = resume
        extracted_text = extract_pdf_text(pdf)
        resume_data = extracted_text.replace("\n", "")
        analyzer = AnalyzeResume()

        raw_result = analyzer.generate_job_interview_qa(resume_data, job_des)
        print(raw_result)
        cleaned_result = clean_json_with_regex(raw_result)
        try:
            json_data = json.loads(cleaned_result)
            return JsonResponse(json_data)
        except json.JSONDecodeError as e:
            return JsonResponse(
                {
                    "error": f"Failed to parse JSON response: {str(e)}",
                    "raw_response": raw_result,
                    "cleaned_response": cleaned_result,
                },
                status=500,
            )

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
