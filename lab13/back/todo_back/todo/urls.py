from django.urls import path
from . import views
from .views import UserSignUp
from .views import tasklist_list, tasklist_detail, task, task_detail
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
	path('tasklist/', tasklist_list.as_view()),
	path('tasklist/<int:pk>/', tasklist_detail.as_view()),
	path('tasklist/<int:pk>/tasks/', task.as_view()),
	path('tasks/<int:pk>/', task_detail.as_view()),
	path('user/signup/', UserSignUp.as_view()),
	path('user/signin/',  obtain_jwt_token),
	path('user/signout/', views.UserSignOut),
]