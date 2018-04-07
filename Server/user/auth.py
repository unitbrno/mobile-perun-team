from rest_framework.authentication import BasicAuthentication
from rest_framework import exceptions


class ApiAuth(BasicAuthentication):
    def get_client_ip(self):
        x_forwarded_for = self.request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[-1].strip()
        else:
            ip = self.request.META.get('REMOTE_ADDR')
        return ipaddress.ip_address(ip)

    def authenticate(self, request):
        self.request = request
        return super(ApiAuth, self).authenticate(request)

    def authenticate_credentials(self, userid, password):
        user, _ = super(ApiAuth, self).authenticate_credentials(userid, password)
        return (user, None)
