<script setup>
import {ref, onMounted, watch} from 'vue';
import axios from 'axios';

const flights = ref([]);
const selectedFlightId = ref('');
const tickets = ref([]);

const fetchFlights = async () => {
  try {
    const response = await axios.get('/api/flights');
    flights.value = response.data;
  } catch (error) {
    alert('Error fetching flights');
    console.error('Error fetching flights:', error);
  }
};

const fetchTickets = async (flightId) => {
  try {
    const response = await axios.get(`/api/flights/${flightId}/tickets`);
    tickets.value = response.data;
  } catch (error) {
    alert('Error fetching tickets');
    console.error('Error fetching tickets:', error);
  }
};

const cancelFlight = async () => {
  if (!selectedFlightId.value) return;
  try {
    await axios.post(`/api/flights/${selectedFlightId.value}/cancel`);
    alert('Flight cancelled successfully');
    await fetchFlights();
  } catch (error) {
    alert('Error cancelling flight');
    console.error('Error cancelling flight:', error);
  }
  await fetchTickets(selectedFlightId.value);
};

watch(selectedFlightId, (newFlightId) => {
  if (newFlightId) {
    fetchTickets(newFlightId);
  } else {
    tickets.value = [];
  }
});

onMounted(() => {
  fetchFlights();
});
</script>

<template>
  <div class="p-4 w-full">
    <div class="max-w-xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Cancel Flight</h1>
      <div class="mb-4">
        <label for="flightId" class="block text-sm font-medium text-gray-700">Select Flight to Cancel</label>
        <select v-model="selectedFlightId" id="flightId"
                class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option value="" disabled>Select a flight</option>
          <option v-for="flight in flights" :key="flight.ID" :value="flight.ID">{{flight.ID}} - {{ flight.Origine }} -
            ({{ flight.Stato }})
          </option>
        </select>
      </div>
      <button @click="cancelFlight"
              class="w-full py-2 px-4 bg-red-600 text-white font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
        Cancel Flight
      </button>
    </div>
    <div v-if="tickets.length" class="mt-4">
      <h2 class="text-xl font-bold mb-2">Tickets for Flight {{ selectedFlightId }}</h2>
      <table class="min-w-full bg-white">
        <thead>
        <tr>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Ticket ID
          </th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Seat
          </th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Class
          </th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Check-in Time
          </th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Customer Name
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="ticket in tickets" :key="ticket.ID">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ ticket.ID }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ ticket.Stato }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ ticket.Posto }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ ticket.Classe }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ ticket.Orario_check_in }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ ticket.Nome }} {{ ticket.Cognome }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
</style>