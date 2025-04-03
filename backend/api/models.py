from django.db import models


# Create your models here.
class Resume(models.Model):
    name = models.CharField(max_length=200)
    email_address = models.CharField(
        max_length=255, default="example@example.com"
    )
    resume = models.FileField(upload_to="resume")

    def __str__(self):
        return self.email_address


class JobDescription(models.Model):
    company_name = models.CharField(max_length=300)
    title = models.CharField(max_length=300)
    description = models.TextField()

    def __str__(self):
        return self.title
