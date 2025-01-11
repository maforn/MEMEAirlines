<template>
  <form @submit.prevent="sellTicket" class="max-w-md mx-auto bg-white p-6 space-y-4">
    <h1 class="text-2xl font-bold text-center">Nuovo Biglietto</h1>
    <div>
      <label for="posto" class="block text-sm font-medium text-gray-700">Posto:</label>
      <div class="flex space-x-2">
        <select
            id="posto-lettera"
            v-model="postoLettera"
            required
            class="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="" disabled selected>Lettera</option>
          <option v-for="lettera in lettere" :key="lettera" :value="lettera">{{ lettera }}</option>
        </select>
        <select
            id="posto-numero"
            v-model="postoNumero"
            required
            class="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="" disabled selected>Numero</option>
          <option v-for="numero in numeri" :key="numero" :value="numero">{{ numero }}</option>
        </select>
      </div>
    </div>
    <div>
      <label for="classe" class="block text-sm font-medium text-gray-700">Classe:</label>
      <select
          id="classe"
          v-model="classe"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        <option value="" disabled selected>Seleziona una classe</option>
        <option value="Economy">Economy</option>
        <option value="Business">Business</option>
        <option value="First Class">First Class</option>
      </select>
    </div>
    <div>
      <label for="cliente" class="block text-sm font-medium text-gray-700">Cliente:</label>
      <select
          id="cliente"
          v-model="cliente"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        <option value="" disabled selected>Seleziona un cliente</option>
        <option v-for="c in clienti" :key="c.ID" :value="c.ID">{{ c.Nome }} {{c.Cognome}} {{c.Genere}} [{{c.Telefono}} - {{c.Email}}]</option>
      </select>
    </div>
    <div>
      <label for="volo" class="block text-sm font-medium text-gray-700">Volo:</label>
      <select
          id="volo"
          v-model="volo"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        <option value="" disabled selected>Seleziona un volo</option>
        <option v-for="f in voli" :key="f.ID" :value="f.ID">{{ f.Origine }} ({{f.Partenza_prevista}}) - {{ f.Destinazione }} ({{f.Arrivo_previsto}})</option>
      </select>
    </div>
    <div>
      <label for="menu" class="block text-sm font-medium text-gray-700">Menu:</label>
      <select
          id="menu"
          v-model="menu"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        <option value="" disabled selected>Seleziona un menu</option>
        <option v-for="m in menuDisponibili" :key="m.Nome" :value="{menu: m.Nome}">{{ m.Nome }} (€{{ m.Prezzo }})</option>
      </select>
    </div>
    <div>
      <label for="prezzoPagato" class="block text-sm font-medium text-gray-700">Prezzo Pagato (€):</label>
      <input
          type="number"
          id="prezzoPagato"
          v-model="prezzoPagato"
          required
          step="1.00"
          min="0"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          inputmode="decimal"
          aria-placeholder="0.00"

      />
    </div>
    <div>
      <div>
        <label for="numeroCarta" class="block text-sm font-medium text-gray-700">Numero Carta:</label>
        <input
            type="text"
            id="numeroCarta"
            v-model="numeroCarta"
            required
            maxlength="16"
            pattern="\d*"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
      </div>
      <div>
        <label for="cvv" class="block text-sm font-medium text-gray-700">CVV:</label>
        <input
            type="text"
            id="cvv"
            v-model="cvv"
            required
            maxlength="3"
            pattern="\d*"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
      </div>
      <div>
        <label for="dataScadenza" class="block text-sm font-medium text-gray-700">Data di Scadenza:</label>
        <div class="flex space-x-2" id="dataScadenza">
          <input
              type="text"
              id="meseScadenza"
              v-model="meseScadenza"
              required
              maxlength="2"
              pattern="^(0[1-9]|1[0-2])$"
              class="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
          <span>/</span>
          <input
              type="text"
              id="annoScadenza"
              v-model="annoScadenza"
              maxlength="2"
              pattern="^\d{2}$"
              required
              class="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
        </div>
      </div>
    </div>
    <button
        type="submit"
        class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      Vendi Biglietto
    </button>
  </form>
</template>

<script>
import {ref, computed, onMounted, watch} from "vue";
import axios from "axios";

export default {
  setup() {
    const lettere = ref(Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)));
    const numeri = ref(Array.from({ length: 60 }, (_, i) => i + 1));
    const clienti = ref([]);
    const voli = ref([]);
    const menuDisponibili = ref([]);
    const postoLettera = ref("");
    const postoNumero = ref("");
    const classe = ref("");
    const cliente = ref("");
    const volo = ref("");
    const menu = ref("");
    const prezzoPagato = ref(null);
    const numeroCarta = ref("");
    const cvv = ref("");
    const meseScadenza = ref("");
    const annoScadenza = ref("");


    const posto = computed(() => `${postoNumero.value}${postoLettera.value}`);

    const fetchClienti = async () => {
      try {

        const response = await axios.get('/api/customers');
        clienti.value = response.data;
      } catch (error) {
        console.error("Errore durante il caricamento dei clienti:", error);
      }
    };

    const fetchVoli = async () => {
      try {
        const response = await axios.get('/api/flights');
        voli.value = response.data;
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    const fetchMenu = async () => {
      try {
        const response = await axios.get(`/api/flights/${volo.value}/menus`);
        menuDisponibili.value = response.data;
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };



    const sellTicket = async () => {
      try {
        const response = await axios.post('/api/sellTicket', {
          posto: posto.value,
          classe: classe.value,
          cliente: cliente.value,
          volo: volo.value,
          menu: menu.value.menu,
          servizioDiCatering: menu.value.servizio,
          prezzoPagato: prezzoPagato.value,
          coordinateDiPagamento: `${numeroCarta.value} ${cvv.value} ${meseScadenza.value}/${annoScadenza.value}`
        });
        if (response.status === 201) {
          alert('Biglietto venduto con successo');
        } else {
          alert('Errore durante la vendita del biglietto');
        }

      } catch (error) {
        console.error('Errore durante la vendita del biglietto:', error);
      }
    };

    onMounted(fetchClienti);
    onMounted(fetchVoli);

    watch(volo, fetchMenu);

    return {
      lettere,
      numeri,
      clienti,
      voli,
      postoLettera,
      postoNumero,
      classe,
      cliente,
      volo,
      menu,
      prezzoPagato,
      posto,
      sellTicket,
      menuDisponibili,
      fetchMenu,
      numeroCarta,
      cvv,
      meseScadenza,
      annoScadenza
    };
  },
};
</script>
