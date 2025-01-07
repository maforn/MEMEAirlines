<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const aircrafts = ref([]);
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
    console.log(response.data)
  } catch (error) {
    console.error('Error fetching aircrafts:', error);
  }
});

const submitForm = async () => {
  try {
    await axios.post('http://localhost:3000/api/flights', newFlight.value);
    alert('Flight added successfully');
  } catch (error) {
    console.error('Error adding flight:', error);
  }
};
</script>

<template>
  <div class="max-w-md mx-auto p-4">
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
      <div class="mb-4">
        <label for="partenzaEffettiva" class="block text-sm font-medium text-gray-700">Partenza Effettiva</label>
        <input v-model="newFlight.partenzaEffettiva" type="datetime-local" id="partenzaEffettiva" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      </div>
      <div class="mb-4">
        <label for="arrivoEffettivo" class="block text-sm font-medium text-gray-700">Arrivo Effettivo</label>
        <input v-model="newFlight.arrivoEffettivo" type="datetime-local" id="arrivoEffettivo" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      </div>
      <div class="mb-4">
        <label for="stato" class="block text-sm font-medium text-gray-700">Stato</label>
        <select v-model="newFlight.stato" id="stato" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
          <option value="" disabled>Select a status</option>
          <option value="pianificato">Pianificato</option>
          <option value="in volo">In Volo</option>
          <option value="completato">Completato</option>
          <option value="cancellato">Cancellato</option>
        </select>
      </div>
      <button type="submit" class="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Flight</button>
    </form>
  </div>
</template>

<style scoped>
</style>