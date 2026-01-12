import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from django.utils import timezone

from .models import Task 

class TaskNode(DjangoObjectType):
    class Meta:
        model = Task
        filter_fields = {
            'title': ['exact', 'icontains'],
            'description': ['icontains'],
            'due': ['exact', 'gte', 'lte'],
            'priority': ['exact'],
            'status': ['exact'],
            'created': ['gte', 'lte'],
            'created_by__username': ['exact'],
        }
        interfaces = (graphene.relay.Node,)



class CreateTask(graphene.relay.ClientIDMutation):

    task = graphene.Field(TaskNode)

    class Input:
        title = graphene.String(required=True)
        description = graphene.String(required=True)
        due = graphene.DateTime(required=True)
        priority = graphene.String(default_value='normal')

    def mutate_and_get_payload(root, info, **input):
        user = info.context.user

        if not user.is_authenticated:
            raise Exception("Authentication credentials were not provided")
        try:
            task = Task.objects.get(title=input.get("title"), created_by=user)
            raise Exception("Task Already Exists")
        except Task.DoesNotExist:
            task = Task(
                title=input.get('title'),
                description=input.get('description'),
                due=input.get('due'),
                priority=input.get('priority', 'normal'),
                status='pending',
                created_by=user,
            )
            task.save()

            return CreateTask(task=task)

class DeleteTask(graphene.relay.ClientIDMutation):
    deleted = graphene.String()

    class Input:
        title = graphene.String(required=True)
    
    def mutate_and_get_payload(root, info, **input):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Authentication credentials were not provided")
        try:
            task = Task.objects.get(title=input.get('title'), created_by=user)
            task.delete()
            return DeleteTask(deleted="Task deleted successfully")
        except Task.DoesNotExist:
            raise Exception("Task not found")
        
class UpdateTaskStatus(graphene.relay.ClientIDMutation):
    message = graphene.String()

    class Input:
        title = graphene.String(required=True)
        status = graphene.String(required=True)

    def mutate_and_get_payload(root, info, **input):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Authentication credentials were not provided")
        try:
            task = Task.objects.get(title=input.get('title'), created_by=user)
            task.status = input.get('status')
            task.save()
            return UpdateTaskStatus(message="Task status updated successfully")
        except Task.DoesNotExist:
            raise Exception("Task not found")


class Query(graphene.ObjectType):
    all_tasks = DjangoFilterConnectionField(TaskNode)

    def resolve_all_tasks(self, info, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Please provide valid credentials!")
        return Task.objects.filter(created_by=user, status="pending")

    
class Mutation(graphene.ObjectType):
    create_task = CreateTask.Field()
    delete_task = DeleteTask.Field()
    update_task_status = UpdateTaskStatus.Field()