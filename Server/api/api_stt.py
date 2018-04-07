import requests
from django.conf import settings
from pprint import pprint

class STTApiException(Exception):
    pass

class STTApiExceptionEndProcess(Exception):
    pass

class STTApi(object):
    def __init__(self):
        self.base_uri = settings.API_STT_BASE_URI
        self.auth = settings.API_STT_AUTH
        self.headers = {
            'Accept': 'application/json'
        }

    def technologies(self):
        r = requests.get(
            url='{base_uri}/{endpoint}'.format(
                base_uri=self.base_uri,
                endpoint='technologies'),
            headers=self.headers,
            auth=self.auth
        )
        if r.ok:
            return r.json()
        else:
            raise STTApiException(r.status_code)

    def get_results(self, result_url):
        r = requests.get(
            url='{base_uri}{endpoint}'.format(
                base_uri=self.base_uri,
                endpoint=result_url),
            headers=self.headers,
            auth=self.auth
        )
        if r.ok:
            return r.json()
        if r.status_code == 404:
            raise STTApiExceptionEndProcess()
        else:
            raise STTApiException(r.status_code)


api_stt = STTApi()
