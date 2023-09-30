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

    path('getUsername/', views.getUsername, name="getUsername"),
    path('checkSession/', views.checkSession, name="checkSession"),
]