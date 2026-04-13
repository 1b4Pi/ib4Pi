<template>
  <div class="q-pt-xs" style="width: 100px">
    <q-slider v-model="volume" :step="0.1" :min="0" :max="1" />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useVideoStore } from "src/stores/video";

defineOptions({ name: "VideoVolumeSlider" });

const videoStore = useVideoStore();
const { volume } = storeToRefs(videoStore);
</script>
