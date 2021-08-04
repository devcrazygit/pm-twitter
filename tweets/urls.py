"""
API URLs for Tweets
"""

from django.urls import path
from .views import TweetView

urlpatterns = [
    # class
    path('tweets', TweetView.as_view(), name="tweets_view"),
]