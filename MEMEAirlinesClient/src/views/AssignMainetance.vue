<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const maintenances = ref([]);
const employees = ref([]);
const assignments = ref([]);
const newAssignment = ref({
  maintenanceId: '',
  employeeId: ''
});

const fetchMaintenances = async () => {
  try {
    const response = await axios.get('/api/maintenances');
    maintenances.value = response.data;
  } catch (error) {
    alert('Error fetching maintenances');
    console.error('Error fetching maintenances:', error);
  }
};

const fetchEmployees = async () => {
  try {
    const response = await axios.get('/api/maintenteers');
    employees.value = response.data;
  } catch (error) {
    alert('Error fetching employees');
    console.error('Error fetching employees:', error);
  }
};

const fetchAssignments = async () => {
  try {
    const response = await axios.get('/api/assignments');
    assignments.value = response.data;
  } catch (error) {
    alert('Error fetching assignments');
    console.error('Error fetching assignments:', error);
  }
};

const submitForm = async () => {
  try {
    await axios.post('/api/assignments', newAssignment.value);
    alert('Assignment added successfully');
    await fetchAssignments();
  } catch (error) {
    alert('Error adding assignment');
    console.error('Error adding assignment:', error);
  }
};

onMounted(() => {
  fetchMaintenances();
  fetchEmployees();
  fetchAssignments();
});
</script>

<template>
  <div class="p-4 w-full">
    <div class="max-w-xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Assegna Manutenzione</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="maintenanceId" class="block text-sm font-medium text-gray-700">Intervento di Manutenzione</label>
          <select v-model="newAssignment.maintenanceId" id="maintenanceId" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
            <option v-for="maintenance in maintenances" :key="maintenance.ID" :value="maintenance.ID">{{maintenance.ID}} - {{ maintenance.Tipo }}</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="employeeId" class="block text-sm font-medium text-gray-700">Manutentore</label>
          <select v-model="newAssignment.employeeId" id="employeeId" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
            <option v-for="employee in employees" :key="employee.ID" :value="employee.ID">{{employee.ID}} - {{ employee.Nome }} {{ employee.Cognome }}</option>
          </select>
        </div>
        <button type="submit" class="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Assign</button>
      </form>
    </div>
    <table v-if="assignments.length" class="min-w-full mt-4 bg-white">
      <thead>
        <tr>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maintenance ID</th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="assignment in assignments" :key="`${assignment.InterventoDiManutenzione}-${assignment.Dipendente}`">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ assignment.InterventoDiManutenzione }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ assignment.Dipendente }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
</style>