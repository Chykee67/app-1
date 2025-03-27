from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from rest_framework.authentication import SessionAuthentication

from todo.models import Task
from todo.serializers import TaskSerializer
from todo.permissions import IsOwner

    
class AllTasksView(APIView):

    permission_classes = [permissions.IsAuthenticated, IsOwner]
    
    def get(self, request):
        print(request.user)
        tasks = Task.objects.filter(created_by=request.user)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    
    
    
class PendingTasksView(APIView):
    def get(self, request):
        tasks = Task.objects.filter(created_by=request.user, status='Pending')
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    
class CompletedTasksView(APIView):
    def get(self, request):
        tasks = Task.objects.filter(created_by=request.user, status='Completed')
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    
    permission_classes = [permissions.IsAuthenticated, IsOwner]