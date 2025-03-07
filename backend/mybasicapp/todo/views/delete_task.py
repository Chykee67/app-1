from django.shortcuts import get_object_or_404, redirect, render
from django.views import View
from todo.models import Task


class DeleteTaskView(View):

    def get(self, request, task_id):
        
        task = get_object_or_404(Task, pk=task_id)
        task.delete()
        
        return redirect('todo:view_all_tasks')


class InitiateDeleteTaskView(View):

    def get(self, request, task_id):

        return redirect('todo:confirm_delete_task', task_id=task_id)
    
class ConfirmDeleteTaskView(View):

    def get(self, request, task_id):

        task = get_object_or_404(Task, pk=task_id)

        return render(request, 'todo/confirm_delete_task.html', {
            'task': task
        })