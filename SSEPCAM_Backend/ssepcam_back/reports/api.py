from rest_framework import viewsets
from .models import Report
from .serializers import ReportSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer

    def get_permissions(self):
        # Permettre à n'importe qui de soumettre un rapport
        if self.action in ['create']:
            return [AllowAny()]
        # Seuls les utilisateurs authentifiés peuvent lister, récupérer ou mettre à jour un rapport
        if self.action in ['list', 'retrieve', 'update', 'partial_update']:
            return [IsAuthenticated()]
        # Par défaut, appliquer IsAuthenticated
        return [IsAuthenticated()]
