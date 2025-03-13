from django.test import TestCase
from django.contrib.auth.models import User

class TestSignupView(TestCase):

    def test_get(self):
        response = self.client.get('/user_auth/signup/')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'user_auth/signup.html')

    def test_post_valid_form(self):
        response = self.client.post('/user_auth/signup/', {
            'username': 'testuser',
            'email': 'testuser@mail.com',
            'password1': 'testpassword',
            'password2': 'testpassword',
        })

        self.assertRedirects(response, '/user_auth/signin/')
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.first().username, 'testuser')

    def test_post_invalid_form_with_mismatched_passwords(self):

        response = self.client.post('/user_auth/signup/', {
            'username': 'testuser',
            'email': 'testuser@mail.com',
            'password1': 'testpassword',
            'password2': 'testpassword1',
        })

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'user_auth/signup.html')
        self.assertContains(response, 'Passwords do not match')

#Add more tests in production code