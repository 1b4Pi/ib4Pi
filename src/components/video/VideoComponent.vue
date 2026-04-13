<template>
  <q-responsive :ratio="ratio">
    <video
      v-if="src"
      class="bg-dark video-js"
      ref="videoPlayer"
      playsinline
      :type="type"
    ></video>
  </q-responsive>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { uid } from "quasar";
import { useAppStore } from "src/stores/app";
import { useVideoStore } from "src/stores/video";
import videojs from "video.js";
import "video.js/dist/video-js.css";

defineOptions({ name: "VideoComponent" });

const emits = defineEmits(["ended", "loaded", "updated"]);

const props = defineProps({
  active: { type: Boolean, default: false },
  background: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  loop: { type: Boolean, default: true },
  newTime: { type: Number, default: 0 },
  mute: { type: Boolean, default: false },
  project: { type: Object, default: () => {} },
  poster: { type: String, default: "" },
  ratio: { type: Number, default: () => 16 / 9 },
  src: {
    type: String,
    default:
      "https://jpi-sizzle-db-cloudformation-stack-source71e471f1-3k1wpecklum3.s3.amazonaws.com/netflix-new-logo-animation-2019.mp4",
  },
  skipBack: { type: Boolean, default: false },
  skipForward: { type: Boolean, default: false },
  type: { type: String, default: "video/mp4" },
});

const appStore = useAppStore();
const { videoHasSound } = storeToRefs(appStore);
const videoStore = useVideoStore();
const { isPlaying, muted, play, playPause, volume } = storeToRefs(videoStore);
let player = null;
const videoPlayer = ref(null);
const visible = ref(false);
const computedActive = computed(() => props.active);
const computedNewTime = computed(() => props.newTime);
const computedSkipBack = computed(() => props.skipBack);
const computedSkipForward = computed(() => props.skipForward);
const slug = computed(
  () =>
    props.project?.reference?.slug?.current ||
    props.project?.slug?.current ||
    uid()
);
const videoSound = computed(
  () =>
    props.project?.reference?.videoHasSound ||
    props.project?.videoHasSound ||
    false
);

const handleMute = (mute) => {
  if (player) player.muted(mute);
};

const handlePause = () => {
  if (player) player.pause();
  isPlaying.value[slug.value] = { playing: false };
};

const handlePlay = () => {
  if (player) player.play();
  isPlaying.value[slug.value] = { playing: true };
  if (slug.value === "foundation") return;
  videoHasSound.value = videoSound.value;
};

const handleSeek = (value) => {
  if (player) player.currentTime(value);
};

const handleSkip = (back) => {
  if (player)
    player.currentTime(player.currentTime() + (10000 * back ? -1 : 1));
};

const handleVolume = (volume) => {
  if (player) player.volume(volume);
};

const onIntersection = (entry) => {
  visible.value = entry.isIntersecting;
};

onMounted(async () => {
  await nextTick();
  player = videojs(videoPlayer.value, {
    autoplay: props.active,
    controls: false,
    fluid: props.fluid,
    hls: {
      limitRenditionByPlayerDimensions: true,
      useDevicePixelRatio: true,
    },
    loop: props.loop,
    muted: props.mute,
    poster: props.poster,
    preload: "auto",
    useDevicePixelRatio: true,
  });
  player.src({ src: props.src });
  // player.poster;
  player.load();
  player.on("ended", () => {
    emits("ended", player);
  });
  player.on("loadeddata", () => {
    emits("loaded", player);
  });
  player.on("timeupdate", () => {
    emits("updated", player);
  });
});

watch(
  computedActive,
  (isActive) => {
    isActive ? handlePlay() : handlePause();
  },
  { immediate: true }
);

watch(computedNewTime, (time) => {
  handleSeek(time);
});

watch(computedSkipBack, () => {
  handleSkip(true);
});

watch(computedSkipForward, () => {
  handleSkip(false);
});

watch(muted, (mute) => {
  handleMute(mute);
});

watch(videoHasSound, (sound) => {
  if (slug.value !== "foundation") return;
  if (sound) {
    handlePause();
  } else {
    handlePlay();
  }
});

watch(
  play,
  (isPlaying) => {
    if (!computedActive.value) return;
    isPlaying[slug.value]?.playing ? handlePlay() : handlePause();
  },
  { deep: true }
);

watch(visible, (isVisible) => {
  if (!computedActive.value) return;
  isVisible ? handlePlay() : handlePause();
});

watch(volume, (vol) => {
  handleVolume(vol);
});
</script>
