<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const aircrafts = ref([]);
const flights = ref([]);
const newFlight = ref({
  aircraftId: '',
  origine: '',
  destinazione: '',
  partenzaPrevista: '',
  arrivoPrevisto: '',
  partenzaEffettiva: '',
  arrivoEffettivo: '',
  stato: ''
});

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/aircrafts');
    aircrafts.value = response.data;
  } catch (error) {
    console.error('Error fetching aircrafts:', error);
  }
});

const submitForm = async () => {
  try {
    await axios.post('http://localhost:3000/api/flights', newFlight.value);
    alert('Flight added successfully');
    await checkFlights();
  } catch (error) {
    console.error('Error adding flight:', error);
  }
};

const checkFlights = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/flights');
    flights.value = response.data;
  } catch (error) {
    console.error('Error fetching flights:', error);
  }
};
</script>

<template>
  <div class="p-4 w-full">
    <div class="max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Add New Flight</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="aircraft" class="block text-sm font-medium text-gray-700">Aircraft</label>
        <select v-model="newFlight.aircraftId" id="aircraft" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option value="" disabled>Select an aircraft</option>
          <option v-for="aircraft in aircrafts" :key="aircraft.ID" :value="aircraft.ID">{{ aircraft.ID }} - {{ aircraft.MODELLO }}</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="origine" class="block text-sm font-medium text-gray-700">Origine</label>
        <input v-model="newFlight.origine" type="text" id="origine" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
      </div>
      <div class="mb-4">
        <label for="destinazione" class="block text-sm font-medium text-gray-700">Destinazione</label>
        <input v-model="newFlight.destinazione" type="text" id="destinazione" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
      </div>
      <div class="mb-4">
        <label for="partenzaPrevista" class="block text-sm font-medium text-gray-700">Partenza Prevista</label>
        <input v-model="newFlight.partenzaPrevista" type="datetime-local" id="partenzaPrevista" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
      </div>
      <div class="mb-4">
        <label for="arrivoPrevisto" class="block text-sm font-medium text-gray-700">Arrivo Previsto</label>
        <input v-model="newFlight.arrivoPrevisto" type="datetime-local" id="arrivoPrevisto" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
      </div>
      <button type="submit" class="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Flight</button>
    </form>
    </div>
    <button @click="checkFlights" class="w-full py-2 px-4 mt-4 bg-green-600 text-white font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Check Flights</button>
    <table v-if="flights.length" class="min-w-full mt-4 bg-white">
      <thead>
        <tr>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origine</th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destinazione</th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partenza Prevista</th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrivo Previsto</th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stato</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="flight in flights" :key="flight.ID">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ flight.ID }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ flight.Origine }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ flight.Destinazione }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ flight.Partenza_prevista }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ flight.Arrivo_previsto }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ flight.Stato }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
</style>