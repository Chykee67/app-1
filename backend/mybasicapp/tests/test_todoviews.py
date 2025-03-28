from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase

from todo.models import Task
from todo.serializers import TaskSerializer

class TaskTests(APITestCase):

    @classmethod
    def setUpTestData(cls):
        User.objects.create_user(
            username='chike',
            password='testpassword',
        )


    def test_create_task(self):
        url = reverse('todo:create_task')

        data = {
            "title": "new-task",
            "description": "about this task",
            "due": "2025-08-08 09:00",
            "priority": "High",
            "status": "Pending"
        }

        self.client.login(username='chike', password='testpassword')

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 1)
        self.assertEqual(Task.objects.get(title='new-task').title, "new-task")

        self.client.logout()