from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView
from . models import Post, Comment, Like, ExtendUser, PostImage

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class ExtendUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtendUser
        fields = ['profile_picture', 'location']

class UserSerializer(serializers.ModelSerializer):
    extend_info = ExtendUserSerializer(many=False, read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 'extend_info']


class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['id', 'post','image']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'user', 'post', 'comment']




class PostSerializer(serializers.ModelSerializer):
    images = PostImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child = serializers.ImageField(max_length=1000000, allow_empty_file=False, use_url=False),
        write_only=True
    )
    # comments = CommentSerializer(many=True, read_only=True)
    # uploaded_images = serializers.ListField(
    #     child=serializers.ImageField(max_length=1000000, allow_empty_file=False, use_url=False),
    #     write_only=True
    # )
    class Meta:
        model = Post
        fields = ['id', 'user', 'name', 'transportation', 'restaurant', 'lodging', 'trek', 'difficulty', 'description', 'location','upload_date','images', 'uploaded_images']

    def create(self, validated_data):
        uploaded_images = validated_data.pop('uploaded_images')
        post = Post.objects.create(**validated_data)
        for image in uploaded_images:
            newpost_image = PostImage.objects.create(post=post, image=image)

        return post
    # class Meta:
    #     model = Post
    #     fields = '__all__'



    
class UsernameSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=1500)

class searchSeralizer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id','name','location')