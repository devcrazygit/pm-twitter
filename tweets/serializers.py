from rest_framework import serializers
from .models import Tweet

class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name', 'content', 'created_at')
        model = Tweet
        extra_keywords = {
            'created_at': {
                'required': False
            }
        }