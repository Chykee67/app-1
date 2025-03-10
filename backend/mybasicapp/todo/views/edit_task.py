from django.shortcuts import render, get_object_or_404, redirect
from django.views import View
from todo.models import Task
from todo.forms import AddTaskForm
from django.contrib.auth.mixins import LoginRequiredMixin

class EditTaskView(LoginRequiredMixin, View):
    
    def get(self, request, task_id):

        task = get_object_or_404(Task, pk=task_id)

        form = AddTaskForm(instance=task)
        
        return render(request, 'todo/edit_task.html', {
            'form': form,
            'task': task
        })
    
    def post(self, request, task_id):
        
        task = get_object_or_404(Task, pk=task_id)

        form = AddTaskForm(request.POST, instance=task)
        
        if form.is_valid():
            form.save()
            return redirect('todo:task_detail', pk=task_id)
        
        return render(request, 'todo/edit_task.html', {
            'form': AddTaskForm(instance=task),
            'error_message': form.errors,
            'task': task
        })
    
class MarkTaskCompleteView(LoginRequiredMixin, View):
    
    def get(self, request, task_id):
        
        task = get_object_or_404(Task, pk=task_id)
        task.status = 'Completed'
        task.save()
        
        return redirect('todo:task_detail', pk=task_id)
    
class MarkTaskPendingView(LoginRequiredMixin, View):
    
    def get(self, request, task_id):
        
        task = get_object_or_404(Task, pk=task_id)
        task.status = 'Pending'
        task.save()
        
        return redirect('todo:task_detail', pk=task_id)