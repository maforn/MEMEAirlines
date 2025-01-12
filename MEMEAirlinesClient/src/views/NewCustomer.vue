<template>
  <div class="p-4 w-full">
    <div class="max-w-xl mx-auto">
      <h1 class="text-2xl font-bold mb-4 text-center">Create New Customer</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="nome" class="block text-sm font-medium text-gray-700">Nome</label>
          <input type="text" id="nome" v-model="customer.nome" required maxlength="50"
                 class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
        </div>
        <div class="mb-4">
          <label for="cognome" class="block text-sm font-medium text-gray-700">Cognome</label>
          <input type="text" id="cognome" v-model="customer.cognome" required maxlength="50"
                 class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
        </div>
        <div class="mb-4">
          <label for="data_di_nascita" class="block text-sm font-medium text-gray-700">Data di Nascita</label>
          <input type="date" id="data_di_nascita" v-model="customer.data_di_nascita" required
                 class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
        </div>
        <div class="mb-4">
          <label for="genere" class="block text-sm font-medium text-gray-700">Genere</label>
          <select id="genere" v-model="customer.genere" required
                  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="documento_identificativo" class="block text-sm font-medium text-gray-700">Documento
            Identificativo</label>
          <input type="text" id="documento_identificativo" max="20" v-model="customer.documento_identificativo" required
                 class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
        </div>
        <div class="mb-4">
          <label for="telefono" class="block text-sm font-medium text-gray-700">Telefono</label>
          <input type="text" id="telefono" v-model="customer.telefono" required maxlength="10"
                 class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" v-model="customer.email" required maxlength="50"
                 class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
        </div>
        <button type="submit"
                class="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Create Customer
        </button>
      </form>
    </div>
    <div class="w-full max-w-7xl p-4 mx-auto mt-8">
      <h1 class="text-2xl font-bold mb-4 text-center">Existing Customers</h1>
      <div v-if="customers.length === 0" class="text-center text-gray-500">No customers found</div>
      <table v-else class="min-w-full bg-white">
        <thead>
        <tr>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ID
          </th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Nome
          </th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Cognome
          </th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Data di Nascita
          </th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Genere
          </th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Documento Identificativo
          </th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Telefono
          </th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Email
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="customer in customers" :key="customer.ID">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ customer.ID }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ customer.Nome }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ customer.Cognome }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ customer.Data_di_nascita }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ customer.Genere }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ customer.Documento_identificativo }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ customer.Telefono }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ customer.Email }}</td>
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
      customer: {
        nome: '',
        cognome: '',
        data_di_nascita: '',
        genere: '',
        documento_identificativo: '',
        telefono: '',
        email: ''
      },
      customers: []
    };
  },
  methods: {
    async submitForm() {
      try {
        await axios.post('/api/customers', this.customer);
        alert('Customer added successfully!');
        this.getCustomers();
      } catch (error) {
        alert('Error adding customer:', error);
      }
    },
    async getCustomers() {
      try {
        const response = await axios.get('/api/customers');
        console.log(response.data);
        this.customers = response.data;
      } catch (error) {
        alert('Error fetching customers:', error);
      }
    }
  },
  async mounted() {
    await this.getCustomers();
  }
};
</script>