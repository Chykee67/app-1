from django import forms
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError


class SignupForm(forms.Form):

    username = forms.CharField(
        max_length=32,
        label='Username',
    )
    email = forms.EmailField(
        max_length=64,
        label='Email',
    )
    password1 = forms.CharField(
        min_length=8,
        max_length=32,
        label='Password',
        widget=forms.PasswordInput(),
    )

    password2 = forms.CharField(
        min_length=8,
        max_length=32,
        label='Confirm password',
        widget=forms.PasswordInput(),
        )

    def clean_username(self):
        username = self.cleaned_data['username']
        if User.objects.filter(username=username).exists():
            raise ValidationError('Username already exists')
        return username

    def clean_email(self):
        email = self.cleaned_data['email']
        if User.objects.filter(email=email).exists():
            raise ValidationError('Email already exists')
        return email
    
    def clean_password(self):
        password1 = self.cleaned_data['password1']
        password2 = self.cleaned_data['password2']
        if password1 != password2:
            raise ValidationError('Passwords do not match')
        elif len(password1) < 8:
            raise ValidationError('Password must be at least 8 characters long')
        return password1

    def save(self):
        if not self.clean_username() or not self.clean_email():
            return None
        
        user = User.objects.create_user(
            username=self.cleaned_data['username'],
            email=self.cleaned_data['email'],
            password = self.clean_password(),
            #password=self.cleaned_data['password'],
        )
        return user