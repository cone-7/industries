from djongo import models


class Industrie(models.Model):
    name = models.CharField(max_length=20, unique=True)


class TypeService(models.Model):
    name = models.CharField(max_length=20, unique=True)
    industrie = models.IntegerField()


class SubService(models.Model):
    name = models.CharField(max_length=30, unique=True)
    typeservice = models.IntegerField()
