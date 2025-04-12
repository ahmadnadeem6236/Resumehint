# basic URL Configurations
from django.urls import include, path

# import routers
from rest_framework import routers

# import everything from views
from .views import (
    AnalyzeJobViewSet,
    AnalyzeResumeViewSet,
    CoverLetterViewSet,
    EmailViewSet,
    GetResumeViewSet,
    JobDescriptionViewSet,
    PrepViewSet,
    ResumeViewSet,
)

# define the router
router = routers.DefaultRouter()

# define the router path and viewset to be used
router.register(r"job-description", JobDescriptionViewSet)
router.register(r"resume-upload", ResumeViewSet)
router.register(r"get-resume", GetResumeViewSet, basename="getResume")
router.register(r"get-email", EmailViewSet, basename="email")
router.register(r"get-coverletter", CoverLetterViewSet, basename="cover")
router.register(
    r"analyze-resume", AnalyzeResumeViewSet, basename="analyze-resume"
)
router.register(r"analyze-job", AnalyzeJobViewSet, basename="analyze-job")
router.register(r"prep", PrepViewSet, basename="prep")


# specify URL Path for rest_framework
urlpatterns = [
    path("", include(router.urls)),
]
