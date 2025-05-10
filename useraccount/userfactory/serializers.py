from .models import User, CustomUserManager
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    @staticmethod
    def get_serializer(role: str):
        if role == "superuser":
            return SuperUserSerializer
        elif role == "guest":
            return GuestUserSerializer
        else:
            return RoleUserSerializer


class GuestUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "email",
            "name",
            "password",
            "role",
            "groups",
            "user_permissions",
        ]
        extra_kwargs = {"password": {"write_only": True}}

        def create(self, validated_data):
            password = validated_data.pop("password")
            user = User.objects.create_user(
                name=validated_data.pop("name"),
                email=validated_data.pop("email"),
                password=password,
                **validated_data
            )
            return user


class SuperUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "name",
            "avatar",
            "is_active",
            "role",
            "date_joined",
            "last_login",
            "groups",
            "user_permissions",
        ]
        extra_kwargs = {"password": {"write_only": True}}

        def create(self, validated_data):
            password = validated_data.pop("password")
            user = User.objects.create_superuser(
                name=validated_data.pop("name"),
                email=validated_data.pop("email"),
                password=password,
                **validated_data
            )
            return user


class RoleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "name",
            "avatar",
            "is_active",
            "role",
            "date_joined",
            "last_login",
            "groups",
            "user_permissions",
        ]
        extra_kwargs = {"password": {"write_only": True}}

        def create(self, validated_data):
            password = validated_data.pop("password")
            role = validated_data.pop("role", "guest")
            user = User.objects.create_user_with_role(
                name=validated_data.pop("name"),
                email=validated_data.pop("email"),
                role=role,
                password=password,
                **validated_data
            )
            return user
