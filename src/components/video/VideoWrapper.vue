<template>
  <div class="relative-position">
    <video-component
      :active="active"
      :new-time="videoNewTime"
      :project="project"
      :src="src"
      @loaded="(player) => onLoaded(player)"
      @updated="(player) => onUpdated(player)"
    />
    <video-player
      v-if="active"
      class="absolute-bottom"
      :duration="videoDuration"
      :project="project"
      :time="videoCurrentTime"
      @change="(value) => onChange(value)"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { uid } from "quasar";
import VideoComponent from "./VideoComponent.vue";
import VideoPlayer from "./VideoPlayer.vue";

defineOptions({ name: "VideoWrapper" });

const props = defineProps({
  active: { type: Boolean, default: false },
  background: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  loop: { type: Boolean, default: true },
  newTime: { type: Number, default: 0 },
  project: { type: Object, default: () => {} },
  src: {
    type: String,
    default:
      "https://jpi-sizzle-db-cloudformation-stack-source71e471f1-3k1wpecklum3.s3.amazonaws.com/netflix-new-logo-animation-2019.mp4",
  },
  skipBack: { type: Boolean, default: false },
  skipForward: { type: Boolean, default: false },
  type: { type: String, default: "video/mp4" },
});

const videoCurrentTime = ref(0);
const videoNewTime = ref(0);
const videoDuration = ref(0);
const videoSkipBack = ref(false);
const videoSkipForward = ref(false);
// const project = {
//   slug: {
//     current: uid(),
//   },
// };

const onChange = (value) => {
  videoNewTime.value = value;
};

const onLoaded = (player) => {
  videoDuration.value = player.duration();
};

const onUpdated = (player) => {
  videoCurrentTime.value = player.currentTime();
};

const onSkipBack = () => {
  videoSkipBack.value = !videoSkipBack.value;
};

const onSkipForward = () => {
  videoSkipForward.value = !videoSkipForward.value;
};
</script>
