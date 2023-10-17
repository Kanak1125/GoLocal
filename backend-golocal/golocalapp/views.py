from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import status,viewsets,filters
import os
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response  
from .serializers import UserSerializer, ExtendUserSerializer, CommentSerializer, PostImageSerializer, UsernameSerializer,SearchSerializer,PostSerializer


from rest_framework.permissions import IsAuthenticated
from django.db.models import Q


from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .models import Post, Comment, Like, ExtendUser, PostImage
from django.shortcuts import get_object_or_404

from django.contrib.auth import logout


# Create your views here.


@api_view(['GET'])
def userlist(request):
    users = User.objects.all()
    data = []

    for user in users:
        user_data = UserSerializer(user).data
        extend_user = ExtendUser.objects.filter(user=user).first()  # Retrieve the extended user data for this user

        if extend_user:
            extend_data = ExtendUserSerializer(extend_user).data
            user_data['extend_info'] = extend_data  # Include the extended user information in the user's data

        data.append(user_data)

    return Response(data, status=status.HTTP_200_OK)

@api_view(['POST'])
def usercreate(request):
    serializer = UserSerializer(data=request.data)
    

    if serializer.is_valid():
        # Extract the username and email from the serializer
        username = serializer.validated_data.get('username')
        email = serializer.validated_data.get('email')
        password = serializer.validated_data.get('password')

        # Hash the password using make_password
        hashed_password = make_password(password)

        # Perform a query to check for existing records with the same username or email
        existing_username_record = User.objects.filter(username=username).exists()
        existing_email_record = User.objects.filter(email=email).exists()

        if existing_username_record or existing_email_record:
            # If similar data exists, you can choose to return an error response
            return Response({'error': 'Similar entry already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        # If no similar data exists, save the new record
        serializer.validated_data['password'] = hashed_password
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from rest_framework import generics


class postcreate(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    parser_classes = (MultiPartParser,FormParser)

    def perform_create(self, serializer):
        serializer.save()
        
# class postcreate(generics.ListCreateAPIView):
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer

    
#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)

#         if serializer.is_valid():
#             # Process and save the uploaded images locally
#             uploaded_images = request.FILES.getlist('image')
#             image_urls = []

#             # Create the 'post_images' directory if it doesn't exist
#             if not os.path.exists('media/post_images'):
#                 os.makedirs('media/post_images')

#             for uploaded_image in uploaded_images:
#                 # Customize the path where the image will be saved
#                 image_path = f'media/post_images/{uploaded_image.name}'
                
#                 with open(image_path, 'wb+') as destination:
#                     for chunk in uploaded_image.chunks():
#                         destination.write(chunk)

#                 # Construct the image URL including the '/media/' prefix
#                 image_url = request.build_absolute_uri(image_path)
#                 image_urls.append(image_url)

#             # Set the image field of the post to the first uploaded image URL
#             if image_urls:
#                 serializer.validated_data['image'] = image_urls[0]

#             # Create the post object
#             serializer.save()

#             # Add the image URLs to the response data
#             response_data = serializer.data
#             response_data['image_urls'] = image_urls

#             return Response(response_data, status=status.HTTP_201_CREATED)
        
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        post_id = self.kwargs['post_id']
        return Comment.objects.filter(post_id=post_id)
    
    from django.shortcuts import get_object_or_404

@api_view(['POST'])
def getUsername(request):
    serializer = UsernameSerializer(data=request.data)
    print("Serializer Data: ", serializer)
 
    if serializer.is_valid():
        # Retrieve the username from the serializer
        uname = serializer.validated_data.get('username')
        print(uname)
        
        try:
            # You can set the session of username here
            request.session['username'] = uname #set the session of their username after loggin in
            # request.session.save()

            username = request.session.get('username')
            return Response({'username': username}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'User does not exist.'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SearchCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = SearchSerializer
    filter_fields = ['name', 'location']  # Include all fields you want to search
    # filter_backends = (filters.SearchFilter,)
