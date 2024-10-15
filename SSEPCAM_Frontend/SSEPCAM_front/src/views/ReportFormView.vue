<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12">
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
      <h2 class="text-2xl font-bold text-green-600 mb-6 text-center">Signaler un Cas Suspect</h2>

      <form @submit.prevent="submitReport">
        <!-- Nom complet -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Nom complet</label>
          <input
            v-model="formData.name"
            type="text"
            id="name"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Entrez votre nom"
            required
          />
        </div>

        <!-- Latitude (lecture seule) -->
        <div class="mb-4">
          <label for="latitude" class="block text-sm font-medium text-gray-700">Latitude</label>
          <input
            v-model="formData.latitude"
            type="number"
            id="latitude"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Récupération automatique..."
            readonly
          />
        </div>

        <!-- Longitude (lecture seule) -->
        <div class="mb-4">
          <label for="longitude" class="block text-sm font-medium text-gray-700">Longitude</label>
          <input
            v-model="formData.longitude"
            type="number"
            id="longitude"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Récupération automatique..."
            readonly
          />
        </div>

        <!-- Symptômes -->
        <div class="mb-4">
          <label for="symptoms" class="block text-sm font-medium text-gray-700">Symptômes observés</label>
          <textarea
            v-model="formData.symptoms"
            id="symptoms"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            rows="4"
            placeholder="Décrivez les symptômes observés"
            required
          ></textarea>
        </div>

        <!-- Date de l'observation -->
        <div class="mb-4">
          <label for="date" class="block text-sm font-medium text-gray-700">Date de l'observation</label>
          <input
            v-model="formData.date"
            type="date"
            id="date"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <!-- Numéro de contact -->
        <div class="mb-4">
          <label for="contact" class="block text-sm font-medium text-gray-700">Numéro de contact</label>
          <input
            v-model="formData.contact"
            type="tel"
            id="contact"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Entrez votre numéro de contact"
          />
        </div>

        <!-- Bouton de soumission -->
        <div class="mt-6">
          <button
            type="submit"
            :disabled="!locationAcquired"
            class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-md shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            {{ locationAcquired ? 'Soumettre le Cas Suspect' : 'Obtention de la localisation...' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue';
import { useReportStore } from '@/stores/reportStore';
import { useToastStore } from '@/stores/toast';

const reportStore = useReportStore();
const toast = useToastStore();

// Formulaire réactif
const formData = reactive(reportStore.formData);
const locationAcquired = ref(false);  // Indicateur pour savoir si la localisation est acquise

// Fonction pour obtenir la localisation
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        formData.latitude = position.coords.latitude;
        formData.longitude = position.coords.longitude;
        locationAcquired.value = true;
      },
      (error) => {
        toast.showToast(3000, 'Erreur lors de la récupération de la localisation.', 'bg-red-500');
      }
    );
  } else {
    toast.showToast(3000, 'La géolocalisation n\'est pas prise en charge par ce navigateur.', 'bg-red-500');
  }
};

// Appel de la fonction pour récupérer la localisation dès le montage du composant
onMounted(() => {
  getLocation();
});

const submitReport = async () => {
  if (!locationAcquired.value) {
    toast.showToast(3000, 'Localisation non obtenue. Veuillez attendre.', 'bg-yellow-500');
    return;
  }

  try {
    await reportStore.submitReport();

    // Affichage d'une notification de succès
    toast.showToast(3000, 'Votre cas suspect a été soumis avec succès !', 'bg-green-500');

    // Réinitialiser le formulaire après soumission
    formData.name = '';
    formData.latitude = null;
    formData.longitude = null;
    formData.symptoms = '';
    formData.date = '';
    formData.contact = '';

    locationAcquired.value = false; // Réinitialiser l'état de localisation après la soumission
    getLocation(); // Récupérer la localisation à nouveau
  } catch (error) {
    // Affichage d'une notification d'erreur
    toast.showToast(3000, 'Une erreur est survenue lors de la soumission. Veuillez réessayer.', 'bg-red-500');
  }
};
</script>

<style scoped>
/* Styles spécifiques */
</style>
