from rest_framework import serializers

from project.models import Task, Project


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            "name",
            "description",
            "start_date",
            "end_date",
            "specialist_number",
            "market_branch",
        ]


class SubTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["description"]


class TaskSerializer(serializers.ModelSerializer):
    sub_tasks = SubTaskSerializer(many=True, read_only=True)

    class Meta:
        model = Task
        fields = ["description", "sub_tasks"]
