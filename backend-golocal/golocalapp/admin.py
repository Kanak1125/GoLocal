from django.contrib import admin
from .models import User, Post, Comment, Like, InteractionCount, Transportation

from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from golocalapp.models import ExtendUser
# Register your models here.

# Define an inline admin descriptor for Employee model
# which acts a bit like a singleton
class ExtendUserInline(admin.StackedInline):
    model = ExtendUser
    can_delete = False
    verbose_name_plural = "ExtendUser"


# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = [ExtendUserInline]


# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)

admin.site.register(Post)
admin.site.register(Like)
admin.site.register(Comment)
admin.site.register(InteractionCount)
admin.site.register(Transportation)