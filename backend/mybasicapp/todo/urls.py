from django.urls import path
from .views import AllTasksView, PendingTasksView, CompletedTasksView
from .views import CreateTaskView, RetrieveTaskView, QueryParamView
from .views import UpdateTaskView
from .views import DeleteTaskView

app_name = 'todo'

urlpatterns = [
    path('', AllTasksView.as_view(), name='view_all_tasks'),
    path('pending/', PendingTasksView.as_view(), name='view_pending_tasks'),
    path('completed/', CompletedTasksView.as_view(), name='view_completed_tasks'),
    path('create_task/', CreateTaskView.as_view(), name='create_task'),
    path('query_param/', QueryParamView.as_view(), name='query_param'),
    path('task/<slug:task_title>/detail/', RetrieveTaskView.as_view(), name='retrieve_task'),
    path('task/<slug:task_title>/update/', UpdateTaskView.as_view(), name='update_task'),
    path('task/<slug:task_title>/delete/', DeleteTaskView.as_view(), name='delete_task'),
]