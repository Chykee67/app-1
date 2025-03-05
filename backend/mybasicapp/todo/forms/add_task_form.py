from django import forms
from todo.models import Task


class AddTaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ['title', 'description', 'due', 'priority'] #category in future updates
        widgets = {
            'due': forms.DateTimeInput(attrs={'type': 'datetime'}),
            'description': forms.Textarea(attrs={'rows': 3}),
        }