from django.contrib.auth.models import Group, Permission
from  django.db import migrations
from django.db import models


def create_groups(apps, schema_editor):
    client_group, created = Group.objects.get_or_create(name='Client')
    company_group, created = Group.objects.get_or_create(name='Company')
    manager_group, created = Group.objects.get_or_create(name='Manager')


class Migration(migrations.Migration):
    dependencies = []

    operations = [
        migrations.RunPython(create_groups),
    ]