# from django.test import TestCase

import requests

s = requests.session()

# url = 'http://localhost:8000/accounts/twitter/login/?process=login'
# res = s.get(url=url)
# print res.status_code
# print res.content
#
# url = 'https://api.twitter.com/oauth/authenticate'
# data = {'authenticity_token': '',
#         'redirect_after_login': 'https://api.twitter.com/oauth/authenticate?oauth_token=',
#         'oauth_token': ''}
# res = s.post(url=url, json=data)
# print res.status_code
# print res.headers
#
#
# url = 'http://localhost:8000/api/authentication/user/details/2/'
# headers = {
#     'Content-Type': 'application/json',
#     'Authorization': 'Token f0dd621e6a6ac25983f9172828419e7b27d04f11',
#     'oauth_token': '',
# }
# payload = {
#     "id": "2",
#     "uuid": "a2893f298f344e2"
# }
# res = s.get(url=url, headers=headers, data=payload)
#
# print res.status_code
# print res.content
