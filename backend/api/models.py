from django.db import models


# Create your models here.
class JobResume(models.Model):
    resume = models.FileField(upload_to="resume")
    description = models.TextField()

    def __str__(self):
        return self.resume
