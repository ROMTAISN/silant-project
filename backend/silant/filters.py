from django_filters import rest_framework as filters
from .models import Car, TO


class CarFilter(filters.FilterSet):
    class Meta:
        model = Car
        fields = ['factory_number']


class TOFilter(filters.FilterSet):
    view_TO = filters.NumberFilter(field_name='view_TO')
    car_TO = filters.NumberFilter(field_name='car_TO')
    service_company = filters.NumberFilter(field_name='service_company')

    class Meta:
        model = TO
        fields = ['view_TO', 'car_TO', 'service_company']
