from django.test import TestCase

from mybasicapp.todo.models import Task

class TaskModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Task.objects.create(
            title='Test Task',
            description='This is a test task',
            due='2025-12-31 23:59',
            priority='High',
            status='Pending',
            created_by_id=1
        )
    
    def test_title_label(self):
        task = Task.objects.get(id=1)
        field_label = task._meta.get_field('title').verbose_name
        self.assertEquals(field_label, 'title')

    def test_description_label(self):
        task = Task.objects.get(id=1)
        field_label = task._meta.get_field('description').verbose_name
        self.assertEquals(field_label, 'description')

    def test_due_label(self):
        task = Task.objects.get(id=1)
        field_label = task._meta.get_field('due').verbose_name
        self.assertEquals(field_label, 'due')

    def test_priority_label(self):
        task = Task.objects.get(id=1)
        field_label = task._meta.get_field('priority').verbose_name
        self.assertEquals(field_label, 'priority')

    def test_status_label(self):
        task = Task.objects.get(id=1)
        field_label = task._meta.get_field('status').verbose_name
        self.assertEquals(field_label, 'status')

    def test_created_by_label(self):
        task = Task.objects.get(id=1)
        field_label = task._meta.get_field('created_by').verbose_name
        self.assertEquals(field_label, 'created by')
    
    def test_title_max_length(self):
        task = Task.objects.get(id=1)
        max_length = task._meta.get_field('title').max_length
        self.assertEquals(max_length, 200)

    def test_priority_max_length(self):
        task = Task.objects.get(id=1)
        max_length = task._meta.get_field('priority').max_length
        self.assertEquals(max_length, 6)

    def test_status_max_length(self):
        task = Task.objects.get(id=1)
        max_length = task._meta.get_field('status').max_length
        self.assertEquals(max_length, 9)

    def test_object_name_is_title_due_priority_status(self):
        task = Task.objects.get(id=1)
        expected_object_name = f"{task.title} - {task.due.strftime('%d-%m-%Y %H:%M')} - {task.priority} priority - {task.status}"
        self.assertEquals(str(task), expected_object_name)