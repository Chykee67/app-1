from django.test import TestCase

from todo.forms import AddTaskForm

class AddTaskFormTest(TestCase):
    def test_title_label(self):
        form = AddTaskForm()
        self.assertTrue(form.base_fields['title'].label == None or form.base_fields['title'].label == 'Title')

    def test_description_label(self):
        form = AddTaskForm()
        self.assertTrue(form.base_fields['description'].label == None or form.base_fields['description'].label == 'Description')

    def test_due_label(self):
        form = AddTaskForm()
        self.assertTrue(form.base_fields['due'].label == None or form.base_fields['due'].label == 'Due')

    def test_due_help_text(self):
        form = AddTaskForm()
        self.assertEqual(form.base_fields['due'].help_text, 'Format: YYYY-MM-DD HH:MM')

    def test_priority_label(self):
        form = AddTaskForm()
        self.assertTrue(form.base_fields['priority'].label == None or form.base_fields['priority'].label == 'Priority')

    def test_title_max_length(self):
        form = AddTaskForm()
        self.assertEqual(form.base_fields['title'].max_length, 200)