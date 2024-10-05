import django_filters
from django.shortcuts import render
from rest_framework import generics, status, serializers, viewsets
from rest_framework.decorators import api_view
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView

from authentication.permissions import IsClient, IsCompany, IsManager
from .filters import CarFilter, TOFilter
from .models import Complaints, Car, TO, Technique, Engine, Transmission, \
    ControlledBridge, DriveBridge, ServiceCompany, ViewTO, FailureNode, RecoveryMethod
from .serializers import CarSerializer, TOSerializer, ComplaintsSerializer, TechniqueSerializer, \
    EngineSerializer, TransmissionSerializer, ControlledBridgeSerializer, DriveBridgeSerializer, \
    ServiceCompanySerializer, ViewTOSerializer, FailureNodeSerializer, RecoveryMethodSerializer, \
    CarNoRegSerializer, UserSerializer, CarCreateSerializer, TOCreateSerializer, ComplaintsCreateSerializer


class TechniqueViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Technique.objects.all()
    serializer_class = TechniqueSerializer


class EngineViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Engine.objects.all()
    serializer_class = EngineSerializer


class TransmissionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Transmission.objects.all()
    serializer_class = TransmissionSerializer


class ControlledBridgeViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ControlledBridge.objects.all()
    serializer_class = ControlledBridgeSerializer


class DriveBridgeViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = DriveBridge.objects.all()
    serializer_class = DriveBridgeSerializer


class ServiceCompanyViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ServiceCompany.objects.all()
    serializer_class = ServiceCompanySerializer


class ViewTOViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ViewTO.objects.all()
    serializer_class = ViewTOSerializer


class FailureNodeViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = FailureNode.objects.all()
    serializer_class = FailureNodeSerializer


class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['model_technique__name', 'engine_model__name', 'transmission_model__name', 'model_drive_bridge__name', 'controlled_bridge_model__name']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            if self.request.user.groups.filter(name='Client').exists():
                return [IsAuthenticated(), IsClient()]
            elif self.request.user.groups.filter(name='Company').exists():
                return [IsAuthenticated(), IsCompany()]
            elif self.request.user.groups.filter(name='Manager').exists():
                return [IsAuthenticated(), IsManager()]
        elif self.action in ['create', 'update', 'partial_update', 'destroy']:
            if self.request.user.groups.filter(name='Manager').exists():
                return [IsAuthenticated(), IsManager()]
        return super().get_permissions()

    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name='Client').exists():
            return Car.objects.filter(client=user)
        elif user.groups.filter(name='Company').exists():
            return Car.objects.filter(service_company=user)
        elif user.groups.filter(name='Manager').exists():
            return Car.objects.all()
        return Car.objects.none()


class CarListView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Car.objects.all()
    serializer_class = CarCreateSerializer
    filter_backends = [DjangoFilterBackend]

    def post(self, request, *args, **kwargs):
        if not request.user.groups.filter(name='Manager').exists():
            raise PermissionDenied("Access Denied")
        return super().post(request, *args, **kwargs)

class CarDetailNoRegViewSet(generics.RetrieveAPIView):
    queryset = Car.objects.all()
    serializer_class = CarNoRegSerializer
    lookup_field = 'factory_number'


class RecoveryMethodViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = RecoveryMethod.objects.all()
    serializer_class = RecoveryMethodSerializer


class TOViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = TO.objects.all()
    serializer_class = TOSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['view_TO__name', 'car_TO__factory_number', 'service_company__username']

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'create', 'update', 'partial_update', 'destroy']:
            if self.request.user.groups.filter(name='Client').exists():
                return [IsAuthenticated(), IsClient()]
            elif self.request.user.groups.filter(name='Company').exists():
                return [IsAuthenticated(), IsCompany()]
            elif self.request.user.groups.filter(name='Manager').exists():
                return [IsAuthenticated(), IsManager()]
        return super().get_permissions()

    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name='Client').exists():
            return TO.objects.filter(car_TO__client=user)
        elif user.groups.filter(name='Company').exists():
            return TO.objects.filter(service_company=user)
        elif user.groups.filter(name='Manager').exists():
            return TO.objects.all()
        return TO.objects.none()

    # def another_method(self):
    #     queryset = super().get_queryset()
    #     car_TO = self.request.query_params.get('car_TO')
    #     service_company = self.request.query_params.get('service_company')
    #
    #     if car_TO:
    #         queryset = queryset.filter(car_TO__factory_number=car_TO)
    #     if service_company:
    #         queryset = queryset.filter(service_company__username=service_company)
    #     return queryset


class TOListView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = TO.objects.all()
    serializer_class = TOCreateSerializer

    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name='Client').exists():
            return Car.objects.filter(client=user)
        elif user.groups.filter(name='Company').exists():
            return Car.objects.filter(service_company=user)
    def company(self):
        user = self.request.user
        if user.groups.filter(name='Company').exists():
            return User.objects.filter(username=user.username)


class ComplaintsViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Complaints.objects.all()
    serializer_class = ComplaintsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['failure_node__name', 'recovery_method__name', 'service_company__username']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            if self.request.user.groups.filter(name='Client').exists():
                return [IsAuthenticated(), IsClient()]
            elif self.request.user.groups.filter(name='Company').exists():
                return [IsAuthenticated(), IsCompany()]
            elif self.request.user.groups.filter(name='Manager').exists():
                return [IsAuthenticated(), IsManager()]
        elif self.action in ['create', 'update', 'partial_update', 'destroy']:
            if self.request.user.groups.filter(name='Manager').exists():
                return [IsAuthenticated(), IsManager()]
            elif self.request.user.groups.filter(name='Company').exists():
                return [IsAuthenticated(), IsCompany()]
        return super().get_permissions()

    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name='Client').exists():
            return Complaints.objects.filter(car_complaints__client=user)
        elif user.groups.filter(name='Company').exists():
            return Complaints.objects.filter(service_company=user)
        elif user.groups.filter(name='Manager').exists():
            return Complaints.objects.all()
        return Complaints.objects.none()


class ComplaintsListView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Complaints.objects.all()
    serializer_class = ComplaintsCreateSerializer
    filter_backends = [DjangoFilterBackend]

    def post(self, request, *args, **kwargs):
        if not request.user.groups.filter(name='Manager').exists():
            if not request.user.groups.filter(name='Company').exists():
                raise PermissionDenied("Access Denied")
        return super().post(request, *args, **kwargs)

    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name='Manager').exists():
            return Complaints.objects.filter(service_company=user)


class NoRegViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarNoRegSerializer
    filterset_class = CarFilter
    filter_backends = [DjangoFilterBackend]


class UserView(APIView):
    def get(self, request):
        user = request.user
        groups = [group.name for group in user.groups.all()]
        data = {
            "username": user.username,
            "groups": groups
        }
        return Response(data)

class UserViewSet(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self):
        groups = User.groups.name
        return groups

class ClientListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.filter(groups__name='Client')
    serializer_class = UserSerializer


class CompanyListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    # queryset = User.objects.filter(groups__name='Company')
    serializer_class = UserSerializer

    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name='Company').exists():
            return User.objects.filter(username=user.username)
        else:
            return User.objects.filter(groups__name='Company')



