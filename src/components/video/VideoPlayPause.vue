<template>
  <q-btn
    class="backdrop-blur backdrop-dimmed q-mb-xs"
    color="primary"
    dense
    flat
    :icon="projectIsPlaying ? symSharpPause : symSharpPlayArrow"
    :size="$q.screen.gt.sm ? 'md' : 'sm'"
    square
    unelevated
    @click="onClick()"
  />
</template>

<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import {
  symSharpPlayArrow,
  symSharpPause,
} from "@quasar/extras/material-symbols-sharp";
import { useVideoStore } from "src/stores/video";

defineOptions({ name: "VideoPlayPause" });

const props = defineProps({
  project: { type: Object, default: () => {} },
});

const videoStore = useVideoStore();
const { isPlaying, play } = storeToRefs(videoStore);
const slug = computed(
  () => props.project.reference?.slug?.current || props.project.slug.current
);

const projectIsPlaying = computed(
  () => isPlaying.value[slug.value]?.playing || false
);

const onClick = () => {
  play.value[slug.value] = { playing: !projectIsPlaying.value };
};
</script>
