# api/resources.py

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.urls import re_path
from tastypie.authorization import DjangoAuthorization
from tastypie.http import HttpUnauthorized, HttpForbidden
from tastypie.resources import ModelResource
from api.models import Industrie, SubService, TypeService
from tastypie.authorization import Authorization
from tastypie.authentication import SessionAuthentication
from tastypie.utils import trailing_slash
from django.middleware.csrf import get_token
from rest_framework.parsers import FileUploadParser


class IndustrieResource(ModelResource):
    class Meta:
        queryset = Industrie.objects.all()
        resource_name = 'industries'
        authorization = Authorization()

    parser_classes = (FileUploadParser,)
    def obj_create(self, bundle, **kwargs):
        print (kwargs)
        return Industrie.objects.get(pk=kwargs['pk'])

    def obj_get_list(self, bundle, **kwargs):
        industries = Industrie.objects.values()
        responseIndustrie = {"industrie": ""}
        arrayIndustrie = []
        arrayService = []
        arraySubService = []
        # for industrie in industries.iterator():
            # services = TypeService.objects.filter(industrie=industrie.id)
        #     for service in services.iterator():
        #         # service.children = SubService.objects.filter(typeservice=service.id)
        #         arraySubService.append(service)
        #     industrie.children = arrayService
        #     arrayService = []
        #     arrayIndustrie.append(industrie)
        print(industries[0])
        return Industrie.objects.all()


class SubServiceResource(ModelResource):
    class Meta:
        queryset = SubService.objects.all()
        resource_name = 'subservice'
        authorization = Authorization()


class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'register'
        excludes = ['email', 'password', 'is_superuser']
        # Add it here.
        authorization = DjangoAuthorization()
        authentication = SessionAuthentication()

    def override_urls(self):
        return [
            re_path(r"^(?P<resource_name>%s)/login%s$" %
                (self._meta.resource_name, trailing_slash()),
                self.wrap_view('login'), name="api_login"),
            re_path(r'^(?P<resource_name>%s)/logout%s$' %
                (self._meta.resource_name, trailing_slash()),
                self.wrap_view('logout'), name='api_logout'),
        ]

    def login(self, request, **kwargs):
        self.method_check(request, allowed=['post'])

        data = self.deserialize(request, request.body, format=request.META.get('CONTENT_TYPE', 'application/json'))

        username = data.get('username', '')
        password = data.get('password', '')

        user = authenticate(username=username, password=password)

        if user:
            if user.is_active:
                login(request, user)
                return self.create_response(request, {
                    'token': get_token(request)
                })
            else:
                return self.create_response(request, {
                    'success': False,
                    'reason': 'disabled',
                    }, HttpForbidden)
        else:
                return self.create_response(request, {
                    'success': False,
                    'reason': 'incorrect',
                    }, HttpUnauthorized)

    def logout(self, request, **kwargs):
        self.method_check(request, allowed=['get'])
        if request.user and request.user.is_authenticated:
            logout(request)
            return self.create_response(request, {'success': True})
        else:
            return self.create_response(request, {'success': False}, HttpUnauthorized)
