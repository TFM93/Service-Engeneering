from rest_framework import serializers
from allauth.account.models import EmailAddress


class EmailAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailAddress
        fields = '__all__'
        # fields = ('id', 'user', 'email', 'verified', 'primary', 'objects')
