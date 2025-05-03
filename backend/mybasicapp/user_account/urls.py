from django.urls import path
from . import views

app_name = "user_account"

urlpatterns = [
    path('', views.AccountView.as_view(), name='user_account'),
    path('upload_photo/', views.UploadPhotoView.as_view(), name='upload_photo'),
]