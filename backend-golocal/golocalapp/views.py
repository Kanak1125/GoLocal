from django.shortcuts import render
from rest_framework import status

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated

from .serializers import UserSerializer,UsernameSerializer
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password



# Create your views here.


@api_view(['GET'])
def userlist(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

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

@api_view(['POST'])
def getUsername(request):
    serializer = UsernameSerializer(data=request.data)
    
    if serializer.is_valid():
        # Retrieve the username of the authenticated user
        username = serializer.validated_data.get('username')
        
        try:
            user = User.objects.get(username=username)
            # You can set the session of username here
            request.session['username'] = username

            #access the session
            username = request.session.get('username')
            print(f'----------{username}------')
            return Response({'username': username}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'User does not exist.'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from django.http import HttpResponse

def checkSession(request):
    username = request.session.get('username')
    print(f'----------{username}--**--')
    return HttpResponse(username)