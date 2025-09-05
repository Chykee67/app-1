import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

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
            'created_by': ['exact'],
        }
        interfaces = (graphene.relay.Node,)


class Query(graphene.ObjectType):
    task = graphene.relay.Node.Field(TaskNode)
    all_tasks = DjangoFilterConnectionField(TaskNode)

    def resolve_all_tasks(self, info, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            return Task.objects.none()
        return Task.objects.filter(created_by=user)

class CreateTask(graphene.relay.ClientIDMutation):

    task = graphene.Field(TaskNode)

    class Input:
        title = graphene.String(required=True)
        description = graphene.String(required=True)
        due = graphene.DateTime(required=True)
        priority = graphene.String(default_value='Normal')

    def mutate_and_get_payload(root, info, **input):
        user = info.context.user

        if not user.is_authenticated:
            raise Exception("Authentication credentials were not provided")
        
        task = Task(
            title=input.get('title'),
            description=input.get('description'),
            due=input.get('due'),
            priority=input.get('priority', 'Normal'),
            status='Pending',
            created_by=user,
        )
        task.save()

        return CreateTask(task=task)
    
class Mutation(graphene.ObjectType):
    create_task = CreateTask.Field()