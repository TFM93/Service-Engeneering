from django import forms


class add_uuid_form(forms.Form):
    uuid = forms.CharField(label='UUID', max_length=50, required=False, widget=forms.TextInput(attrs={'placeholder': 'UUID'}),
                           error_messages={'required': 'This UUID must exist and be in the format: 28916544'})
    code = forms.CharField(label='Code', max_length=50, required=True, widget=forms.TextInput(attrs={'placeholder': 'Code'}),
                           error_messages={'required': 'Code must be entered in the format: IH6HqA2'})


class add_phone_form(forms.Form):
    # phone = forms.IntegerField(label='Phone', max_value=999999999, required=True,
    #                            widget=forms.TextInput(attrs={'placeholder': 'Phone number'}))
    phone = forms.RegexField(regex=r'^\+?1?\d{9,9}$', widget=forms.TextInput(attrs={'placeholder': 'Phone number'}),
                             error_message="Phone number must be entered in the format: '999999999'.")
