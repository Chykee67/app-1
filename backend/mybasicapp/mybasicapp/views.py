from django.views.generic import TemplateView
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required

from rest_framework.views import APIView
from rest_framework.response import Response
#from rest_framework.authentication import SessionAuthentication
#from rest_framework.permissions import IsAuthenticated

from user_auth.serializers import userSerializer


class HomepageView(TemplateView):
    template_name = 'mybasicapp/home.html'

@method_decorator(login_required, name='dispatch')
class AuthCheckView(APIView):

    #authentication_classes = [SessionAuthentication]
    #permission_classes = [IsAuthenticated]

    def get(self, request):

        user_serializer = userSerializer(request.user)

        if request.user.is_anonymous:
            return Response({
                'auth': f'{user_serializer.data} is Anonymous',
                'header': request.headers.get('Authorization')
            })
        
        return Response({
            'auth': user_serializer.data.get('username'),
            'header': request.headers
        })