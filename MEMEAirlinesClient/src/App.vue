<script setup>
</script>

<template>
  <div>
    <nav class="bg-blue-500 p-4 flex justify-center shadow-md">
      <router-link to="/">
        <div class="flex gap-2 items-center justify-center">
          <img src="/logo.png" alt="MEME Airlines logo" class="w-10 h-10"/>
          <h1 class="cursor-pointer text-white text-2xl font-semibold">MEME Airlines</h1>
        </div>
      </router-link>
    </nav>
    <RouterView/>
  </div>
</template>

<style scoped>
</style>