<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-green-600 mb-8">Système de Surveillance Épidémiologique</h1>
      <p class="text-xl text-gray-700 mb-6">
        Surveillez et signalez les cas suspects à travers le territoire camerounais.
      </p>

      <!-- Animated Button to Report Suspicious Case -->
      <button
        @click="reportCase"
        class="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg animate-bounce hover:scale-110 transform transition-all duration-500 shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300"
      >
        Signaler un Cas Suspect
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    reportCase() {
      this.$router.push('/report')  // Redirige vers la vue nommée 'report'
    }
  }
}
</script>

<style scoped>
/* Custom Bounce Animation for the Button */
@keyframes pulse-animation {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.animate-bounce {
  animation: pulse-animation 2s infinite;
}
</style>
