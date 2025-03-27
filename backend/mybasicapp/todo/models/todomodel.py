from django.db import models
from django.contrib.auth.models import User


PRIORITY_CHOICES = (
    ('Low', 'Low'),
    ('Normal', 'Normal'),
    ('High', 'High')
)

STATUS_CHOICES = (
    ('Pending', 'Pending'),
    ('Completed', 'Completed')
)

class Task(models.Model):

    title = models.SlugField(
        max_length=200,
        unique=True,
        allow_unicode=True,
        primary_key=True
    )

    description = models.TextField()
    
    due = models.DateTimeField(
        help_text='Format: YYYY-MM-DD HH:MM'
    )
    
    priority = models.CharField(
        max_length=6,
        choices=PRIORITY_CHOICES,
        default='Normal',
    )
    
    #category = models.CharField(max_length=50) #in future with ability to create userdefined categories
    
    status = models.CharField(
        max_length=9,
        choices=STATUS_CHOICES,
        default='Pending',
    )
    
    created = models.DateTimeField(auto_now_add=True)
    
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    #created_by = models.ForeignKey('auth.User', related_name='tasks', on_delete=models.CASCADE)

    class Meta:
        ordering = ['due']


    def __str__(self):
        return f"{self.title.title()} - {self.due.strftime("%d-%m-%Y %H:%M")} - {self.priority.title()} priority - {self.status.title()}"