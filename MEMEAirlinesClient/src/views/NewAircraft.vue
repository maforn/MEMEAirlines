<template>
  <div class="w-full p-4">
    <div class="max-w-xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Add New Aircraft</h1>
      <form @submit.prevent="addAircraft()">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Modello</label>
          <input v-model="modello" type="text" maxlength="50"
                 class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                 required>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Capacita</label>
          <input v-model="capacita" type="number"
                 class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                 required>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Costo</label>
          <input v-model="costo" type="number" min="0"
                 class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                 required>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Data di acquisto</label>
          <input v-model="dataAcquisto" type="datetime-local"
                 class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                 required>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Fornitore</label>
          <select v-model="fornitore" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
            <option value="" disabled>Select a supplier</option>
            <option v-for="supplier in suppliers" :key="supplier.Partita_IVA" :value="supplier.Partita_IVA">{{supplier.Partita_IVA}} - {{ supplier.Denominazione }}</option>
          </select>
        </div>
        <button type="submit"
                class="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Add Aircraft
        </button>
      </form>
    </div>

    <button @click="getAircrafts()" class="w-full py-2 px-4 mt-4 bg-green-600 text-white font-medium rounded-md shadow-sm
            hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Check Aircrafts
    </button>
    <table v-if="aircrafts.length" class="min-w-full mt-4 bg-white">
      <thead>
      <tr>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          ID
        </th>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Modello
        </th>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Capacita
        </th>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Costo
        </th>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Data di acquisto
        </th>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Fornitore
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="aircraft in aircrafts" :key="aircraft.ID">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ aircraft.ID }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ aircraft.Modello }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ aircraft.Capacita }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ aircraft.Costo }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ aircraft.Data_di_acquisto }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ aircraft.Fornitore }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {ref} from 'vue';
import axios from 'axios';

export default {
  setup() {
    const aircrafts = ref([])
    const getAircrafts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/aircrafts');
        aircrafts.value = response.data;
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    }

    const emptyForm = () => {
      modello.value = null
      capacita.value = null
      costo.value = null
      dataAcquisto.value = null
      fornitore.value = null
    }

    const modello = ref()
    const suppliers = ref([]);
    const capacita = ref()
    const costo = ref()
    const dataAcquisto = ref()
    const fornitore = ref()
    // called on form submit
    const addAircraft = async () => {
      const aircraft = {
        'modello': modello.value, 'capacita': capacita.value, 'costo': costo.value,
        'dataAcquisto': dataAcquisto.value, 'fornitore': fornitore.value
      }
      try {
        await axios.post('http://localhost:3000/api/aircrafts', aircraft);
        alert('Aircraft added successfully');
        emptyForm()
        await getAircrafts();
      } catch (error) {
        console.error('Error adding flight:', error);
      }
    }

    const checkSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/suppliers');
        suppliers.value = response.data;
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    checkSuppliers();

    return {
      aircrafts,
      getAircrafts,
      addAircraft,
      modello,
      capacita,
      costo,
      dataAcquisto,
      fornitore,
      suppliers
    }
  }
}
</script>