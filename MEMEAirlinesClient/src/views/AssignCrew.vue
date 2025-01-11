<template>
    <div class="p-4 w-full">
        <div class="max-w-xl mx-auto">
            <h1 class="text-2xl font-bold mb-4">Assegna Personale di bordo</h1>
            <form @submit.prevent="assegnaPersonale()">
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Volo</label>
                    <select v-model="newAssignment.flightId" id="maintenanceId" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                        <option v-for="flight in flights" :key="flight.ID" :value="flight.ID">{{flight.ID}} - {{ flight.Origine }} to {{ flight.Destinazione }}</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Personale di bordo</label>
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
                    <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight ID</th>
                    <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="assignment in assignments" :key="`${assignment.Volo}-${assignment.Dipendente}`">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ assignment.Volo }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ assignment.Dipendente }}</td>
                </tr>
            </tbody>
        </table>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { onMounted } from 'vue';

export default {
    setup() {
        const assegnaPersonale = async () => {
            try {
                await axios.post('http://localhost:3000/api/flightCrewAssignments', newAssignment.value);
                alert('Assignment added successfully');
                await fetchAssignments();
                newAssignment.value.flightId = ''
                newAssignment.value.employeeId = ''
            } catch (error) {
                alert('Error adding assignment');
                console.error('Error adding assignment:', error);
            }
        }

        const flights = ref([])
        const employees = ref([])

        const newAssignment = ref({
            flightId: '',
            employeeId: ''
        })

        const assignments = ref([])

        const fetchAssignments = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/flightCrewAssignments');
                assignments.value = response.data;
            } catch (error) {
                alert('Error fetching flight crew assignments');
                console.error('Error fetching flight crew assignments:', error);
            }
        }

        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/flightCrewEmployees');
                employees.value = response.data;
                console.log(employees.value)
            } catch (error) {
                alert('Error fetching flight crew employees');
                console.error('Error fetching flight crew employees:', error);
            }
        }

        const fetchFlights = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/flights');
                flights.value = response.data;
                console.log(flights.value)
            } catch (error) {
                alert('Error fetching flights');
                console.error('Error fetching flights:', error);
            }
        }

        onMounted(() => {
            fetchAssignments()
            fetchEmployees()
            fetchFlights()
        })

        return {
            assegnaPersonale,
            newAssignment,
            assignments,
            employees,
            flights
        }
    }
}
</script>