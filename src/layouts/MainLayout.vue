<template>
  <q-layout view="hHh lpR fFf">
    <q-drawer v-model="drawer" show-if-above bordered side="right">
      <drawer-tabs />
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onBeforeMount, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAppStore } from "src/stores/app";
import DrawerTabs from "src/components/drawer/DrawerTabs.vue";

defineOptions({ name: "MainLayout" });

const appStore = useAppStore();
const { drawer, userInteracted } = storeToRefs(appStore);

const handleUserInteraction = () => {
  userInteracted.value = true;
};

onBeforeMount(() => {
  document.removeEventListener("click", handleUserInteraction);
  document.removeEventListener("touchstart", handleUserInteraction);
});

onMounted(() => {
  document.addEventListener("click", handleUserInteraction);
  document.addEventListener("touchstart", handleUserInteraction);
});

</script>
