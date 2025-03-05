from django.contrib.auth.models import User, UserManager


class appUser(User):

    class Meta:
        proxy = True
        ordering = ["last_name", "first_name"]

    users = UserManager()

    def __str__(self):
        return self.username