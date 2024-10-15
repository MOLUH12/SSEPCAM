<template>
  <div class="container mx-auto">
    <h2 class="text-3xl font-bold mb-6">Gestion des validations des cas suspects</h2>

    <!-- Indicateur de chargement -->
    <div v-if="loading" class="text-center">Chargement des rapports...</div>

    <!-- Message d'erreur -->
    <div v-if="error" class="text-red-500">{{ error }}</div>

    <!-- Tableau des rapports -->
    <table v-if="!loading && reports.length" class="min-w-full bg-white shadow-md rounded-lg">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">Nom</th>
          <th class="py-2 px-4 border-b">Localisation</th>
          <th class="py-2 px-4 border-b">Symptômes</th>
          <th class="py-2 px-4 border-b">Date</th>
          <th class="py-2 px-4 border-b">Statut</th>
          <th class="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="report in reports" :key="report.id">
          <td class="py-2 px-4 border-b">{{ report.name }}</td>
          <td class="py-2 px-4 border-b">{{ report.latitude }}, {{ report.longitude }}</td>
          <td class="py-2 px-4 border-b">{{ report.symptoms }}</td>
          <td class="py-2 px-4 border-b">{{ report.date }}</td>
          <td class="py-2 px-4 border-b">{{ report.status }}</td>
          <td class="py-2 px-4 border-b flex gap-2">
            <button
              v-if="report.status !== 'validé'"
              @click="updateStatus(report.id, 'validé')"
              class="bg-green-500 text-white px-4 py-2 rounded-md"
              :disabled="updating[report.id]"
            >
              Valider
            </button>
            <button
              v-if="report.status !== 'invalidé'"
              @click="updateStatus(report.id, 'invalidé')"
              class="bg-red-500 text-white px-4 py-2 rounded-md"
              :disabled="updating[report.id]"
            >
              Invalider
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Message si aucun rapport n'est disponible -->
    <div v-if="!loading && reports.length === 0" class="text-center text-gray-500">
      Aucun rapport disponible pour le moment.
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { useReportStore } from '@/stores/reportStore';
import { useRouter } from 'vue-router';

const router = useRouter();

const reportStore = useReportStore();
const { reports, loading, error, fetchReports, updateReportStatus } = reportStore;

// Récupérer le token JWT depuis le localStorage
const token = localStorage.getItem('jwt_token');

if (!token) {
  console.error('Token JWT non trouvé. Vous devez être connecté.');
  router.push('/login');  // Redirige vers la page de connexion si le token est absent
}

const updating = reactive({});  // Suivi du statut de mise à jour pour chaque rapport

// Charger les rapports au montage du composant
onMounted(async () => {
  try {
    console.log("Token utilisé pour l'autorisation:", token);
    if (!token) {
      console.error('Token JWT non trouvé. Vous devez être connecté.');
      router.push('/login');  // Utilisez router.push ici
      return; // Arrête l'exécution ici si le token est absent.
    }
    await fetchReports(token);  // Assurez-vous de passer le token ici.
    console.log('Rapports récupérés :', reports);
  } catch (err) {
    console.error('Erreur lors du chargement des rapports :', err);
  }
});



// Fonction pour mettre à jour le statut d'un rapport
const updateStatus = async (reportId, status) => {
  try {
    updating[reportId] = true;
    await updateReportStatus(reportId, status, token);
    console.log(`Statut du rapport ${reportId} mis à jour à ${status}`);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut du rapport :', error);
  } finally {
    updating[reportId] = false;
  }
};
</script>

