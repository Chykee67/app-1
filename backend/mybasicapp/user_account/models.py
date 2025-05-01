from django.db import models
from django.contrib.auth.models import User
from django.core.files.storage import FileSystemStorage

fs = FileSystemStorage(location="/media/photos")

class AppUser(User):
    photo = models.ImageField(storage=fs)