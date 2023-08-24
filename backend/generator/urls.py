from django.urls import path, include
from rest_framework import routers

from generator.views import ProfileView, TechnologyView

app_name = "generator"

router = routers.DefaultRouter()
router.register("profile", ProfileView, "profile")
router.register("technology", TechnologyView, "technology")


urlpatterns = [
    path("", include(router.urls)),
]
