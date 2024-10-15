import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router';  // Importez useRouter

export const useReportStore = defineStore('reportStore', {
  state: () => ({
    formData: {
      name: '',
      symptoms: '',
      date: '',
      contact: '',
      latitude: null,
      longitude: null,
    },
    reports: [],
    loading: false,
    error: null,
  }),
  actions: {
    // Méthode pour soumettre un rapport (accessible sans authentification)
    async submitReport() {
      // ... validation des champs du formulaire ...

      const payload = {
        name: this.formData.name,
        symptoms: this.formData.symptoms,
        date: this.formData.date,
        contact: this.formData.contact,
        latitude: this.formData.latitude,
        longitude: this.formData.longitude,
      };

      try {
        await axios.post('/api/reports/', payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Rapport soumis avec succès');
        // Réinitialiser le formulaire après soumission
        this.formData = {
          name: '',
          symptoms: '',
          date: '',
          contact: '',
          latitude: null,
          longitude: null,
        };
      } catch (error) {
        console.log('Erreur API :', error.response.data);
        alert(`Erreur: ${JSON.stringify(error.response.data)}`);
      }
    },

    // Méthode pour récupérer tous les rapports (nécessite authentification)
    async fetchReports() {
      this.loading = true;
      const token = localStorage.getItem('jwt_token');  // On récupère le token ici
      console.log('Token utilisé pour l\'autorisation:', token); 

      
      const router = useRouter();  // Instanciez le router
      
      if (!token) {
        console.error("Token JWT non trouvé. Redirection vers la page de connexion.");
        router.push('/login');  // Utilisez router.push ici
        return;
      }
    
      try {
        const response = await axios.get('/api/reports/', {
          headers: {
            'Authorization': `Bearer ${token}`,  // Assurez-vous qu'il y a bien un espace après 'Bearer'
            'Content-Type': 'application/json',
          },
        });
        this.reports = response.data;
        console.log('Rapports récupérés avec succès');
      } catch (error) {
        console.error('Erreur lors de la récupération des rapports:', error);
        this.error = 'Erreur lors de la récupération des rapports.';
        if (error.response?.status === 401) {
          return false;  // Token invalide ou session expirée
        }
      } finally {
        this.loading = false;
      }
    },
        

    // Méthode pour mettre à jour le statut d'un rapport (nécessite authentification)
    async updateReportStatus(reportId, status) {
      const token = localStorage.getItem('jwt_token');  // Utilisation du token ici aussi

      if (!token) {
        console.error("Token JWT non trouvé. Impossible de mettre à jour le statut.");
        return;
      }

      try {
        await axios.patch(`/api/reports/${reportId}/`, { status }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log(`Statut du rapport ${reportId} mis à jour à ${status}`);
        await this.fetchReports();  // On recharge les rapports après la mise à jour
      } catch (error) {
        console.error('Erreur lors de la mise à jour du statut:', error);
        alert(`Erreur: ${error.response?.data || 'Une erreur est survenue.'}`);
      }
    },
  },
});
