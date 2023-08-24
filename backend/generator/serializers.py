from typing import Type

from django.db import transaction
from django.db.models import Model
from rest_framework import serializers

from generator.models import (
    Specialist,
    JobTitle,
    Education,
    Course,
    LanguageLevel,
    TechnologyLevel,
    SpecialistProject, Technology, School, Languages,
)
from project.models import Project, Task
from project.serializers import TaskSerializer, ProjectSerializer


class LanguagesSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="language.name")

    class Meta:
        model = LanguageLevel
        fields = ["name", "level"]


class CourseSerializer(serializers.ModelSerializer):
    name = serializers.CharField(validators=[])

    class Meta:
        model = Course
        fields = ["name"]


class EducationSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="school.name")

    class Meta:
        model = Education
        fields = ["name", "description", "end_date"]


class TechnologySerializer(serializers.ModelSerializer):
    name = serializers.CharField(validators=[])

    class Meta:
        model = Technology
        fields = ["name"]


class TechnologyLevelSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="technology.name")

    class Meta:
        model = TechnologyLevel
        fields = ["name", "level"]


class SpecialistProjectSerializer(serializers.ModelSerializer):
    project = ProjectSerializer()
    tasks = TaskSerializer(many=True)
    technologies = TechnologySerializer(many=True)

    class Meta:
        model = SpecialistProject
        fields = ["project", "tasks", "technologies", "duration", "display_priority"]


class SerializerJobTitle(serializers.ModelSerializer):
    title = serializers.CharField(validators=[])

    class Meta:
        model = JobTitle
        fields = ["title"]


class SpecialistSerializer(serializers.ModelSerializer):
    job_titles = SerializerJobTitle(many=True)
    technologies = TechnologyLevelSerializer(many=True)
    experience = SpecialistProjectSerializer(many=True, source="projects")
    educations = EducationSerializer(many=True)
    skills = TechnologySerializer(many=True)
    courses = CourseSerializer(many=True)
    languages = LanguagesSerializer(many=True)

    class Meta:
        model = Specialist
        fields = [
            "id",
            "name",
            "job_titles",
            "advantages",
            "skills",
            "courses",
            "technologies",
            "educations",
            "languages",
            "experience",
        ]

    @staticmethod
    def get_object(model: Type[Model], data):
        return model.objects.get_or_create(**data)[0]

    def get_objects(self, model: Type[Model], values):
        return [self.get_object(model, v) for v in values]

    def set_many_to_many(self, specialist, field: str, model: Type[Model], values):
        objects = self.get_objects(model, values)
        getattr(specialist, field).set(objects)

    def set_many_to_one(self, specialist, model: Type[Model], values, **relation):
        model.objects.filter(specialist=specialist).delete()
        for v in values:
            relation_data = {field: self.get_object(m, v.pop(field)) for field, m in relation.items()}
            model.objects.create(specialist=specialist, **relation_data, **v)

    def _update_relation(self, instance, data):
        many_to_many = {
            "job_titles": JobTitle,
            "skills": Technology,
            "courses": Course,
        }
        many_to_one = {
            "technologies": (TechnologyLevel, {"technology": Technology}),
            "educations": (Education, {"school": School}),
            "languages": (LanguageLevel, {"language": Languages}),
        }
        for field, model in many_to_many.items():
            values = data.pop(field)
            self.set_many_to_many(instance, field, model, values)

        for field, info, in many_to_one.items():
            model, relation = info
            values = data.pop(field)
            self.set_many_to_one(instance, model, values, **relation)

        SpecialistProject.objects.filter(specialist=instance).delete()
        for project_data in data.get("projects"):
            project = self.get_object(Project, project_data.pop("project"))
            duration = project_data.pop("duration")
            display_priority = project_data.pop("display_priority")
            technologies = project_data.pop("technologies")
            tasks = project_data.pop("tasks")
            sp = SpecialistProject.objects.create(
                specialist=instance,
                project=project,
                duration=duration,
                display_priority=display_priority,
            )
            self.set_many_to_many(sp, "technologies", Technology, technologies)
            self.set_many_to_many(sp, "tasks", Task, tasks)

    def create(self, data):
        with transaction.atomic():
            instance = Specialist.objects.create(name=data.pop("name"), advantages=data.pop("advantages"))
            self._update_relation(instance, data)
        return instance

    def update(self, instance, data):
        with transaction.atomic():
            instance.name = data.pop("name")
            instance.advantages = data.pop("advantages")
            instance.save()

            self._update_relation(instance, data)
        return instance


class SpecialistListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialist
        fields = ["id", "name"]
