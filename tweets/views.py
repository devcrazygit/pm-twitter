from rest_framework import generics, mixins
from rest_framework.permissions import AllowAny
from .models import Tweet
from .serializers import TweetSerializer
from django.shortcuts import render

# Create your views here.
class TweetView(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return super().get_queryset().order_by('created_at')

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
