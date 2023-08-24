from django.contrib.postgres.fields import ArrayField
from django.db import models
from project.models import Task, Project


class JobTitle(models.Model):
    title = models.CharField(unique=True, max_length=255, verbose_name="Nazwa")

    class Meta:
        ordering = ['-id']
        verbose_name = "Nazwa stanowiska"
        verbose_name_plural = "Nazwy stanowisk"

    def __str__(self):
        return self.title


class Technology(models.Model):
    name = models.CharField(unique=True, max_length=255, verbose_name="Nazwa")

    class Meta:
        ordering = ['-id']
        verbose_name = "Technologia"
        verbose_name_plural = "Technologie"

    def __str__(self):
        return self.name


class Course(models.Model):
    name = models.CharField(unique=True, max_length=255, verbose_name="Nazwa")

    class Meta:
        ordering = ['-id']
        verbose_name = "Kurs"
        verbose_name_plural = "Kursy"

    def __str__(self):
        return self.name


class Specialist(models.Model):
    job_titles = models.ManyToManyField(JobTitle, verbose_name="Nazwa stanowiska")
    name = models.CharField(max_length=255, verbose_name="Imię")
    advantages = ArrayField(
        models.CharField(max_length=255, blank=True),
        default=list,
        blank=True,
        verbose_name="Zalety",
    )
    skills = models.ManyToManyField(Technology, blank=True, verbose_name="Dodatkowe umiejętności")
    courses = models.ManyToManyField(Course, blank=True, verbose_name="Kursy")

    class Meta:
        verbose_name = "Specjalista"
        verbose_name_plural = "Specjaliści"

    def __str__(self):
        return self.name


class SpecialistProject(models.Model):
    specialist = models.ForeignKey(
        Specialist,
        on_delete=models.CASCADE,
        related_name="projects",
        related_query_name="project",
        verbose_name="Specjalista"
    )
    project = models.ForeignKey(Project, on_delete=models.CASCADE, verbose_name="Projekt")
    tasks = models.ManyToManyField(Task, blank=True, verbose_name="Zadania")
    technologies = models.ManyToManyField(
        Technology,
        blank=True,
        verbose_name="Technologie Projektowe",
    )
    duration = models.PositiveIntegerField(default=1, verbose_name="Ilość miesięcy")
    display_priority = models.FloatField(default=0, verbose_name="Priorytet wyświetlania")

    class Meta:
        verbose_name = "Projekt"
        verbose_name_plural = "Projekty"
        ordering = ["-display_priority"]

    def __str__(self):
        return f"{self.specialist} {self.project}"


class School(models.Model):
    name = models.CharField(max_length=255, verbose_name="Nazwa szkoły")

    class Meta:
        ordering = ['-id']
        verbose_name = "Szkoła"
        verbose_name_plural = "Szkoły"

    def __str__(self):
        return self.name


class Languages(models.Model):
    name = models.CharField(max_length=32, verbose_name="Język")

    class Meta:
        ordering = ['-id']
        verbose_name = "Język"
        verbose_name_plural = "Języki"

    def __str__(self):
        return self.name


technology_levels = [(level, level) for level in range(1, 6)]


class TechnologyLevel(models.Model):
    specialist = models.ForeignKey(
        Specialist,
        on_delete=models.CASCADE,
        related_name="technologies",
        related_query_name="technology"
    )
    technology = models.ForeignKey(Technology, on_delete=models.CASCADE, verbose_name="Technologia")
    level = models.PositiveIntegerField(choices=technology_levels, verbose_name="Poziom")

    class Meta:
        verbose_name = "Poziom technologii"
        verbose_name_plural = "Poziomy technologiczne"

    def __str__(self):
        return f"{self.technology}: {self.level}"


class LanguageLevel(models.Model):
    specialist = models.ForeignKey(
        Specialist,
        on_delete=models.CASCADE,
        related_name="languages",
        related_query_name="language"
    )
    language = models.ForeignKey(Languages, on_delete=models.CASCADE, verbose_name="Język")
    level = models.CharField(max_length=255, verbose_name="Poziom")

    class Meta:
        verbose_name = "Poziom Języka"
        verbose_name_plural = "Poziomy Języka"

    def __str__(self):
        return f"{self.language}: {self.level}"


class Education(models.Model):
    specialist = models.ForeignKey(
        Specialist,
        on_delete=models.CASCADE,
        related_name="educations",
        related_query_name="education",
    )
    school = models.ForeignKey(School, on_delete=models.CASCADE, verbose_name="Szkoła")
    end_date = models.CharField(max_length=32, blank=True, verbose_name="Data zakończenia")
    description = models.CharField(max_length=1024, blank=True, null=True, verbose_name="Dodatkowe informacje")

    class Meta:
        ordering = ['-id']
        verbose_name = "Wykształcenie"
        verbose_name_plural = "Wykształcenie"

    def __str__(self):
        return str(self.school)
