from django.db import models
from django.contrib.auth.models import User

# Create your models here.
# class Post(models.Model):
#     id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
#     user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)

class ExtendUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profile_pictures', blank=True, null=True)
    loaction = models.CharField(max_length=500, blank=True, null=True)
class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    description = models.TextField(max_length=1000, blank=True)
    
    def __str__(self):
        return self.description[:10]

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    comment = models.TextField(max_length=1000, blank=True)

    def __str__(self):
        return self.comment[:10]

class Like(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    like = models.BooleanField(default=False)

    def __str__(self):
        return self.like

