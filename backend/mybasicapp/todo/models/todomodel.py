from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):

    title = models.CharField(max_length=200)

    description = models.TextField()
    
    due = models.DateTimeField(
        help_text='Format: YYYY-MM-DD HH:MM'
    )
    
    priority = models.CharField(
        max_length=6,
        choices=(
            ('Low', 'Low'),
            ('Normal', 'Normal'),
            ('High', 'High')
        ),
        default='Normal',
    )
    
    #category = models.CharField(max_length=50) #in future with ability to create userdefined categories
    
    status = models.CharField(
        max_length=9,
        choices=(
            ('Pending', 'Pending'),
            ('Completed', 'Completed')
        ),
        default='Pending',
    )
    
    created = models.DateTimeField(auto_now_add=True)
    
    created_by = models.ForeignKey(User, on_delete=models.CASCADE) #can i use 'auth.User' instead of User?
    # created_by = models.ForeignKey('auth.User', on_delete=models.CASCADE) #can i use 'auth.User' instead of User?

    class Meta:
        ordering = ['due']


    def __str__(self):
        return f"{self.title.title()} - {self.due.strftime("%d-%m-%Y %H:%M")} - {self.priority.title()} priority - {self.status.title()}"