# from django.shortcuts import render
# from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.decorators import parser_classes
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from api.models import Industrie, TypeService, SubService
from djongo.sql2mongo import SQLDecodeError


def getType(idReg):
        leng = len(idReg)
        if(leng < 2):
            return 'industrie'
        if(leng == 2):
            return 'service'
        if(leng == 3):
            return 'subservice'


class FileUploadView(APIView):
    parser_classes = (FileUploadParser,)

    def post(self, request, filename, format=None):
        strFile = request.data['file'].read().decode("utf-8")
        indexId = strFile.find("id|")
        strFile = strFile[indexId:]
        indexFin = strFile.find("----")
        for r in strFile[:indexFin].split('\n'):
            c = r.split("|")
            if(c[0][1:].isdigit()):
                typeToRegister = getType(c[0][1:])
                if(typeToRegister == 'industrie'):
                    try:
                        Industrie.objects.create(name=c[1], id=c[0])
                    except SQLDecodeError as e:
                        print(e)
                if(typeToRegister == 'service'):
                    try:
                        industrie = Industrie.objects.get(id=c[0][:-1])
                        TypeService.objects.create(name=c[1], industrie=industrie.id, id=c[0])
                    except SQLDecodeError as e:
                        print(e)

                if(typeToRegister == 'subservice'):
                    try:
                        typeService = TypeService.objects.get(id=c[0][:-1])
                        SubService.objects.create(name=c[1], typeservice=typeService.id, id=c[0])
                    except SQLDecodeError as e:
                        print(e)

        return self.create_response(request, {
                'success': True,
                'reason': 'Archivo creado',
                })
