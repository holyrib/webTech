from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import TaskList, Task
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator


class UserSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        password = validated_data.get("password")
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        return user

    class Meta:
        model = User
        fields = ('id','username','password')


class TaskListSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=200, required=True)
    user = UserSerializer

    def create(self, validated_data):
        tasklist = TaskList(**validated_data)
        tasklist.save()
        return tasklist

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance


class TaskSerializer(serializers.ModelSerializer):
    task_list = TaskListSerializer

    def create(self, validated_data):
        task = Task(**validated_data)
        task.save()
        return task

    class Meta:
        model = Task
        fields = ('id', 'name', 'created_at', 'due_on', 'status', 'task_list')




