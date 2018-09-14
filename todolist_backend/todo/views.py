from django.shortcuts import render
from django.http import HttpResponse, Http404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from models import Task
from serializers import TaskSerializer
from rest_framework.request import Request


def index(request):
    return render(request, 'index.html')


class TasksBox(APIView):
    parser_classes = (JSONParser,)

    def get(self, request):
        try:
            tasks = Task.objects.all()
            print(tasks)
        except Exception:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.DATA
        content = data["content"]
        complete = data["complete"]
        expire_time = data['expire_time']
        task = Task(content=content, complete=complete, expire_time=expire_time)
        task.save()
        result = {
            'id': task.id,
        }
        return Response(result, content_type="application/json", status=status.HTTP_201_CREATED)

    def delete(self, request):
        data = request.DATA
        id = data["id"]
        try:
            task = Task.objects.get(id=id)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_404_NOT_FOUND)
        task.delete()
        return Response(status=status.HTTP_202_ACCEPTED)

    def put(self, request):
        data = request.DATA
        id = data["id"]
        try:
            task = Task.objects.get(id=id)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_404_NOT_FOUND)
        task.content = data.get("content", task.content)
        task.complete = data.get("complete", task.complete)
        task.expire_time = data.get("expire_time", task.expire_time)
        task.save()
        return Response(status=status.HTTP_202_ACCEPTED)
