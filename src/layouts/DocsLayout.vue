<template>
  <q-layout view="hHh lpR fFf" class="bg-black text-white">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
defineOptions({
  name: 'DocsLayout',
})
</script>
