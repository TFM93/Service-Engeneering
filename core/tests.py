# from django.test import TestCase

import requests

s = requests.session()

url = 'https://esmickettodule.herokuapp.com/client/requestTicket'
res = s.post(url=url, data={"endpoint_id": "1", "ticket_type": "1"})
print res.status_code
print res.text


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
