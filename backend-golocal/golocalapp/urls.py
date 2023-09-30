from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views
urlpatterns = [
    path('user-create/', views.usercreate, name="user-create" ),
    path('user-list/', views.userlist, name="user-list"),
    
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

<<<<<<< HEAD
    path('post-create-list/', views.postcreate.as_view(), name="post-create"),
    # path('post/<str:pk>/postimage-create-list/', views.postimagecreate.as_view(), name="post-image"),
    # path('post-list/', views.postlist, name="post-list"),

    path('post/<str:pk>/comment-create/', views.commentcreate, name="comment-create"),
    path('post/<str:pk>/comment-list/', views.commentlist, name="comment-list"),
=======
    path('getUsername/', views.getUsername, name="getUsername"),
>>>>>>> 29316108ca5161b24f9131e4ec6c10cc8b912ee2
]