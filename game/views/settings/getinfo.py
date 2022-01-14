from django.http import JsonResponse
from game.models.player.player import Player


def getinfo_lmapp(request):
    player = Player.objects.all()[0]    # 取出数据库中第一个用户(调试该功能)
    return JsonResponse({
        'result': "success",
        'username': player.user.username,
        'photo': player.photo,
    })


def getinfo_web(request):
    user = request.user;
    if not user.is_authenticated:
        return JsonResponse({
            'result':"未登录"
        })
    else:
        player = Player.objects.get(user=user)
        return JsonResponse({
            'result': "success",
            'username': player.user.username,
            'photo': player.photo,
        })


def getinfo(request):
    platform = request.GET.get('platform')
    if platform == "LMAPP":
        return getinfo_lmapp(request)
    elif platform == "WEB":
        return getinfo_web(request)
