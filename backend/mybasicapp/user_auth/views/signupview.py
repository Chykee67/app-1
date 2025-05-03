from django.contrib.auth.decorators import login_not_required
from django.utils.decorators import method_decorator
from django.views import View
from django.shortcuts import render, redirect
from django.core.exceptions import ValidationError

from user_auth.forms.signupform import SignupForm
from user_account.models import Profile

@method_decorator(login_not_required, name="dispatch")
class SignupView(View):

    def get(self, request):

        return render(request, 'user_auth/signup.html', {
            'form': SignupForm(),
        })
    
    def post(self, request):

        form = SignupForm(request.POST)

        if form.is_valid():
            try:
                user = form.save()
            except ValidationError as e:
                return render(request, 'user_auth/signup.html', {
                    'form': SignupForm(),
                    'error_message': e.message,
                })
            else:
                if user:
                    profile = Profile(user=user)
                    profile.save()
                    return redirect('user_auth:signin')
                else:
                    return render(request, 'user_auth/signup.html', {
                        'form': SignupForm(),
                        'error_message': form.errors,
                    })
        else:
            return render(request, 'user_auth/signup.html', {
                'form': SignupForm(),
                'error_message': form.errors,
            })