# Generated by Django 5.0.7 on 2024-08-22 21:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('silant', '0003_alter_car_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='complaints',
            options={'ordering': ['date_refusal']},
        ),
        migrations.AlterModelOptions(
            name='to',
            options={'ordering': ['date_event']},
        ),
    ]
