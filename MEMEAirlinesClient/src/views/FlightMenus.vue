<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const flights = ref([]);
const selectedFlightId = ref('');
const menus = ref([]);

const fetchFlights = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/flights');
    flights.value = response.data;
  } catch (error) {
    alert('Error fetching flights');
    console.error('Error fetching flights:', error);
  }
};

const fetchMenus = async () => {
  if (!selectedFlightId.value) return;
  try {
    const response = await axios.get(`http://localhost:3000/api/flights/${selectedFlightId.value}/menus`);
    menus.value = response.data;
  } catch (error) {
    alert('Error fetching menus');
    console.error('Error fetching menus:', error);
  }
};

onMounted(() => {
  fetchFlights();
});

watch(selectedFlightId, fetchMenus);
</script>

<template>
  <div class="p-4 w-full">
    <div class="max-w-xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Available Flight Menus</h1>
      <div class="mb-4">
        <label for="flightId" class="block text-sm font-medium text-gray-700">Select Flight</label>
        <select v-model="selectedFlightId" id="flightId" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option value="" disabled>Select a flight</option>
          <option v-for="flight in flights" :key="flight.ID" :value="flight.ID">{{flight.ID}} - {{ flight.Origine }} - {{ flight.Destinazione }}</option>
        </select>
      </div>
      <table v-if="menus.length" class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="menu in menus" :key="menu.Nome">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ menu.Nome }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ menu.Descrizione }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ menu.Prezzo }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else class="text-2xl">
        No menus available for this flight
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>