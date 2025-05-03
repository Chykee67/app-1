from django.views import View
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.http import HttpResponseRedirect
from PIL import Image

from .forms import UploadPhotoForm
from .models import Profile

@method_decorator(login_required, name='dispatch')
class AccountView(View):
    """
    landing page for user_account app
    """
    def get(self, request):
        return render(request, 'user_account/landing_page.html', {
            'all_tasks': request.user.task_set.all(),
            'pending_tasks': request.user.task_set.filter(status='Pending'),
            'completed_tasks': request.user.task_set.filter(status='Completed'),
        })
    

@method_decorator(login_required, name='dispatch')
class UploadPhotoView(View):
    """
    View for uploading a photo
    """
    def get(self, request):
        return render(request, 'user_account/upload_photo.html', {
            'form': UploadPhotoForm(instance=request.user.profile),
        })
    
    def post(self, request):
        form = UploadPhotoForm(request.POST, request.FILES, instance=request.user.profile)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/user_account/')
        else:
            return render(request, 'user_account/upload_photo.html', {
                'form': UploadPhotoForm(instance=request.user.profile),
                'error': form.errors,
            })