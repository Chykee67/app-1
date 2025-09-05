from django.db import models
from django.contrib.auth.models import AbstractUser

class AppUser(AbstractUser):
    email = models.EmailField(unique=True, blank=False, null=False)

class Profile(models.Model):
    user = models.OneToOneField(AppUser, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.user.username
