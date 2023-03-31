from rest_framework import serializers
from .models import Room, Desk, Booking, Bookable


class BookableSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Bookable
        fields = ('isBookable', 'reason', 'blockedAt')


class BookingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Booking
        fields = ('bookedAt', 'bookedBy', 'desk')


class DeskSerializer(serializers.HyperlinkedModelSerializer):

    bookable = BookableSerializer(many=True)
    bookings = BookingSerializer(many=True)

    class Meta:
        model = Desk
        fields = ('id', 'name', 'note', 'position', 'size', 'bookings', 'bookable', 'room')


class RoomSerializer(serializers.HyperlinkedModelSerializer):

    desks = DeskSerializer(many=True)
    bookable = BookableSerializer(many=True)

    class Meta:
        model = Room
        fields = ('id', 'name', 'desks', 'floorPlanUrl', 'size', 'bookable')
