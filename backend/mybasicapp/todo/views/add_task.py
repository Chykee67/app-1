from django.shortcuts import render, redirect
from django.views import View
from todo.forms import AddTaskForm
from todo.models import Task
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

@method_decorator(login_required, name='dispatch')
class AddTaskView(View):
    def get(self, request):
        form = AddTaskForm()
        return render(request, 'todo/add_task.html', {'form': form})

    def post(self, request):
        form = AddTaskForm(request.POST)
        if form.is_valid():
            title = form.cleaned_data['title']
            description = form.cleaned_data['description']
            due = form.cleaned_data['due']
            priority = form.cleaned_data['priority']
            task = Task(title=title, description=description, due=due, priority=priority, created_by=request.user)
            task.save()
            return redirect('todo:view_all_tasks')
        else:
            return render(request, 'todo/add_task.html', {
                'form': AddTaskForm(),
                'error_message': 'Invalid data. Please try again.'
            })