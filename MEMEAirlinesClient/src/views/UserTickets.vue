<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
const users = ref([]);
const tickets = ref([]);
const user = ref();

const fetchUsers = async () => {
  try {

    const response = await axios.get('http://localhost:3000/api/customers');
    users.value = response.data;
  } catch (error) {
    console.error("Errore durante il caricamento dei clienti:", error);
  }
  user.value = users.value[0];
};

const fetchTickets = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/user-tickets', {
      params: {
        cliente: user.value
      },
    });
    tickets.value = response.data;
  } catch (error) {
    console.error('Error fetching tickets:', error);
  }
};


onMounted(fetchUsers);
onMounted(fetchTickets);
</script>

<template>
  <div class="p-4 w-full">
    <div class="max-w-xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">User Tickets</h1>
      <div class="mb-4">
        <label for="user" class="block text-sm font-medium text-gray-700">User</label>
        <select v-model="user" id="user" name="user" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option v-for="user in users" :key="user.ID" :value="user.ID">{{ user.Nome }} {{ user.Cognome }}</option>
        </select>
      </div>
      <button @click="fetchTickets" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Fetch Tickets</button>
    </div>
    <div v-if="tickets.length > 0" class="mt-4">
      <h2 class="text-xl font-bold mb-2">Tickets</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-2 border-b">Stato</th>
              <th class="px-4 py-2 border-b">Posto</th>
              <th class="px-4 py-2 border-b">Classe</th>
              <th class="px-4 py-2 border-b">Prezzo Pagato</th>
              <th class="px-4 py-2 border-b">Origine</th>
              <th class="px-4 py-2 border-b">Destinazione</th>
              <th class="px-4 py-2 border-b">Partenza Prevista</th>
              <th class="px-4 py-2 border-b">Arrivo Previsto</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ticket in tickets" :key="ticket.ID" class="hover:bg-gray-100">
              <td class="px-4 py-2 border-b">{{ ticket.Stato }}</td>
              <td class="px-4 py-2 border-b">{{ ticket.Posto }}</td>
              <td class="px-4 py-2 border-b">{{ ticket.Classe }}</td>
              <td class="px-4 py-2 border-b">{{ ticket.Prezzo_pagato }}</td>
              <td class="px-4 py-2 border-b">{{ ticket.Origine }}</td>
              <td class="px-4 py-2 border-b">{{ ticket.Destinazione }}</td>
              <td class="px-4 py-2 border-b">{{ ticket.Partenza_prevista }}</td>
              <td class="px-4 py-2 border-b">{{ ticket.Arrivo_previsto }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>