# from django.test import TestCase
import requests

s = requests.session()

url = 'http://localhost:8000/api/authentication/user/register/uuid/'
headers = {
    'Content-Type': 'application/json',
    'X-CSRFToken': 'CXhYB2UugjkpW8bQsEO269dxeCoigj8T',
    'Authorization': 'Token bc5c07b1993cf54d05d965c1ffc8e6b024976888'
}
s.headers = headers
payload = '{"id": "2", "uuid": "2811111", "code": "test"}'
res = s.post(url=url, data=payload)
print res.status_code
print res.text
