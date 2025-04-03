from django.contrib import admin

from .models import JobDescription, Resume

# Register your models here.
admin.site.register(Resume)

admin.site.register(JobDescription)
