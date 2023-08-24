from rest_framework.authentication import SessionAuthentication


class CSRFDisabledSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return
