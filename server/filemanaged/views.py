from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.
@api_view(['POST'])
def fileupload(request):
    return Response(status=status.HTTP_200_OK)