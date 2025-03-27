from todo.models import Task, PRIORITY_CHOICES, STATUS_CHOICES
from rest_framework import serializers


class TaskSerializer(serializers.ModelSerializer):

    #created_by = serializers.ReadOnlyField(source='created_by.username')
    
    priority = serializers.ChoiceField(choices=PRIORITY_CHOICES)
    status = serializers.ChoiceField(choices=STATUS_CHOICES)

    class Meta:
        model = Task
        fields = ['title', 'description', 'due', 'priority', 'status', 'created']