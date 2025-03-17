from todo.models import Task, PRIORITY_CHOICES, STATUS_CHOICES
from rest_framework import serializers


class TaskSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=200)
    description = serializers.CharField(style={'base_template': 'textarea.html'})
    due = serializers.DateTimeField()
    priority = serializers.ChoiceField(choices=PRIORITY_CHOICES, default='Normal')
    status = serializers.ChoiceField(choices=STATUS_CHOICES, default='Pending')
    created = serializers.DateTimeField(read_only=True)
    created_by = serializers.PrimaryKeyRelatedField(read_only=True)

    def create(self, validated_data):
        return Task.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.due = validated_data.get('due', instance.due)
        instance.priority = validated_data.get('priority', instance.priority)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance