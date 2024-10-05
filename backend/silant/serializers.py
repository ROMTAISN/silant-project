from rest_framework import serializers
from rest_framework.exceptions import ValidationError
import logging
from django.contrib.auth.models import User

from .models import Complaints, Car, TO, Technique, Engine, Transmission, \
    ControlledBridge, DriveBridge, ServiceCompany, ViewTO, FailureNode, RecoveryMethod


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'groups']


class TechniqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Technique
        fields = ['id',
                  'name',
                  'description']


class EngineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Engine
        fields = ['id',
                  'name',
                  'description']


class TransmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transmission
        fields = ['id',
                  'name',
                  'description']


class ControlledBridgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ControlledBridge
        fields = ['id',
                  'name',
                  'description']


class DriveBridgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DriveBridge
        fields = ['id',
                  'name',
                  'description']


class ServiceCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCompany
        fields = ['id',
                  'name',
                  'description']


class ViewTOSerializer(serializers.ModelSerializer):
    class Meta:
        model = ViewTO
        fields = ['id',
                  'name',
                  'description']


class FailureNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FailureNode
        fields = ['id',
                  'name',
                  'description']


class RecoveryMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecoveryMethod
        fields = ['id',
                  'name',
                  'description']

logger = logging.getLogger(__name__)

class CarSerializer(serializers.ModelSerializer):
    model_technique = TechniqueSerializer()
    engine_model = EngineSerializer()
    transmission_model = TransmissionSerializer()
    model_drive_bridge = DriveBridgeSerializer()
    controlled_bridge_model = ControlledBridgeSerializer()
    client = UserSerializer()
    service_company = UserSerializer()

    class Meta:
        model = Car
        fields = ['id',
                  'factory_number',
                  'model_technique',
                  'engine_model',
                  'engine_number',
                  'transmission_model',
                  'transmission_number',
                  'model_drive_bridge',
                  'number_drive_bridge',
                  'controlled_bridge_model',
                  'controlled_bridge_number',
                  'delivery_agreement',
                  'date_of_shipment',
                  'consignee',
                  'delivery_address',
                  'package_contents',
                  'client',
                  'service_company']
        depth = 1

        def create(self, validated_data):
            logger.debug(f"Creating Car with data: {validated_data}")
            try:
                car = Car.objects.create(**validated_data)
                return car
            except Exception as e:
                logger.error(f"Error creating Car: {str(e)}")
                raise ValidationError(str(e))


class CarNoRegSerializer(serializers.ModelSerializer):
    model_technique = TechniqueSerializer()
    engine_model = EngineSerializer()
    transmission_model = TransmissionSerializer()
    model_drive_bridge = DriveBridgeSerializer()
    controlled_bridge_model = ControlledBridgeSerializer()

    class Meta:
        model = Car
        fields = ['id',
                  'factory_number',
                  'model_technique',
                  'engine_model',
                  'engine_number',
                  'transmission_model',
                  'transmission_number',
                  'model_drive_bridge',
                  'number_drive_bridge',
                  'controlled_bridge_model',
                  'controlled_bridge_number']


class CarCreateSerializer(serializers.ModelSerializer):
    model_technique = serializers.PrimaryKeyRelatedField(queryset=Technique.objects.all())
    engine_model = serializers.PrimaryKeyRelatedField(queryset=Engine.objects.all())
    transmission_model = serializers.PrimaryKeyRelatedField(queryset=Transmission.objects.all())
    model_drive_bridge = serializers.PrimaryKeyRelatedField(queryset=DriveBridge.objects.all())
    controlled_bridge_model = serializers.PrimaryKeyRelatedField(queryset=ControlledBridge.objects.all())
    client = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    service_company = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Car
        fields = ['id',
                  'factory_number',
                  'model_technique',
                  'engine_model',
                  'engine_number',
                  'transmission_model',
                  'transmission_number',
                  'model_drive_bridge',
                  'number_drive_bridge',
                  'controlled_bridge_model',
                  'controlled_bridge_number',
                  'delivery_agreement',
                  'date_of_shipment',
                  'consignee',
                  'delivery_address',
                  'package_contents',
                  'client',
                  'service_company']
        depth = 1

        def create(self, validated_data):
            logger.debug(f"Creating Car with data: {validated_data}")
            try:
                car = Car.objects.create(**validated_data)
                return car
            except Exception as e:
                logger.error(f"Error creating Car: {str(e)}")
                raise ValidationError(str(e))


class TOSerializer(serializers.ModelSerializer):
    view_TO = ViewTOSerializer()
    organization_that_conducted = ServiceCompanySerializer()
    car_TO = CarSerializer()
    service_company = UserSerializer()

    class Meta:
        model = TO
        fields = ['id',
                  'view_TO',
                  'date_event',
                  'operating_time',
                  'order',
                  'date_order',
                  'organization_that_conducted',
                  'car_TO',
                  'service_company']


class TOCreateSerializer(serializers.ModelSerializer):
    view_TO = serializers.PrimaryKeyRelatedField(queryset=ViewTO.objects.all())
    organization_that_conducted = serializers.PrimaryKeyRelatedField(queryset=ServiceCompany.objects.all())
    car_TO = serializers.PrimaryKeyRelatedField(queryset=Car.objects.all())
    service_company = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = TO
        fields = ['id',
                  'view_TO',
                  'date_event',
                  'operating_time',
                  'order',
                  'date_order',
                  'organization_that_conducted',
                  'car_TO',
                  'service_company']


class ComplaintsSerializer(serializers.ModelSerializer):
    failure_node = FailureNodeSerializer()
    recovery_method = RecoveryMethodSerializer()
    car_complaints = CarSerializer()
    service_company = UserSerializer()
    duration = serializers.ReadOnlyField()

    class Meta:
        model = Complaints
        fields = ['id',
                  'date_refusal',
                  'operating_time',
                  'failure_node',
                  'description_failure',
                  'recovery_method',
                  'spare_parts_used',
                  'date_restoration',
                  'duration',
                  'car_complaints',
                  'service_company']


class ComplaintsCreateSerializer(serializers.ModelSerializer):
    failure_node = serializers.PrimaryKeyRelatedField(queryset=FailureNode.objects.all())
    recovery_method = serializers.PrimaryKeyRelatedField(queryset=RecoveryMethod.objects.all())
    car_complaints = serializers.PrimaryKeyRelatedField(queryset=Car.objects.all())
    service_company = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    duration = serializers.ReadOnlyField()

    class Meta:
        model = Complaints
        fields = ['id',
                  'date_refusal',
                  'operating_time',
                  'failure_node',
                  'description_failure',
                  'recovery_method',
                  'spare_parts_used',
                  'date_restoration',
                  'duration',
                  'car_complaints',
                  'service_company']
