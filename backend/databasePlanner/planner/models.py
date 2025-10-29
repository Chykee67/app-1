from django.db import models



class Card(models.Model):

    title = models.CharField(
        verbose_name='card title',
        primary_key=True,
        max_length=32
    )

    def __str__(self):
        return self.title
    
class Item(models.Model):

    title = models.CharField(
        verbose_name = 'item title',
        max_length=32,
    )

    card = models.ForeignKey(
        Card,
        on_delete=models.CASCADE,
        related_name='items',
    )

    def __str__(self):
        return self.title