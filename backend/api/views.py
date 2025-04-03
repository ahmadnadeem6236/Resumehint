# import viewsets
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

# import models
from .models import JobDescription, Resume

# import local data
from .serializers import JobDescriptionSerializer, ResumeSerializer

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


@api_view(["GET"])
def get_resume(request):
    resume = Resume.objects.first()
    # serializer = ResumeSerializer(resume)
    # data = serializer.data
    pdf = resume.resume.path
    extracted_text = extract_pdf_text(pdf)
    return Response({"text": extracted_text.replace("\n", "")})
