from django.db import models


class Project(models.Model):
    name = models.CharField(max_length=255, verbose_name="Nazwa")
    description = models.TextField(blank=True, null=True, max_length=1024, verbose_name="Opis")
    start_date = models.DateField(blank=True, null=True, verbose_name="Data rozpoczęcia")
    end_date = models.DateField(blank=True, null=True, verbose_name="Data zakńczenia")
    specialist_number = models.IntegerField(blank=True, null=True, verbose_name="Ilość specialistów")
    market_branch = models.TextField(verbose_name="Gałąź rynku", blank=True)

    class Meta:
        ordering = ['-id']
        verbose_name = "Projekt"
        verbose_name_plural = "Projekty"

    def __str__(self):
        return self.name


class Task(models.Model):
    description = models.TextField(max_length=1024)
    parent_task = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        related_name="sub_tasks",
        related_query_name="sub_task",
        blank=True,
        null=True,
    )

    class Meta:
        ordering = ['-id']
        verbose_name = "Zadanie"
        verbose_name_plural = "Zadania"

    def __str__(self):
        return self.description
