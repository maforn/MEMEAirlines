<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
const monthlyRevenue = ref(null);

const fetchMonthlyRevenue = async () => {
  try {
    const response = await axios.get('/api/monthly-revenue');
    monthlyRevenue.value = response.data[0].Totale_Incasso;
  } catch (error) {
    console.error('Error fetching monthly revenue:', error);
  }
};

onMounted(fetchMonthlyRevenue);

</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold text-center text-indigo-600 mb-6">Entrate Mensili</h1>
      <div v-if="monthlyRevenue === null" class="flex items-center justify-center h-20">
        <svg
            class="animate-spin h-10 w-10 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
          <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
          ></circle>
          <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
      <div
          v-else
          class="text-center py-6 px-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
      >
        <p class="text-2xl font-semibold">€ {{ monthlyRevenue }}</p>
        <p class="mt-1 text-sm font-light">Entrate totali del mese derivanti dalla vendita dei biglietti</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>