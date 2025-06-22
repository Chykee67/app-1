import graphene
import django_filters
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from .models import Task

# Define a filter for the Task model
class TaskFilter(django_filters.FilterSet):
    class Meta:
        model = Task
        fields = {
            'title': ['exact', 'icontains'],
            'description': ['icontains'],
            'due': ['exact', 'gte', 'lte'],
            'priority': ['exact'],
            'status': ['exact'],
            'created': ['gte', 'lte'],
        }

class TaskNode(DjangoObjectType):
    class Meta:
        model = Task
        interfaces = (graphene.relay.Node,)


class Query(graphene.ObjectType):
    task = graphene.relay.Node.Field(TaskNode)
    all_tasks = DjangoFilterConnectionField(TaskNode, filterset_class=TaskFilter)
    
class CreateTask(graphene.relay.ClientIDMutation):

    task = graphene.Field(TaskNode)

    class Input:
        title = graphene.String(required=True)
        description = graphene.String(required=True)
        due = graphene.DateTime(required=True)
        priority = graphene.String(default_value='Normal')
        status = graphene.String(default_value='Pending')

    def mutate_and_get_payload(root, info, **input):
        task = Task(
            title=input.get('title'),
            description=input.get('description'),
            due=input.get('due'),
            priority=input.get('priority', 'Normal'),
            status=input.get('status', 'Pending')
        )
        task.save()

        return CreateTask(task=task)
    
class Mutation(graphene.ObjectType):
    create_task = CreateTask.Field()