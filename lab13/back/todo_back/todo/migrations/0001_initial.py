# Generated by Django 2.2 on 2019-04-14 21:18

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TaskList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(default=datetime.datetime.now, editable=False)),
                ('due_on', models.DateField()),
                ('status', models.BooleanField(default=False)),
                ('task_list', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todo.TaskList')),
            ],
        ),
    ]
