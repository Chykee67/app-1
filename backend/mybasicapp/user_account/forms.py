from django import forms
from .models import Profile

class UploadPhotoForm(forms.ModelForm):
    """
    Form for uploading a profile photo
    """
    class Meta:
        model = Profile
        fields = ['photo']
        widgets = {
            'photo': forms.ClearableFileInput(attrs={'multiple': False}),
        }
        labels = {
            'photo': 'Upload Photo',
        }