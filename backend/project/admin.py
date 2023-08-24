from django.contrib import admin
from project.models import Project, Task


class ProjectAdmin(admin.ModelAdmin):
    search_fields = ["name", "description"]


class SubTaskInLine(admin.TabularInline):
    verbose_name = "Sub Task"
    model = Task
    extra = 1


class TaskAdmin(admin.ModelAdmin):
    exclude = ["parent_task"]
    search_fields = ["description"]
    inlines = [SubTaskInLine]


admin.site.register(Project, ProjectAdmin)
admin.site.register(Task, TaskAdmin)
