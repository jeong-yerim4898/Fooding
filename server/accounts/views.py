from django.shortcuts import render

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import FollowSerializer, UserSerializer, LikeSerializer
from .models import Follow, Like, User
from server.settings import SECRET_KEY

import jwt
import datetime


# Create your views here.
#회원가입
@api_view(['POST'])
def signup(request):
    # password = request.data.get('password')
    # password_confirm = request.data.get('passwordConfirm')

    # if password != password_confirm:
    #     return Response({'error': '비밀번호가 일치하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        if User.objects.filter(email=request.data.get('email')).exists():
            return Response({'message': '이미 존재하는 이메일입니다.'}, status=status.HTTP_400_BAD_REQUEST)

        User.objects.create(
            email=request.data.get('email'),
            nickname=request.data.get('nickname'),
            password=request.data.get('password'),
            address=request.data.get('address'),
            spoon_cnt=0,
        ).save()

        return Response(status=status.HTTP_201_CREATED)

    except KeyError:
        return Response({'error': 'KeyError'}, status=status.HTTP_400_BAD_REQUEST)


#로그인
@api_view(['POST'])
def login(request):
    if User.objects.filter(email=request.data.get('username')).exists():
        if User.objects.get(email=request.data.get('username')).password == request.data.get('password'):
            token = jwt.encode({
                'email': request.data.get('username'),
                'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=300),
                "iat": datetime.datetime.utcnow()
                },
                SECRET_KEY,
                algorithm="HS256"
            ).decode('UTF-8')

            return Response({'token': token}, status=status.HTTP_200_OK)

        else:
            return Response({'message': '입력된 이메일 혹은 비밀번호가 틀렸습니다'}, status=status.HTTP_400_BAD_REQUEST)
        
    else:
        return Response({'message': '존재하지 않는 이메일입니다'}, status=status.HTTP_400_BAD_REQUEST)
    

#회원별 회원정보 불러오기
@api_view(['GET'])
def user_info(request, id):
    if User.objects.filter(id=id).exists():
        user = User.objects.get(id=id)

        serializer = UserSerializer(user)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    else:
        return Response({'message':'회원정보가 존재하지 않습니다'}, status=status.HTTP_400_BAD_REQUEST)


#회원별 팔로워 불러오기
@api_view(['GET'])
def follower_info(request, id):
    if User.objects.filter(id=id).exists():
        follower = Follow.objects.filter(follow_id=id)

        serializer = FollowSerializer(follower, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    else:
        return Response({'message':'회원정보가 존재하지 않습니다'}, status=status.HTTP_400_BAD_REQUEST)


#회원별 팔로잉 불러오기
@api_view(['GET'])
def following_info(request, id):
    if User.objects.filter(id=id).exists():
        following = Follow.objects.filter(following_id=id)

        serializer = FollowSerializer(following, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    else:
        return Response({'message':'회원정보가 존재하지 않습니다'}, status=status.HTTP_400_BAD_REQUEST)


#회원별 좋아요(가게) 불러오기
@api_view(['GET'])
def like_info(request, id):
    if User.objects.filter(id=id).exists():
        like = Like.objects.filter(user_id=id)

        serializer = LikeSerializer(like, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    else:
        return Response({'message':'회원정보가 존재하지 않습니다'}, status=status.HTTP_400_BAD_REQUEST)