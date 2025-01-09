<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const employees = ref([]);
const newEmployee = ref({
  nome: '',
  cognome: '',
  ruolo: '',
  compensoOrario: '',
  oreAnnualiPreviste: ''
});

const submitForm = async () => {
  try {
    await axios.post('http://localhost:3000/api/employees', newEmployee.value);
    alert('Employee added successfully');
    await fetchEmployees();
  } catch (error) {
    alert('Error adding employee');
    console.error('Error adding employee:', error);
  }
};

const fetchEmployees = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/employees');
    employees.value = response.data;
  } catch (error) {
    alert('Error fetching employees');
    console.error('Error fetching employees:', error);
  }
};

onMounted(fetchEmployees);
</script>

<template>
  <div class="p-4 w-full">
    <div class="max-w-xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Add New Employee</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="nome" class="block text-sm font-medium text-gray-700">Nome</label>
          <input v-model="newEmployee.nome" type="text" id="nome" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
        </div>
        <div class="mb-4">
          <label for="cognome" class="block text-sm font-medium text-gray-700">Cognome</label>
          <input v-model="newEmployee.cognome" type="text" id="cognome" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
        </div>
        <div class="mb-4">
          <label for="ruolo" class="block text-sm font-medium text-gray-700">Ruolo</label>
          <input v-model="newEmployee.ruolo" type="text" id="ruolo" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
        </div>
        <div class="mb-4">
          <label for="compensoOrario" class="block text-sm font-medium text-gray-700">Compenso Orario</label>
          <input v-model="newEmployee.compensoOrario" type="number" id="compensoOrario" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
        </div>
        <div class="mb-4">
          <label for="oreAnnualiPreviste" class="block text-sm font-medium text-gray-700">Ore Annuali Previste (può essere NULL)</label>
          <input v-model="newEmployee.oreAnnualiPreviste" type="number" id="oreAnnualiPreviste" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>
        <button type="submit" class="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Employee</button>
      </form>
    </div>
    <button @click="fetchEmployees" class="w-full py-2 px-4 mt-4 bg-green-600 text-white font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Fetch Employees</button>
    <table v-if="employees.length" class="min-w-full mt-4 bg-white">
      <thead>
        <tr>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cognome</th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ruolo</th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compenso Orario</th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ore Annuali Previste</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.ID">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ employee.ID }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ employee.Nome }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ employee.Cognome }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ employee.Ruolo }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ employee.Compenso_orario }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ employee.Ore_annuali_previste }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
</style>