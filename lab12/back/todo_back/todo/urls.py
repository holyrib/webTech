from django.urls import path
from . import views

urlpatterns = [
	path('tasklist/', views.tasklist_list),
	path('tasklist/<int:pk>/', views.tasklist_detail),
	path('tasklist/<int:pk>/tasks/', views.tasklist_task_list),
	path('tasks/<int:pk>/', views.task_detail)
]