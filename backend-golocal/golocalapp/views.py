from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import status,viewsets,filters

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



# from rest_framework import permissions
# from rest_framework.authentication import TokenAuthentication

# class UserLogin(APIView):
#     permission_classes = (permissions.AllowAny,)
#     authentication_classes = (TokenAuthentication,)
#     def post(self, request):
#         data = request.data
# @api_view(['POST'])
# @parser_classes([MultiPartParser, FormParser])
# def postcreate(request):
#     # Deserialize the data from the request
#     post_data = request.data.get('post', {})
#     image_data = request.FILES['image']

#     print(image_data)

#     # Serialize the Post data and validate it
#     post_serializer = PostSerializer(data=post_data)
#     if post_serializer.is_valid():
#         # Create the Post object
#         post = post_serializer.save()

#         # Serialize and create the PostImage objects
#         created_images = []
#         for image_item in image_data:
#             image_serializer = PostImageSerializer(data=image_item)
#             if image_serializer.is_valid():
#                 image_serializer.save(post=post)
#                 created_images.append(image_serializer.data)
        
#         # Include the created images in the Post data
#         post_data['images'] = created_images

#         return Response(post_data, status=status.HTTP_201_CREATED)

#     return Response(post_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework import generics

class postcreate(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

# class postimagecreate(generics.ListCreateAPIView, id):
#     queryset = PostImage.objects.get(id=id)
#     serializer_class = Post

# @api_view(['GET'])
# def postlist(request):
#     posts = Post.objects.all()
#     data = []

#     for post in posts:
#         post_data = PostSerializer(post).data
#         post_images = PostImage.objects.filter(post=post)
#         post_comments = Comment.objects.filter(post=post)
#         post_data['comments'] = CommentSerializer(post_comments, many=True).data
#         post_data['images'] = PostImageSerializer(post_images, many=True).data
#         data.append(post_data)

#     return Response(data, status=status.HTTP_200_OK)

# @api_view(['POST'])
# def commentcreate(request, pk):
#     serializer = CommentSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

# class commentcreate(generics.ListCreateAPIView):
#     queryset = Comment.objects.all()
#     serializer_class = CommentSerializer

# @api_view(['GET'])  
# def commentlist(request, pk):
#     comments = Comment.objects.filter(post=pk)
#     data = []

#     for comment in comments:
#         comment_data = CommentSerializer(comment).data
#         data.append(comment_data)

#     return Response(data, status=status.HTTP_200_OK)

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

   

# class searchViewSet(viewsets.ModelViewSet):
#     queryset = Post.objects.all()
#     serializer_class = searchSeralizer

# # Define the allowed actions for the viewset
# search_viewset = searchViewSet.as_view({
#     'get': 'list',       # Allow GET requests for listing
#     'post': 'create',    # Allow POST requests for creating
# })

# @api_view(['POST'])
# def searchcreate(request):
#     serializer = SearchSerializer(data=request.data)
 
#     if serializer.is_valid():
#         # Retrieve the username from the serializer
        
#         try:
#             name = serializer.validated_data.get('name')
#             location = serializer.validated_data.get('location')

#             print(name)
#             print(location)

#             return Response({'name': name,'location':location}, status=status.HTTP_200_OK)
#         except User.DoesNotExist:
#             return Response({'error': 'Value does not exist.'}, status=status.HTTP_404_NOT_FOUND)
#     else:
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class searchcreate(generics.ListCreateAPIView):
#     search_fields = ['name']
#     filter_backends = (filters.SearchFilter,)
#     queryset = Post.objects.all()
#     serializer_class = SearchSerializer

# class SearchCreateView(generics.ListCreateAPIView):
#     search_fields = ['name', 'location']  # Include all fields you want to search
#     filter_backends = (filters.SearchFilter,)
#     queryset = Post.objects.all()
#     serializer_class = SearchSerializer

class SearchCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = SearchSerializer
    filter_fields = ['name', 'location']  # Include all fields you want to search
    # filter_backends = (filters.SearchFilter,)
