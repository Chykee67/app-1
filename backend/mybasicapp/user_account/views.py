from django.views import View
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

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