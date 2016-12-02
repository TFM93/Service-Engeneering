from django import forms


class add_uuid_form(forms.Form):
    uuid = forms.CharField(label='UUID', max_length=50, required=True, widget=forms.TextInput(attrs={'placeholder': 'UUID'}),)
    code = forms.CharField(label='Code', max_length=50, required=True, widget=forms.TextInput(attrs={'placeholder': 'Code'}))
