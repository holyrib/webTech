from django.db import models
import datetime

# Create your models here.

class TaskList(models.Model):
    name = models.CharField(max_length=255, null=False)

    def __str__(self):
        return self.name

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }


class Task(models.Model):
    name = models.CharField(max_length=255, null=False)
    created_at = models.DateTimeField(default=datetime.datetime.now, editable=False)
    due_on = models.DateField()
    status = models.CharField(max_length=255, null=False)
    task_list = models.ForeignKey(TaskList, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    def to_json_short(self):
        return {
            'id': self.id,
            'name': self.name,
            'status': self.status
        }

    def to_json_long(self):
        return {
            'id': self.id,
            'name': self.name,
            'created_at': self.created_at.__str__(),
            'due_on': self.due_on.__str__(),
            'status': self.status,
            'task_list': self.task_list.to_json(),
        }