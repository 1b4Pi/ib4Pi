import { ref } from "vue";
import { defineStore } from "pinia";

export const useVideoStore = defineStore("video", () => {
  const isPlaying = ref({});
  const muted = ref(true);
  const play = ref({});
  const playPause = ref(true);
  const volume = ref(1);

  return {
    isPlaying,
    muted,
    play,
    playPause,
    volume,
  };
});
