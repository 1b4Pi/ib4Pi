<template>
  <q-list class="q-mb-lg" dense>
    <q-item>
      <q-item-section>
        <q-item-label caption class="text-white">
          {{ data.title }} / {{ data.newLocation }}
        </q-item-label>
        <q-item-label caption>
          {{ data.newYear }} / {{ data.newRole }}
        </q-item-label>
        <q-item-label caption>
          {{ data.newDescription }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
defineOptions({ name: "CvItem" });

const props = defineProps({
  data: { type: Object, default: () => {} },
});
</script>
