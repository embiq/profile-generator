from django.contrib.auth.models import User
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "seed command"

    def handle(self, *args, **options):
        admin = {
            "username": "embiq",
            "password": "seedpass",
        }
        if not User.objects.filter(username=admin["username"]).exists():
            User.objects.create_superuser(**admin)
            self.stdout.write('done')
