from django.views.generic import ListView
from todo.models import Task
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

@method_decorator(login_required, name='dispatch')
class AllTasksView(ListView):
    model = Task
    template_name = 'todo/all_tasks.html'
    context_object_name = 'tasks'
    ordering = ['-due']
    paginate_by = 5

    def get_queryset(self):
        return Task.objects.filter(created_by=self.request.user)