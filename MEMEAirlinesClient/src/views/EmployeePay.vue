<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg mt-4">
            <h1 class="text-3xl font-bold text-center text-indigo-600 mb-6">Paga mese corrente</h1>
            <div v-if="monthlyPay.length == 0" class="text-center py-6 px-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">Nessun dipendente selezionato</div>
            <div v-else class="text-center py-6 px-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                <p class="text-2xl font-semibold">€ {{ monthlyPay[0].Paga_mensile }}</p>
                <p class="mt-1 text-sm font-light">Paga per il mese corrente di {{ monthlyPay[0].Nome }} {{ monthlyPay[0].Cognome }} che svolge il mestiere di {{ monthlyPay[0].Ruolo }}</p>
            </div>
        </div>
        <label class="block text-sm font-medium text-gray-700 mt-4">Seleziona dipendente</label>
        <select v-model="employeeId" id="employeeId" class="mt-1 block py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
            <option v-for="employee in employees" :key="employee.ID" :value="employee.ID">{{employee.ID}} - {{ employee.Nome }} {{ employee.Cognome }}</option>
        </select>
        <button @click="calculateMonthlyPay()" class="w-1/2 mt-4 py-2 px-3 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Calcola</button>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';

export default {
    setup() {
        const employeeId = ref()

        const employees = ref()

        const monthlyPay = ref([])

        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/employees');
                employees.value = response.data;
                console.log(employees.value)
            } catch (error) {
                alert('Error fetching employees');
                console.error('Error fetching employees:', error);
            }
        }

        const calculateMonthlyPay = async () => {
            if (employeeId) {
                try {
                const response = await axios.get(`http://localhost:3000/api/monthlyPay/${employeeId.value}`);
                monthlyPay.value = response.data;
                console.log(monthlyPay.value)
                } catch (error) {
                    alert('Error retrieving employee\'s monthly pay');
                    console.error('Error retrieving employee\'s monthly pay:', error);
                }
            }
        }

        onMounted(() => {
            fetchEmployees()
        })

        return {
            employeeId,
            employees,
            monthlyPay,
            calculateMonthlyPay
        }
    }
}
</script>