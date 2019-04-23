from django.urls import path
from . import views

urlpatterns = [
	path('tasklist/', views.tasklist),
	path('tasklist/<int:pk>/', views.tasklist_detail),
	path('tasklist/<int:pk>/tasks/', views.task),
	path('tasks/<int:pk>/', views.task_detail)
]