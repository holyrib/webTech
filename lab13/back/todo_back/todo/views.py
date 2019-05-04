import json
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
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


class UserSignUp(APIView):
    # Allow any user (authenticated or not) to access this url
    permission_classes = (AllowAny,)

    def post(self, request):
        user = request.data
        serializer = UserSerializer(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
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
        return TaskList.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        return serializer.save(owner=self.request.user)



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
        return serializer.save(task_list=self.get_object(), owner=self.request.user)


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


# @csrf_exempt
# def tasklist_list(request):
#     print(request)
#     print('popopopo')
#     if request.method == 'GET':
#         tasklists = TaskList.objects.all()
#         serializer = TaskListSerializer(tasklists, many=True)
#         return JsonResponse(serializer.data, safe=False, status=200)
#
#     elif request.method == 'POST':
#         data = JSONParser().parse(request)
#         serializer = TaskListSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data, status=201)
#         return JsonResponse(serializer.errors)
#
#
# @csrf_exempt
# def tasklist_detail(request, pk):
#     try:
#         tasklist = TaskList.objects.get(id=pk)
#     except TaskList.DoesNotExist as e:
#         return JsonResponse({'error': str(e)})
#
#     if request.method == 'GET':
#         serializer = TaskListSerializer(tasklist)
#         return JsonResponse(serializer.data, status=200)
#     elif request.method == 'PUT':
#         data = json.loads(request.body)
#         serializer = TaskListSerializer(instance=tasklist, data=data)
#         if serializer.is_valid():
#             serializer.save() # update function in serializer class
#             return JsonResponse(serializer.data, status=200)
#         return JsonResponse(serializer.errors)
#     elif request.method == 'DELETE':
#         tasklist.delete()
#         return JsonResponse({}, status=204)
#
# @csrf_exempt
# def tasklist_task_list(request, pk):
#     if request.method == 'GET':
#         try:
#             tasklist = TaskList.objects.get(id=pk)
#         except TaskList.DoesNotExist as e:
#             return JsonResponse({'error': str(e)})
#
#         tasks = tasklist.task_set.all()
#         serializer = TaskSerializer(tasks, many=True)
#         return JsonResponse(serializer.data, safe=False)
#
#     elif request.method == 'POST':
#         data = json.loads(request.body)
#         serializer = TaskSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data, status=201)
#         return JsonResponse(serializer.errors)
# @csrf_exempt
# def task_detail(request, pk):
#     try:
#         task = Task.objects.get(id=pk)
#     except Task.DoesNotExist as e:
#         return JsonResponse({'error': str(e)})
#
#     if request.method == 'GET':
#         serializer = TaskSerializer(task)
#         return JsonResponse(serializer.data, status=200)
#     elif request.method == 'PUT':
#         data = json.loads(request.body)
#         serializer = TaskSerializer(instance=task, data=data)
#         if serializer.is_valid():# update function in serializer class
#             return JsonResponse(serializer.data, status=200)
#         return JsonResponse(serializer.errors)
#     elif request.method == 'DELETE':
#         task.delete()
#         return JsonResponse({}, status=204)
#
#
