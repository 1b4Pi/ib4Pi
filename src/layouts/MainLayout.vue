<template>
  <q-layout view="hhh lpR fff">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onBeforeMount, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from 'src/stores/app'

defineOptions({ name: 'MainLayout' })

const appStore = useAppStore()
const { userInteracted } = storeToRefs(appStore)

const handleUserInteraction = () => {
  userInteracted.value = true
}

onBeforeMount(() => {
  document.removeEventListener('click', handleUserInteraction)
  document.removeEventListener('touchstart', handleUserInteraction)
})

onMounted(() => {
  document.addEventListener('click', handleUserInteraction)
  document.addEventListener('touchstart', handleUserInteraction)
})
</script>
