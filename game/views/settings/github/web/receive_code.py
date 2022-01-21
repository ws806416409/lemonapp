from django.shortcuts import redirect
from django.core.cache import cache
import requests
from django.contrib.auth.models import User
from game.models.player.player import Player
from django.contrib.auth import login
from random import randint


def receive_code(request):
    data = request.GET
    code = data.get('code')
    state = data.get('state')

    if not cache.has_key(state):
        return redirect("index")

    cache.delete(state)
    apply_access_token_url = "https://github.com/login/oauth/access_token/"
    params = {
            'client_id': "f3474bc0b2f21c82478d",
            'client_secret': "a3c25f10e3b455397ee2a8e96208eb483eb80d60",
            'code': code
            }
    header = {
            "accept":"application/json"
            }
    access_token_res = requests.get(apply_access_token_url, params=params,headers=header).json()
    access_token = access_token_res['access_token']
    openid = access_token

    '''
    players = Player.objects.filter(openid=openid)
    if players.exists():        #若用户已存在 无需重复获取信息 直接登录
        login(request, players[0].user)
        return redirect("index")
    '''
    get_userinfo_url = "https://api.github.com/user"
    access_token = 'token {}'.format(access_token)
    headers = {
            'accept': 'application/json',
            'Authorization': access_token
            }
    userinfo_res = requests.get(get_userinfo_url, headers=headers).json()
    username = userinfo_res['name']
    photo = userinfo_res['avatar_url']
    '''
    while User.objects.filter(username=username).exists():
        username += str(randint(0,9))
    '''
    players = Player.objects.filter(photo=photo)
    if players.exists():        #若用户已存在 无需重复获取信息 直接登录
        login(request, players[0].user)
        return redirect("index")

    user = User.objects.create(username=username)
    player = Player.objects.create(user=user, photo=photo, openid=openid)

    login(request, user)

    return redirect("index")
