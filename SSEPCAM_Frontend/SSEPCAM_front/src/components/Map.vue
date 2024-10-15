<template>
  <div class="flex justify-center items-center">
    <div id="map" 
         class="border-4 border-purple-500 rounded-lg shadow-2xl transition-transform transform hover:scale-110 hover:shadow-3xl focus-within:ring-4 focus-within:ring-purple-400 focus-within:ring-opacity-50" 
         style="height: 400px; width: 100%; max-width: 800px">
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-search/dist/leaflet-search.src.css'; // Importer les styles du plugin
import 'leaflet-search'; // Importer le plugin

export default {
  name: 'Map',
  setup() {
    onMounted(() => {
      // Initialisation de la carte centrée sur le Cameroun
      const map = L.map('map').setView([3.8480, 11.5021], 7); // Centre du Cameroun

      // Ajouter les tuiles de la carte (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Ajouter un marqueur au centre du Cameroun
      const marker = L.marker([3.8480, 11.5021]).addTo(map)
        .bindPopup('Cameroun')
        .openPopup();

      // Ajouter la barre de recherche
      const searchControl = new L.Control.Search({
        layer: L.layerGroup([marker]), // Chercher uniquement dans le groupe de couches contenant le marqueur
        initial: false,
        zoom: 10,
        marker: false
      });

      map.addControl(searchControl);
    });
  }
};
</script>

<style scoped>
#map {
  background-color: #f0f4f8; /* Soft background for loading state */
}

/* Adding smooth transitions for hover effects */
.transition-transform {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hover\:scale-110:hover {
  transform: scale(1.10); /* Zoom increased to 1.10 */
}
.hover\:shadow-3xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>
