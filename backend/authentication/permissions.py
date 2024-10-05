from rest_framework.permissions import BasePermission


class IsManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='Manager').exists()


class IsClient(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='Client').exists()


class IsCompany(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='Company').exists()
