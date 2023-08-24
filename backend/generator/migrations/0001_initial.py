# Generated by Django 4.1 on 2022-09-29 13:02

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("project", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Course",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255, verbose_name="Nazwa")),
            ],
            options={
                "verbose_name": "Kurs",
                "verbose_name_plural": "Kursy",
                "ordering": ["-id"],
            },
        ),
        migrations.CreateModel(
            name="JobTitle",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "title",
                    models.CharField(max_length=255, unique=True, verbose_name="Nazwa"),
                ),
            ],
            options={
                "verbose_name": "Nazwa stanowiska",
                "verbose_name_plural": "Nazwy stanowisk",
                "ordering": ["-id"],
            },
        ),
        migrations.CreateModel(
            name="Languages",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=32, verbose_name="Język")),
            ],
            options={
                "verbose_name": "Język",
                "verbose_name_plural": "Języki",
                "ordering": ["-id"],
            },
        ),
        migrations.CreateModel(
            name="School",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255, verbose_name="Nazwa szkoły")),
            ],
            options={
                "verbose_name": "Szkoła",
                "verbose_name_plural": "Szkoły",
                "ordering": ["-id"],
            },
        ),
        migrations.CreateModel(
            name="Specialist",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255, verbose_name="Imię")),
                (
                    "advantages",
                    django.contrib.postgres.fields.ArrayField(
                        base_field=models.CharField(blank=True, max_length=255),
                        blank=True,
                        default=list,
                        size=None,
                        verbose_name="Zalety",
                    ),
                ),
                (
                    "courses",
                    models.ManyToManyField(
                        blank=True, to="generator.course", verbose_name="Kursy"
                    ),
                ),
                (
                    "job_titles",
                    models.ManyToManyField(
                        to="generator.jobtitle", verbose_name="Nazwa stanowiska"
                    ),
                ),
            ],
            options={
                "verbose_name": "Specjalista",
                "verbose_name_plural": "Specjaliści",
            },
        ),
        migrations.CreateModel(
            name="Technology",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255, verbose_name="Nazwa")),
            ],
            options={
                "verbose_name": "Technologia",
                "verbose_name_plural": "Technologie",
                "ordering": ["-id"],
            },
        ),
        migrations.CreateModel(
            name="TechnologyLevel",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "level",
                    models.PositiveIntegerField(
                        choices=[(1, 1), (2, 2), (3, 3), (4, 4), (5, 5)],
                        verbose_name="Poziom",
                    ),
                ),
                (
                    "specialist",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="technologies",
                        related_query_name="technology",
                        to="generator.specialist",
                    ),
                ),
                (
                    "technology",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="generator.technology",
                        verbose_name="Technologia",
                    ),
                ),
            ],
            options={
                "verbose_name": "Poziom technologii",
                "verbose_name_plural": "Poziomy technologiczne",
            },
        ),
        migrations.CreateModel(
            name="SpecialistProject",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "duration",
                    models.PositiveIntegerField(
                        default=1, verbose_name="Ilość miesięcy"
                    ),
                ),
                (
                    "project",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="project.project",
                        verbose_name="Projekt",
                    ),
                ),
                (
                    "specialist",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="projects",
                        related_query_name="project",
                        to="generator.specialist",
                        verbose_name="Specjalista",
                    ),
                ),
                (
                    "tasks",
                    models.ManyToManyField(
                        blank=True, to="project.task", verbose_name="Zadania"
                    ),
                ),
                (
                    "technologies",
                    models.ManyToManyField(
                        blank=True,
                        to="generator.technology",
                        verbose_name="Technologie Projektowe",
                    ),
                ),
                (
                    "tools",
                    models.ManyToManyField(
                        blank=True, to="project.tool", verbose_name="Narzędzia"
                    ),
                ),
            ],
            options={
                "verbose_name": "Projekt",
                "verbose_name_plural": "Projekty",
            },
        ),
        migrations.AddField(
            model_name="specialist",
            name="skills",
            field=models.ManyToManyField(
                blank=True, to="generator.technology", verbose_name="Umiejętności"
            ),
        ),
        migrations.AddField(
            model_name="specialist",
            name="tools",
            field=models.ManyToManyField(
                blank=True, to="project.tool", verbose_name="Narzędzia"
            ),
        ),
        migrations.CreateModel(
            name="LanguageLevel",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("level", models.CharField(max_length=255, verbose_name="Poziom")),
                (
                    "language",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="generator.languages",
                        verbose_name="Język",
                    ),
                ),
                (
                    "specialist",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="languages",
                        related_query_name="language",
                        to="generator.specialist",
                    ),
                ),
            ],
            options={
                "verbose_name": "Poziom Języka",
                "verbose_name_plural": "Poziomy Języka",
            },
        ),
        migrations.CreateModel(
            name="Education",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("end_date", models.DateField(verbose_name="Data zakończenia")),
                (
                    "description",
                    models.CharField(
                        blank=True,
                        max_length=1024,
                        null=True,
                        verbose_name="Dodatkowe informacje",
                    ),
                ),
                (
                    "school",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="generator.school",
                        verbose_name="Szkoła",
                    ),
                ),
                (
                    "specialist",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="educations",
                        related_query_name="education",
                        to="generator.specialist",
                    ),
                ),
            ],
            options={
                "verbose_name": "Wykształcenie",
                "verbose_name_plural": "Wykształcenie",
                "ordering": ["-id"],
            },
        ),
    ]
