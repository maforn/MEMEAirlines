<template>
    <div class="p-4 w-full">
        <div class="max-w-xl mx-auto">
            <h1 class="text-2xl font-bold mb-4 text-center">Create New Maintenance</h1>
            <form @submit.prevent="submitForm">
                <div class="mb-4">
                    <label for="tipo" class="block text-sm font-medium text-gray-700">Tipo</label>
                    <input type="text" id="tipo" v-model="maintenance.tipo" required maxlength="50"
                        class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div class="mb-4">
                    <label for="data" class="block text-sm font-medium text-gray-700">Data</label>
                    <input type="datetime-local" id="data" v-model="maintenance.data" required
                        class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div class="mb-4">
                    <label for="durata" class="block text-sm font-medium text-gray-700">Durata (ore)</label>
                    <input type="number" id="durata" v-model="maintenance.durata" required min="1"
                        class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div class="mb-4">
                    <label for="aeromobile" class="block text-sm font-medium text-gray-700">Aeromobile</label>
                    <select id="aeromobile" v-model="maintenance.aeromobile" required
                        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option v-for="aeromobile in aircrafts" :key="aeromobile.ID" :value="aeromobile.ID">{{
                            aeromobile.ID}} ({{aeromobile.Modello }})</option>
                    </select>
                </div>
                <button type="submit"
                    class="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create
                    Maintenance</button>
            </form>
        </div>
        <div class="max-w-4xl p-4 mx-auto mt-8">
            <h1 class="text-2xl font-bold mb-4 text-center">Existing Maintenances</h1>
            <div v-if="maintenances.length === 0" class="text-center text-gray-500">No maintenances found</div>
            <table v-else class="min-w-full bg-white">
            <thead>
                <tr>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durata</th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aeromobile</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="maintenance in maintenances" :key="maintenance.ID">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ maintenance.ID }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ maintenance.Tipo }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ maintenance.Data }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ maintenance.Durata }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ maintenance.Aeromobile }}</td>
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
            maintenance: {
                tipo: '',
                data: '',
                durata: '',
                aeromobile: ''
            },
            aircrafts: [],
            maintenances: []
        };
    },
    methods: {
        async submitForm() {
            try {
                await axios.post('/api/maintenances', this.maintenance);
                alert('Maintenance added successfully!');
                await this.getMaintenances();
            } catch (error) {
                alert('Error adding maintenance:', error);
            }
        },
        async getAircrafts() {
            try {
                const response = await axios.get('/api/aircrafts');
                console.log(response.data);
                this.aircrafts = response.data;
            } catch (error) {
                alert('Error fetching aircrafts:', error);
            }
        },
        async getMaintenances() {
            try {
                const response = await axios.get('/api/maintenances');
                console.log(response.data);
                this.maintenances = response.data;
            } catch (error) {
                alert('Error fetching maintenances:', error);
            }
        },
        resetForm() {
            this.maintenance = {
                tipo: '',
                data: '',
                durata: '',
                aeromobile: ''
            };
        }
    },
    async mounted() {
        await this.getAircrafts();
        await this.getMaintenances();
    }
};
</script>