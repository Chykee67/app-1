from django.contrib.auth.models import User
from rest_framework import serializers
from todo.models import Task

class userSerializer(serializers.ModelSerializer):

    #tasks = serializers.PrimaryKeyRelatedField(many=True, queryset=Task.objects.all())

    #print(tasks) see all tasks in the tasks variable

    class Meta:
        model = User
        fields = ['id', 'username', 'task_set']