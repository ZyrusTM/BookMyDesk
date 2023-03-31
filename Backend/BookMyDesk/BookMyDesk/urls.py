
from django.contrib import admin
from django.urls import path, include
from booking import urls as booking_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('booking/', include(booking_urls)),
]
