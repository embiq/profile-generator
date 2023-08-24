from rest_framework import filters
from rest_framework.mixins import RetrieveModelMixin, ListModelMixin, CreateModelMixin, UpdateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from generator.mixins import SerializerMixin
from generator.models import Specialist, Technology
from generator.serializers import SpecialistSerializer, SpecialistListSerializer, TechnologySerializer


class ProfileView(
    SerializerMixin,
    RetrieveModelMixin,
    ListModelMixin,
    CreateModelMixin,
    UpdateModelMixin,
    GenericViewSet,
):
    permission_classes = (IsAuthenticated,)
    default_serializer_class = SpecialistListSerializer
    serializer_classes = {
        "retrieve": SpecialistSerializer,
        "create": SpecialistSerializer,
        "update": SpecialistSerializer,
    }

    def get_queryset(self):
        return Specialist.objects.prefetch_related(
            "job_titles",
            "technologies",
            "educations",
            "skills",
            "courses",
            "languages",
            "projects__tasks__sub_tasks",
        )


class TechnologyView(GenericViewSet, ListModelMixin):
    permission_classes = (IsAuthenticated,)
    serializer_class = TechnologySerializer
    queryset = Technology.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]
