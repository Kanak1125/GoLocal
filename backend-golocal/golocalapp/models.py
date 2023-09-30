from django.db import models
from django.contrib.auth.models import User

# Create your models here.
# class Post(models.Model):
#     id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
#     user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)


class Transportation(models.Model):
    t_name = models.CharField(max_length=500, blank=True, null=True)

    def __str__(self):
        return self.t_name

class ExtendUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    location = models.CharField(max_length=500, blank=True, null=True)


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=500, blank=True, null=True)
    description = models.TextField(max_length=1000, blank=True)
    transportation = models.CharField(max_length=500, blank=True, null=True)
    # transportation = models.ManyToManyField(Transportation, blank=True)
    
    difficulty_choice = [
        ('Easy', 'Easy'),
        ('Moderate', 'Moderate'),
        ('Hard', 'Hard'),  
    ]
    difficulty = models.CharField(max_length=10, choices=difficulty_choice, blank=True,null=True)

    location = models.CharField(max_length=500, blank=True, null=True)
    upload_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    image = models.ImageField(upload_to='post_images/', blank=True)
    
    def __str__(self):
        return  f'User:{self.user} - {self.description[:10]}'

class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True)
    image = models.ImageField(upload_to='post_images/', blank=True)

    def __str__(self):
        return self.image.name

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    comment = models.TextField(max_length=1000, blank=True)

    def __str__(self):
        return f'User:{self.user} - {self.comment[:20]}'

class Like(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    like = models.BooleanField(default=False)

    def __str__(self):
        return f'User:{self.user.username} - {self.post.description[:20]}'
    
class InteractionCount(models.Model):
    #count the number of likes and comments
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True)
    likes = models.IntegerField(default=0)
    comments = models.IntegerField(default=0)
    average = models.IntegerField(default=0)

    def __str__(self):
        return f'Average: {self.average} - {self.post.description[:20]}'
    
