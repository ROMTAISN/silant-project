from django.db import models
from django.contrib.auth.models import User
from datetime import date


class Technique(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Engine(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Transmission(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class ControlledBridge(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class DriveBridge(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class ServiceCompany(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class ViewTO(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class FailureNode(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class RecoveryMethod(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Car(models.Model):
    factory_number = models.CharField(max_length=100, verbose_name='Зав. № машины')
    model_technique = models.ForeignKey(Technique, on_delete=models.CASCADE, related_name='model_technique', verbose_name='Модель техники')
    engine_model = models.ForeignKey(Engine, on_delete=models.CASCADE, related_name='engine_model', verbose_name='Модель двигателя')
    engine_number = models.CharField(max_length=100,  verbose_name='Зав. № двигателя')
    transmission_model = models.ForeignKey(Transmission, on_delete=models.CASCADE, related_name='transmission_model', verbose_name='Модель трансмиссии')
    transmission_number = models.CharField(max_length=100, verbose_name='Зав. № трансмиссии')
    model_drive_bridge = models.ForeignKey(DriveBridge, on_delete=models.CASCADE, related_name='model_drive_bridge', verbose_name='Модель ведущего моста')
    number_drive_bridge = models.CharField(max_length=100, verbose_name='Зав. № ведущего моста')
    controlled_bridge_model = models.ForeignKey(ControlledBridge, on_delete=models.CASCADE, related_name='controlled_bridge_model', verbose_name='Модель управляемого моста')
    controlled_bridge_number = models.CharField(max_length=100, verbose_name='Зав. № управляемого моста')
    delivery_agreement = models.CharField(max_length=100, verbose_name='Договор поставки №, дата')
    date_of_shipment = models.DateField(verbose_name='Дата отгрузки с завода')
    consignee = models.CharField(max_length=100, verbose_name='Грузополучатель (конечный потребитель)')
    delivery_address = models.CharField(max_length=300, verbose_name='Адрес поставки (зксплуатации)')
    package_contents = models.CharField(max_length=300, verbose_name='Копмлектация (доп. опции)')
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='client', verbose_name='Клиент', limit_choices_to={'groups__name': 'Client'})
    service_company = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'groups__name': 'Company'}, related_name='service_company_TO', verbose_name='Сервисная компания')

    def __str__(self):
        return self.factory_number

    class Meta:
        ordering = ['date_of_shipment']


class TO(models.Model):
    view_TO = models.ForeignKey(ViewTO, on_delete=models.CASCADE, related_name='view_TO', verbose_name='Вид ТО')
    date_event = models.DateField(verbose_name='Дата проведения ТО')
    operating_time = models.IntegerField(verbose_name='Наработка')
    order = models.CharField(max_length=100, verbose_name='№ заказ-наряда')
    date_order = models.DateField(verbose_name='Дата заказ-наряда')
    organization_that_conducted = models.ForeignKey(ServiceCompany, on_delete=models.CASCADE, related_name='organization_that_conducted', verbose_name='Организация, проводившая ТО')
    car_TO = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='car_of_TO', verbose_name='Машина')
    service_company = models.ForeignKey(User, on_delete=models.CASCADE, related_name='service_company', verbose_name='Сервисная компания', limit_choices_to={'groups__name': 'Company'})

    def __str__(self):
        return self.view_TO.name

    class Meta:
        ordering = ['date_event']


class Complaints(models.Model):
    date_refusal = models.DateField(verbose_name='Дата отказа')
    operating_time = models.IntegerField(verbose_name='Наработка')
    failure_node = models.ForeignKey(FailureNode, on_delete=models.CASCADE, related_name='failure_node', verbose_name='Узел отказа')
    description_failure = models.TextField(verbose_name='Описание отказа')
    recovery_method = models.ForeignKey(RecoveryMethod, on_delete=models.CASCADE, related_name='recovery_method', verbose_name='Способ восстановления')
    spare_parts_used = models.TextField(blank=True,  verbose_name='Используемые запасные части')
    date_restoration = models.DateField(verbose_name='Дата восстановления')
    equipment_downtime = models.IntegerField(default=0)
    car_complaints = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='car_complaints', verbose_name='Машина')
    service_company = models.ForeignKey(User, on_delete=models.CASCADE, related_name='service_company_complaints', verbose_name='Сервисная компания', limit_choices_to={'groups__name': 'Company'})

    def __str__(self):
        return self.failure_node.name

    @property
    def duration(self):
        if self.date_restoration and self.date_refusal:
            return (self.date_restoration - self.date_refusal).days
        return None

    class Meta:
        ordering = ['date_refusal']
