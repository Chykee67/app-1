from django.shortcuts import render, redirect
from django.views import View
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_not_required
from django.contrib.auth import authenticate, login
from django.http import HttpResponse

from user_auth.forms import SigninForm

@method_decorator(login_not_required, name='dispatch')
class SigninView(View):

    def get(self, request):

        return render(request, 'user_auth/signin.html', {
            'form': SigninForm(),
        })

    def post(self, request):

        form = SigninForm(request.POST)

        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(username=username, password=password)

            if user is not None:
                login(request, user)
                return redirect('/')
            else:
                return render(request, 'user_auth/signin.html', {'error_message': 'Invalid credentials',
                                                                 'form': SigninForm()})
        else:
            return render(request, 'user_auth/signin.html', {'error_message': form.errors})