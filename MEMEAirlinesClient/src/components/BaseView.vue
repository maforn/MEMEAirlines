<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
    <RouterLink to="/new-flight" class="btn">Inserire un nuovo volo disponibile</RouterLink>
    <RouterLink to="/new-customer" class="btn">Inserire un nuovo cliente</RouterLink>
    <RouterLink to="/sell-ticket" class="btn">Vendere un biglietto</RouterLink>
    <RouterLink to="/new-aircraft" class="btn">Inserire un nuovo aeromobile acquistato</RouterLink>
    <RouterLink to="/new-employee" class="btn">Inserire un nuovo dipendente</RouterLink>
    <RouterLink to="/new-maintenance" class="btn">Inserire una nuova manutenzione</RouterLink>
    <RouterLink to="/new-supplier" class="btn">Inserire un nuovo fornitore</RouterLink>
    <RouterLink to="/assign-crew" class="btn">Assegnare un membro dell’equipaggio ad un volo</RouterLink>
    <RouterLink to="/assign-maintenance" class="btn">Assegnare a un dipendente una manutenzione</RouterLink>
    <RouterLink to="/passenger-list" class="btn">Visualizzare l’elenco dei passeggeri a bordo</RouterLink>
    <RouterLink to="/user-tickets" class="btn">Visualizzare i biglietti acquistati da un utente e il relativo stato</RouterLink>
    <RouterLink to="/flight-hours" class="btn">Calcolare il numero di ore di volo di un aeromobile</RouterLink>
    <RouterLink to="/monthly-revenue" class="btn">Calcolare per il mese corrente il totale dell'incasso dei biglietti venduti</RouterLink>
    <RouterLink to="/employee-pay" class="btn">Calcolare la paga per il mese corrente per un dipendente</RouterLink>
    <RouterLink to="/flight-menus" class="btn">Visualizzare i menu disponibili per un volo</RouterLink>
    <RouterLink to="/supplier-list" class="btn">Visualizzare la lista dei fornitori</RouterLink>
    <RouterLink to="/cancel-flight" class="btn">Aggiornare lo stato del volo a cancellato</RouterLink>
  </div>
</template>

<script setup>
</script>

<style scoped>
.btn {
  @apply block p-4 bg-gray-100 border border-gray-300 rounded text-center text-gray-800 transition-colors duration-300;
}

.btn:hover {
  @apply bg-gray-200;
}
</style>