from django import forms
from django.contrib import admin
from django.contrib.auth.models import Group
from generator.models import (
    JobTitle,
    Course,
    Specialist,
    Education,
    Languages,
    LanguageLevel,
    TechnologyLevel,
    SpecialistProject,
    Technology, School,
)


class SpecialistAdminForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["advantages"].delimiter = "\n"

    class Meta:
        model = Specialist
        widgets = {"advantages": forms.Textarea}
        exclude = []


class JobTitleAdmin(admin.ModelAdmin):
    search_fields = ["title"]


class SchoolAdmin(admin.ModelAdmin):
    search_fields = ["name"]


class TechnologyAdmin(admin.ModelAdmin):
    search_fields = ["name"]


class CourseAdmin(admin.ModelAdmin):
    search_fields = ["name"]


class LanguagesAdmin(admin.ModelAdmin):
    search_fields = ["name"]


class SpecialistProjectInLine(admin.TabularInline):
    model = SpecialistProject
    autocomplete_fields = ["project", "tasks", "technologies"]
    extra = 1


class TechnologyLevelInLine(admin.TabularInline):
    model = TechnologyLevel
    autocomplete_fields = ["technology"]
    extra = 1


class LanguageLevelInLine(admin.TabularInline):
    model = LanguageLevel
    autocomplete_fields = ["language"]
    extra = 1


class EducationInLine(admin.TabularInline):
    model = Education
    autocomplete_fields = ["school"]
    extra = 1


class SpecialistAdmin(admin.ModelAdmin):
    form = SpecialistAdminForm
    inlines = [TechnologyLevelInLine, EducationInLine, LanguageLevelInLine, SpecialistProjectInLine]
    autocomplete_fields = ("job_titles", "skills", "courses")


admin.site.register(Specialist, SpecialistAdmin)
admin.site.register(JobTitle, JobTitleAdmin)
admin.site.register(Technology, TechnologyAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(School, SchoolAdmin)
admin.site.register(Languages, LanguagesAdmin)

admin.site.unregister(Group)
