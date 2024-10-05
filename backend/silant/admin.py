from django.contrib import admin

from .models import *


admin.site.register(Car)
admin.site.register(Complaints)
admin.site.register(TO)
admin.site.register(Technique)
admin.site.register(Engine)
admin.site.register(Transmission)
admin.site.register(ControlledBridge)
admin.site.register(DriveBridge)
admin.site.register(ServiceCompany)
admin.site.register(ViewTO)
admin.site.register(FailureNode)
admin.site.register(RecoveryMethod)

