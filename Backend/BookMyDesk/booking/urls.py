
from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'rooms', views.RoomViewSet)
router.register(r'desks', views.DeskViewSet)
router.register(r'bookable', views.BookableViewSet)
router.register(r'booking', views.BookingViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
