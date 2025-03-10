from django.test import TestCase

from mybasicapp.todo.forms import AddTaskForm

class AddTaskFormTest(TestCase):
    def test_title_label(self):
        form = AddTaskForm()
        self.assertTrue(form.fields['title'].label == None or form.fields['title'].label == 'title')

    def test_description_label(self):
        form = AddTaskForm()
        self.assertTrue(form.fields['description'].label == None or form.fields['description'].label == 'description')

    def test_due_label(self):
        form = AddTaskForm()
        self.assertTrue(form.fields['due'].label == None or form.fields['due'].label == 'due')

    def test_due_help_text(self):
        form = AddTaskForm()
        self.assertEquals(form.fields['due'].help_text, 'YYYY-MM-DD HH:MM')

    def test_priority_label(self):
        form = AddTaskForm()
        self.assertTrue(form.fields['priority'].label == None or form.fields['priority'].label == 'priority')

    def test_title_max_length(self):
        form = AddTaskForm()
        self.assertEquals(form.fields['title'].max_length, 200)

    def test_priority_max_length(self):
        form = AddTaskForm()
        self.assertEquals(form.fields['priority'].max_length, 6)

    def test_status_max_length(self):
        form = AddTaskForm()
        self.assertEquals(form.fields['status'].max_length, 9)