<template>
    <q-page-sticky
    position="top-right"
    :offset="$q.screen.lt.md ? [16, 16] : [8, 8]"
    @click="onClick()"
  >
  <div>
    <q-btn
        color="primary"
        dense
        :icon="drawer ? 'close' : 'menu'"
        :size="`${$q.screen.lt.md ? 'md' : '18px'}`"
        square
        unelevated
    />
  </div>
  </q-page-sticky>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useAppStore } from "src/stores/app";

defineOptions({ name: "DrawerNav" });

const appStore = useAppStore();
const { drawer } = storeToRefs(appStore);

const onClick = () => {
  drawer.value = !drawer.value;
}

</script>
