from django.urls import path
from . import views

app_name = "user_account"

urlpatterns = [
    path('', views.AccountView.as_view(), name='user_account'),
]