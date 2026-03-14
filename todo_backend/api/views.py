from rest_framework import viewsets, generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Todo
from .serializers import TodoSerializer, RegisterSerializer

# Class-Based View for Registration
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        is_archived = self.request.query_params.get('archived', 'false').lower()
        if is_archived == 'true':
            return Todo.objects.filter(user=self.request.user, is_archived=True).order_by('-created_at')
        return Todo.objects.filter(user=self.request.user, is_archived=False).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)