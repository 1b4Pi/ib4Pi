<template>
  <div class="items-center justify-between q-px-sm row" ref="player">
    <div class="col-2 col-sm-1">
      <q-btn
        class="backdrop-blur backdrop-dimmed q-mb-xs"
        color="primary"
        dense
        flat
        :icon="symSharpRestartAlt"
        :size="$q.screen.gt.sm ? 'md' : 'sm'"
        square
        unelevated
        @click="onClick()"
      />
    </div>
    <div class="col">
      <video-seek-slider
        :duration="duration"
        :time="time"
        @change="(value) => onChange(value)"
      />
    </div>
    <div class="col-2 col-sm-1 text-right"><video-mute-btn /></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { symSharpRestartAlt } from "@quasar/extras/material-symbols-sharp";
import VideoSeekSlider from "./VideoSeekSlider.vue";
import VideoMuteBtn from "./VideoMuteBtn.vue";

defineOptions({ name: "VideoPlayer" });

const emits = defineEmits(["change", "restart"]);

const props = defineProps({
  duration: { type: Number, default: 1 },
  hover: { type: Boolean, default: false },
  project: { type: Object, default: () => {} },
  time: { type: Number, default: 0 },
});

const player = ref(null);

const onChange = (value) => {
  emits("change", value);
};

const onClick = () => {
  emits("restart");
};
</script>
