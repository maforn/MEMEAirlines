<template>
    <div class="p-4 w-full">
        <div class="max-w-xl mx-auto">
            <h1 class="text-2xl text-center font-bold mb-4">Retrieve Flight Hours</h1>
            <form @submit.prevent="submitForm">
                <div class="mb-4">
                    <label for="aircraft" class="block text-sm font-medium text-gray-700">Aircraft ID</label>
                    <select v-model="selectedAircraftId" id="aircraft"
                        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option value="" disabled>Select an aircraft</option>
                        <option v-for="aircraft in aircrafts" :key="aircraft.ID" :value="aircraft.ID">{{ aircraft.ID }} ({{ aircraft.Modello }})</option>
                    </select>
                </div>
                <button type="submit"
                    class="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Retrieve
                    Flight Hours</button>
            </form>
        </div>
        <div class="mt-8 text-center text-lg font-semibold" v-if="result">
            {{ result }}
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            aircrafts: [],
            selectedAircraftId: '',
            result: ''
        };
    },
    methods: {
        async submitForm() {
            try {
                const response = await axios.get(`http://localhost:3000/api/flighthours?aircraftId=${this.selectedAircraftId}`);
                this.result = `Flight hours: ${response.data.hours} hours.`;
                console.log(response.data);
            } catch (error) {
                alert('Error retrieving flight hours:', error);
            }
        },
        async getAircrafts() {
            try {
                const response = await axios.get('http://localhost:3000/api/aircrafts');
                this.aircrafts = response.data;
            } catch (error) {
                alert('Error fetching aircrafts:', error);
            }
        }
    },
    async mounted() {
        await this.getAircrafts();
    }
};
</script>