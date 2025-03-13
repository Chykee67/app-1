from django.test import TestCase
from django.urls import reverse

from django.contrib.auth.models import User
from todo.models import Task


class TestAllTasksView(TestCase):

    def setUp(self):

        User.objects.create_user(username='testuser', password='password')

        number_of_tasks = 11

        for task_num in range(1, number_of_tasks):
            Task.objects.create(
                title=f'Task {task_num}',
                description=f'Task {task_num} description',
                created_by=User.objects.get(username='testuser'),
                due='2025-12-31 23:59',
                priority='High',
                status='Pending'
            )


    def test_all_tasks_view(self):

        self.client.login(username='testuser', password='password') #can i use this login once in setup and have it apply to all tests?

        response = self.client.get(reverse('todo:view_all_tasks'))

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'todo/all_tasks.html')
        self.assertTrue('tasks' in response.context)
        self.assertEqual(len(response.context['tasks']), 10)


    def test_default_pending_tasks_view(self):

        self.client.login(username='testuser', password='password')

        response = self.client.get(reverse('todo:view_pending_tasks'))

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'todo/all_tasks.html')
        self.assertTrue('tasks' in response.context)
        self.assertEqual(len(response.context['tasks']), 10)

    def test_default_completed_tasks_view(self):
        
        self.client.login(username='testuser', password='password')

        response = self.client.get(reverse('todo:view_completed_tasks'))

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'todo/all_tasks.html')
        self.assertTrue('tasks' in response.context)
        self.assertEqual(len(response.context['tasks']), 0)

    def test_mark_task_complete_view(self):
        
        self.client.login(username='testuser', password='password')

        task = Task.objects.get(title='Task 1')

        response = self.client.get(reverse('todo:mark_task_complete', kwargs={'task_id': task.id}), follow=True)
        response2 = self.client.get(reverse('todo:view_all_tasks'))
        response3 = self.client.get(reverse('todo:view_pending_tasks'))
        response4 = self.client.get(reverse('todo:view_completed_tasks'))

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'todo/task_detail.html')
        self.assertEqual(Task.objects.get(title='Task 1').status, 'Completed')

        self.assertEqual(len(response2.context['tasks']), 10)
        self.assertEqual(len(response3.context['tasks']), 9)
        self.assertEqual(len(response4.context['tasks']), 1)

    def test_mark_task_pending_view(self):
        
        self.client.login(username='testuser', password='password')

        task = Task.objects.get(title='Task 1')
        task.status = 'Completed'
        task.save()

        response = self.client.get(reverse('todo:mark_task_pending', kwargs={'task_id': task.id}), follow=True)
        response2 = self.client.get(reverse('todo:view_all_tasks'))
        response3 = self.client.get(reverse('todo:view_pending_tasks'))
        response4 = self.client.get(reverse('todo:view_completed_tasks'))

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'todo/task_detail.html')
        self.assertEqual(Task.objects.get(title='Task 1').status, 'Pending')

        self.assertEqual(len(response2.context['tasks']), 10)
        self.assertEqual(len(response3.context['tasks']), 10)
        self.assertEqual(len(response4.context['tasks']), 0)

        # write tests for the rest of the views later