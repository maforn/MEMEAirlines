<template>
    <table v-if="suppliers" class="min-w-full bg-white">
        <thead>
            <tr>
            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partita IVA</th>
            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Denominazione</th>
            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome Referente</th>
            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cognome Referente</th>
            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefono</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="supplier in suppliers" :key="supplier.Partita_IVA">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ supplier.Partita_IVA }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ supplier.Denominazione }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ supplier.Nome }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ supplier.Cognome }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ supplier.Email }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ supplier.Telefono }}</td>
            </tr>
        </tbody>
        </table>
</template>

<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';

export default {
    setup() {
        const suppliers = ref()

        const getSuppliers = async () => {
            try {
                const response = await axios.get('/api/suppliers');
                suppliers.value = response.data;
            } catch (error) {
                alert('Error fetching suppliers');
                console.error('Error fetching maintenances:', error);
            }
        }

        onMounted(() => {
            getSuppliers()
        })

        return {
            suppliers
        }
    }
}
</script>