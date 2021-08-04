from django.db import models

# Create your models here.
class Tweet(models.Model):
    """
    Tweet Model
    """

    name = models.CharField('name', max_length=20)
    content = models.CharField('content', max_length=50)

    created_at = models.DateTimeField('created_at', auto_now_add=True)
    updated_at = models.DateTimeField('updated_at', auto_now=True)