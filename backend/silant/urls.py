from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CarViewSet, TOViewSet, ComplaintsViewSet, TechniqueViewSet, CarDetailNoRegViewSet,\
    ServiceCompanyViewSet, EngineViewSet, TransmissionViewSet, ControlledBridgeViewSet, DriveBridgeViewSet,\
    ViewTOViewSet, FailureNodeViewSet, RecoveryMethodViewSet, ClientListView, CompanyListView,  CarListView,\
    TOListView, ComplaintsListView, UserViewSet, UserView

router = DefaultRouter()
router.register(r'user', UserViewSet)
router.register(r'to', TOViewSet)
router.register(r'complaints', ComplaintsViewSet)
router.register(r'car', CarViewSet)
router.register(r'technique', TechniqueViewSet)
router.register(r'servicecomp', ServiceCompanyViewSet)
router.register(r'engine', EngineViewSet)
router.register(r'trasmission', TransmissionViewSet)
router.register(r'cont_bridge', ControlledBridgeViewSet)
router.register(r'drive_bridge', DriveBridgeViewSet)
router.register(r'view_to', ViewTOViewSet)
router.register(r'fail_node', FailureNodeViewSet)
router.register(r'rec_method', RecoveryMethodViewSet)

# urlpatterns = [
#     path('car', include(router.urls)),
# ]

urlpatterns = [
    # path('cars', CarViewSet.as_view(), name='cars'),
    path('api/', include(router.urls)),
    path('user/', UserView.as_view(), name='user-list'),
    path('cars/find/<str:factory_number>/', CarDetailNoRegViewSet.as_view(), name='car-find'),
    path('cars/', CarListView.as_view(), name='cars-list'),
    path('to/', TOListView.as_view(), name='to-list'),
    path('complaints/', ComplaintsListView.as_view(), name='complaints-list'),
    path('client/', ClientListView.as_view(), name='clients-list'),
    path('company/', CompanyListView.as_view(), name='companies-list'),
]
