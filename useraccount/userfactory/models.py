from django.db import models
from abc import ABC, abstractmethod
import uuid
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    UserManager,
    Group,
    Permission,
)


ROLE_CHOICES = (
    ("superuser", "Superuser"),
    ("staff", "Staff"),
    ("manager", "Manager"),
    ("editor", "Editor"),
    ("moderator", "Moderator"),
    ("developer", "Developer"),
    ("support", "Support"),
    ("guest", "Guest"),
)


class CustomUserManager(UserManager):
    def _create_user(self, name, email, password, **extra_fields):
        if not email:
            raise ValueError("You have not specified a valid e-mail address.")
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, name, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(name, email, password, role="guest", **extra_fields)

    def create_superuser(self, name, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self._create_user(
            name, email, password, role="superuser", **extra_fields
        )

    def create_with_role(
        self, name, email, role="guest", password=None, **extra_fields
    ):
        is_staff = role in ["superuser", "staff", "manager"]
        extra_fields.setdefault("is_staff", is_staff)
        extra_fields.setdefault("is_superuser", role == "superuser")
        return self._create_user(name, email, password, role=role, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):  # Product
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="guest")

    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(blank=True, null=True)

    groups = models.ManyToManyField(
        Group,
        related_name="user_groups",
        blank=True,
        help_text="The groups the user belongs to. A user will get all permissions granted to each of their group.",
        verbose_name="groups",
    )

    user_permissions = models.ManyToManyField(
        Permission,
        related_name="custom_user_permissions",
        blank=True,
        help_text="Specific permissions for this user. ",
        verbose_name="user permissions",
    )

    objects = CustomUserManager()
