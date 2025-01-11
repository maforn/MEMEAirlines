<script>
import axios from "axios";
import {onMounted, ref} from "vue";

export default {
  setup() {
    const newSupplier = ref({
      Partita_IVA: '',
      Denominazione: '',
      Nome: '',
      Cognome: '',
      Email: '',
      Telefono: '',
      Tipo: ''
    });

    const suppliers = ref([]);

    const submitForm = async () => {
      try {
        await axios.post('/api/supplier', newSupplier.value);
        alert('Supplier added successfully');
        await checkSuppliers();
      } catch (error) {
        console.error('Error adding supplier:', error);
      }
    };

    const checkSuppliers = async () => {
      try {
        const response = await axios.get('/api/suppliers');
        suppliers.value = response.data;
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    onMounted(() => {
      checkSuppliers();
    });

    return {
      newSupplier,
      suppliers,
      submitForm,
      checkSuppliers
    }

  }
}
</script>

<template>
  <div class="p-4 w-full">
    <div class="max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Add New Supplier</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="Partita_IVA" class="block text-sm font-medium text-gray-700">Partita_IVA</label>
        <input v-model="newSupplier.Partita_IVA" id="Partita_IVA" name="Partita_IVA" type="text" maxlength="11" pattern="\d*" autocomplete="Partita_IVA" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      </div>
      <div class="mb-4">
      <label for="Denominazione" class="block text-sm font-medium text-gray-700">Denominazione</label>
        <input v-model="newSupplier.Denominazione" id="Denominazione" name="Denominazione" type="text" autocomplete="Denominazione" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      </div>
      <div class="mb-4">
      <label for="Tipo" class="block text-sm font-medium text-gray-700">Tipo</label>
        <select v-model="newSupplier.Tipo" id="Tipo" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option value="aeromobili">Aeromobili</option>
          <option value="catering">Catering</option>
          <option value="manutenzione">Prodotti per la manutenzione</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="Nome" class="block text-sm font-medium text-gray-700">Nome</label>
        <input v-model="newSupplier.Nome" id="Nome" name="Nome" type="text" autocomplete="Nome" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      </div>
      <div class="mb-4">
        <label for="Cognome" class="block text-sm font-medium text-gray-700">Cognome</label>
        <input v-model="newSupplier.Cognome" id="Cognome" name="Cognome" type="text" autocomplete="Cognome" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      </div>
      <div class="mb-4">
        <label for="Email" class="block text-sm font-medium text-gray-700">Email</label>
        <input v-model="newSupplier.Email" id="Email" name="Email" type="email" autocomplete="Email" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      </div>
      <div class="mb-4">
        <label for="Telefono" class="block text-sm font-medium text-gray-700">Telefono</label>
        <input v-model="newSupplier.Telefono" id="Telefono" name="Telefono" type="text" autocomplete="Telefono" maxlength="10" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      </div>
      <div class="mb-4">
        <button type="submit" class="w-full py-2 px-3 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Supplier</button>
      </div>
    </form>
    </div>
    <h1 class="text-2xl font-bold mb-4">Suppliers</h1>
    <table class="min-w-full divide-y divide-gray-200">
  <thead class="bg-gray-50">
    <tr>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partita_IVA</th>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Denominazione</th>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cognome</th>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefono</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y divide-gray-200">
    <tr v-for="supplier in suppliers" :key="supplier.Partita_IVA">
      <td class="px-6 py-4 whitespace-nowrap">{{ supplier.Partita_IVA }}</td>
      <td class="px-6 py-4 whitespace-nowrap">{{ supplier.Denominazione }}</td>
      <td class="px-6 py-4 whitespace-nowrap">{{ supplier.Tipo }}</td>
      <td class="px-6 py-4 whitespace-nowrap">{{ supplier.Nome }}</td>
      <td class="px-6 py-4 whitespace-nowrap">{{ supplier.Cognome }}</td>
      <td class="px-6 py-4 whitespace-nowrap">{{ supplier.Email }}</td>
      <td class="px-6 py-4 whitespace-nowrap">{{ supplier.Telefono }}</td>
    </tr>
  </tbody>
</table>

</div>

</template>

<style scoped>

</style>