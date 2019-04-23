from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import TaskList, Task


class TaskListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskList
        fields = ('id', 'name')


class TaskSerializer(serializers.ModelSerializer):
    tasklist_id = serializers.PrimaryKeyRelatedField(queryset=TaskList.objects.all(), source='tasklist.id')
    class Meta:
        model = Task
        fields = ('id', 'name', 'created_at', 'due_on', 'status', 'tasklist_id')



