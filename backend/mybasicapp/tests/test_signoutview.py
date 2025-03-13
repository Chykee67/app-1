from django.test import TestCase
from django.contrib.auth.models import User

class TestSignoutView(TestCase):
    
    def test_signout(self):
        User.objects.create_user(
            username='testuser',
            password='testpassword',
        )

        self.client.login(username='testuser', password='testpassword')
        response = self.client.get('/user_auth/signout/')

        self.assertRedirects(response, '/user_auth/signin/')
        self.assertFalse('_auth_user_id' in self.client.session) # Check if user is logged out