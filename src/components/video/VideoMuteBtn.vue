<template>
  <q-btn
    class="backdrop-blur backdrop-dimmed q-mb-xs"
    color="primary"
    dense
    flat
    :icon="muted ? symSharpVolumeMute : symSharpVolumeUp"
    :size="$q.screen.gt.sm ? 'md' : 'sm'"
    square
    unelevated
    @click="onClick()"
  />
</template>

<script setup>
import { storeToRefs } from "pinia";
import {
  symSharpVolumeMute,
  symSharpVolumeUp,
} from "@quasar/extras/material-symbols-sharp";
import { useVideoStore } from "src/stores/video";

defineOptions({ name: "VideoMuteBtn" });

const videoStore = useVideoStore();
const { muted } = storeToRefs(videoStore);

const onClick = () => {
  muted.value = !muted.value;
};
</script>
