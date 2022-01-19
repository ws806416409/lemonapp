from django.http import JsonResponse
from urllib.parse import quote
from random import randint
from django.core.cache import cache


def get_state():
    res =""
    for i in range(8):
        res += str(randint(0,9))
    return res


def apply_code(request):
    client_id = "f3474bc0b2f21c82478d"
    redirect_uri = quote("https://limegame.top/settings/github/web/receive_code/")
    scope = "user"
    state = get_state()

    cache.set(state, True, 7200)       #state有效期两小时
    print(state)
    apply_code_url = "https://github.com/login/oauth/authorize/"
    return JsonResponse({
        'result': "success",
        'apply_code_url': apply_code_url + "?client_id=%s&redirect_uri=%s&scope=%s&state=%s" % (client_id, redirect_uri, scope, state)
    })
