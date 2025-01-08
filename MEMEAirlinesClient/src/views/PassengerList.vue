<template>
    <div class="p-4 w-full">
        <div class="max-w-xl mx-auto">
            <h1 class="text-2xl text-center font-bold mb-4">Retrieve Passenger List</h1>
            <form @submit.prevent="submitForm">
                <div class="mb-4">
                    <label for="flight" class="block text-sm font-medium text-gray-700">Flight ID</label>
                    <select v-model="selectedFlightId" id="flight"
                        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option value="" disabled>Select a flight</option>
                        <option v-for="flight in flights" :key="flight.ID" :value="flight.ID">{{ flight.ID }}</option>
                    </select>
                </div>
                <button type="submit"
                    class="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Retrieve
                    Passenger List</button>
            </form>
        </div>
        <div class="max-w-xl p-4 mx-auto mt-8">
            <h1 class="text-2xl font-bold mb-4 text-center">Passenger List</h1>
            <div v-if="passengers.length === 0" class="text-center text-gray-500">No passengers found</div>
            <table v-else class="min-w-full bg-white">
                <thead>
                    <tr>
                        <th
                            class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nome</th>
                        <th
                            class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cognome</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="passenger in passengers" :key="passenger.ID">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ passenger.Nome }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ passenger.Cognome }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            flights: [],
            selectedFlightId: '',
            passengers: []
        };
    },
    methods: {
        async submitForm() {
            try {
                const response = await axios.get(`http://localhost:3000/api/passengers?flightId=${this.selectedFlightId}`);
                console.log(response.data);
                this.passengers = response.data;
            } catch (error) {
                alert('Error retrieving passenger list:', error);
            }
        },
        async getFlights() {
            try {
                const response = await axios.get('http://localhost:3000/api/flights');
                this.flights = response.data;
            } catch (error) {
                alert('Error fetching flights:', error);
            }
        }
    },
    async mounted() {
        await this.getFlights();
    }
};
</script>
