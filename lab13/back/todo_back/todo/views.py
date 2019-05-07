import json
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from .models import Task, TaskList
from .serializers import TaskListSerializer, TaskSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated


# @api_view(['POST'])
# @permission_classes((AllowAny, ))
# def UserSignUp(request):
#     serializer = UserSerializer(data=request.data)
#     if serializer.is_valid():
#         user = serializer.save()
#         user.set_password(serializer.data['password'])
#         user.save()
#         token, created = Token.objects.get_or_create(user=user)
#         return Response({'token': token.key})
#
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@permission_classes((AllowAny, ))
class UserSignUp(CreateAPIView):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        return serializer.save()


@api_view(['POST'])
@permission_classes((AllowAny, ))
def UserSignIn(request):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data.get('user')
    token, created = Token.objects.get_or_create(user=user)
    return Response({'token': token.key})


@api_view(['POST'])
def UserSignOut(request):
    request.auth.delete()
    return Response(status=status.HTTP_200_OK)


class tasklist_list(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    # authentication_classes = (JSONWebTokenAuthentication, TokenAuthentication)
    queryset = TaskList.objects.all()
    serializer_class = TaskListSerializer

    def get_queryset(self):
        return TaskList.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class tasklist_detail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JSONWebTokenAuthentication,)
    serializer_class = TaskListSerializer
    lookup_field = 'pk'

    def get_object(self):
        return TaskList.objects.get(id=self.kwargs[self.lookup_field])

    def perform_update(self, serializer):
        serializer.save()

    def perform_destroy(self, instance):
        instance.delete()


class task(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JSONWebTokenAuthentication,)
    serializer_class = TaskSerializer
    lookup_field = 'pk'

    def get_object(self):
        return TaskList.objects.get(id=self.kwargs[self.lookup_field])

    def get_queryset(self):
        return Task.objects.filter(task_list=self.get_object())

    def perform_create(self, serializer):
        return serializer.save(task_list=self.get_object())


class task_detail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JSONWebTokenAuthentication,)
    serializer_class = TaskSerializer
    lookup_field = 'pk'

    def get_object(self):
        return Task.objects.get(id=self.kwargs[self.lookup_field])

    def perform_update(self, serializer):
        serializer.save()

    def perform_destroy(self, instance):
        instance.delete()

