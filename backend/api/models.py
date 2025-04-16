from django.db import models


# Create your models here.
class Resume(models.Model):
    resume = models.FileField(upload_to="resume")

    def __str__(self):
        return self.resume


class JobDescription(models.Model):
    description = models.TextField()

    def __str__(self):
        return self.description
