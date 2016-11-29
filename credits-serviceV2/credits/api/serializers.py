from rest_framework import serializers
from core.models import PaymentsReceipt, UserCredits

class PaymentsReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentsReceipt
        field = '__all__'

class UserCreditsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCredits
        field = '__all__'