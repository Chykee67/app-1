from .all_tasks import AllTasksView, PendingTasksView, CompletedTasksView

from django.shortcuts import get_object_or_404


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.authentication import SessionAuthentication

from slugify import slugify


from todo.models import Task
from todo.serializers import TaskSerializer
from todo.permissions import IsOwner

class CreateTaskView(APIView):

    authentication_classes = [SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get(self, request):
        msg = f"""
            "title": '',
            "description": '',
            "due": '',
            "priority": "Normal",
            "status": "Pending"
        """
        return Response(f'send a post request with data as in {msg} to create a new task', status=status.HTTP_200_OK)

    def post(self, request):
        serializer = TaskSerializer(data=request.data)

        if serializer.is_valid():
            #serializer.initial_data['title'] = slugify(serializer.initial_data['title'], lowercase=False)
            serializer.save(created_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class RetrieveTaskView(APIView):

    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get(self, request, task_title):

        task = get_object_or_404(Task, pk=task_title)

        serializer = TaskSerializer(task)

        return Response(serializer.data, status=status.HTTP_200_OK)
    

class UpdateTaskView(APIView):

    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def put(self, request, task_title):
        
        task = get_object_or_404(Task, pk=task_title)

        serializer = TaskSerializer(task, data=request.data)
    

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class QueryParamView(APIView):

    def get(self, request):
        if request.META.get('QUERY_STRING'):
            qstring = request.META.get('QUERY_STRING')
            return Response(f'The query parameter is {qstring}')
        else:
            return Response(request.META)
        

class DeleteTaskView(APIView):

    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def delete(self, request, task_title):
        
        task = get_object_or_404(Task, pk=task_title)
        task.delete()
        
        if task:
            return Response(status=status.HTTP_204_NO_CONTENT)