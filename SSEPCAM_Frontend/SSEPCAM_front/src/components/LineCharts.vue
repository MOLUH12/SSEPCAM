<template>
    <canvas ref="lineChart"></canvas>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  import { Chart, registerables } from 'chart.js'; // Importation manuelle des éléments nécessaires
  
  export default {
    props: ['data'],
    setup(props) {
      const lineChart = ref(null); // ref pour accéder au canvas
  
      onMounted(() => {
        if (lineChart.value) {
          Chart.register(...registerables); // Enregistrer manuellement les éléments de Chart.js
  
          const ctx = lineChart.value.getContext('2d'); // Assurez-vous que le ref est défini
          new Chart(ctx, {
            type: 'line',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [
                {
                  label: 'Nouveaux Cas',
                  data: props.data || [65, 59, 80, 81, 56, 55],
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 2,
                  fill: false,
                },
              ],
            },
          });
        } else {
          console.error('Canvas not found');
        }
      });
    },
  };
  </script>
  