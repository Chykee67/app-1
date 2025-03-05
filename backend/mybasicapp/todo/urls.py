from django.urls import path
from .views import AllTasksView, AddTaskView

app_name = 'todo'

urlpatterns = [
    path('', AllTasksView.as_view(), name='view_all_tasks'),
    path('add_task/', AddTaskView.as_view(), name='add_task'),
]