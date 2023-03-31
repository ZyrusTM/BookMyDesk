from django.db import models
from django.contrib.postgres.fields import ArrayField


class Bookable(models.Model):
    isBookable = models.BooleanField()
    reason = models.CharField(max_length=40, blank=True)
    blockedAt = ArrayField(models.CharField(max_length=20), blank=True)

    def __str__(self):
        return self.isBookable


class Room(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=20, blank=True)
    floorPlanUrl = models.CharField(max_length=100, blank=True)
    size = ArrayField(models.IntegerField(), size=2, default=list)
    bookable = models.OneToOneField(Bookable, on_delete=models.CASCADE, default=True)

    def __str__(self):
        return self.name


class Desk(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=20, blank=True)
    note = models.CharField(max_length=20, blank=True)
    position = ArrayField(models.IntegerField(), size=2)
    size = ArrayField(models.IntegerField(), size=2, default=list)
    bookable = models.OneToOneField(Bookable, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Booking(models.Model):
    bookedAt = models.CharField(max_length=30)
    bookedBy = models.IntegerField()
    desk = models.ForeignKey(Desk, on_delete=models.CASCADE)