from django.views import View
from django.utils import timezone
from datetime import timedelta
from todo.models import Task
from django.shortcuts import render

class HomepageView(View):

    def get(self, request):
        latest_tasks = Task.objects.filter(created_by=request.user.id).order_by('-created')
        recent_tasks = []

        for task in latest_tasks:
            if task.created >= timezone.now() - timedelta(days=7):
                recent_tasks.append(task)

        return render(request, 'mybasicapp/home.html', {'recent_tasks': recent_tasks})