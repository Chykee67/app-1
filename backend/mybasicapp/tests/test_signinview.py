from django.test import TestCase
from django.contrib.auth.models import User

class TestSigninView(TestCase):

    @classmethod
    def setUpTestData(cls):
        User.objects.create_user(
            username='testuser',
            password='testpassword',
        )

    def test_get(self):
        response = self.client.get('/signin/')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'user_auth/signin.html')

    def test_post_valid_form(self):
        response = self.client.post('/signin/', {
            'username': 'testuser',
            'password': 'testpassword',
        })

        self.assertRedirects(response, '/')
        self.assertTrue('_auth_user_id' in self.client.session) # Check if user is logged in
    
    def test_post_invalid_form_with_wrong_password(self):
        response = self.client.post('/signin/', {
            'username': 'testuser',
            'password': 'wrongpassword',
        })

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'user_auth/signin.html')
        self.assertContains(response, 'Invalid credentials')

    def test_post_invalid_form_with_wrong_username(self):
        response = self.client.post('/signin/', {
            'username': 'wronguser',
            'password': 'testpassword',
        })

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'user_auth/signin.html')
        self.assertContains(response, 'Invalid credentials')
# #Add more tests in production code