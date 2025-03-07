from django.urls import path
from .views import AllTasksView, PendingTasksView, CompletedTasksView
from .views import AddTaskView
from .views import TaskDetailView
from .views import EditTaskView, MarkTaskCompleteView, MarkTaskPendingView
from .views import DeleteTaskView, InitiateDeleteTaskView, ConfirmDeleteTaskView

app_name = 'todo'

urlpatterns = [
    path('', AllTasksView.as_view(), name='view_all_tasks'),
    path('pending/', PendingTasksView.as_view(), name='view_pending_tasks'),
    path('completed/', CompletedTasksView.as_view(), name='view_completed_tasks'),
    path('add_task/', AddTaskView.as_view(), name='add_task'),
    path('task/<int:pk>/', TaskDetailView.as_view(), name='task_detail'),
    path('task/<int:task_id>/edit/', EditTaskView.as_view(), name='edit_task'),
    path('task/<int:task_id>/mark_complete/', MarkTaskCompleteView.as_view(), name='mark_task_complete'),
    path('task/<int:task_id>/mark_pending/', MarkTaskPendingView.as_view(), name='mark_task_pending'),
    path('task/<int:task_id>/initiate_delete/', InitiateDeleteTaskView.as_view(), name='initiate_delete_task'),
    path('task/<int:task_id>/confirm_delete/', ConfirmDeleteTaskView.as_view(), name='confirm_delete_task'),
    path('task/<int:task_id>/delete/', DeleteTaskView.as_view(), name='delete_task'),
]