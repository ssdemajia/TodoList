from rest_framework import serializers
from models import Task


class TaskSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    content = serializers.CharField(required=True)
    complete = serializers.BooleanField()
    expire_time = serializers.IntegerField()

    def create(self, data):
        return Task.objects.create(**data)

    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.content = validated_data.get('content', instance.content)
        instance.complete = validated_data.get('complete', instance.complete)
        instance.expire_time = validated_data.get('expire_time', instance.expire_time)
        instance.save()
        return instance
