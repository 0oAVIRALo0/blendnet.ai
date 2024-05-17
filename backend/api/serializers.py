from django.contrib.auth.models import User
from .models import Watchlist
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class WatchlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Watchlist
        fields = ["id", "symbol", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}

    def create(self, validated_data):
        return Watchlist.objects.create(**validated_data) 