from django.views.generic import DetailView
from todo.models import Task


class TaskDetailView(DetailView):
    model = Task
    template_name = 'todo/task_detail.html'
    context_object_name = 'task'

