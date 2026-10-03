<template>
  <div class="absolute-full full-width relative-position">
    <section-row-video
      :active="active"
      :class="active ? 'absolute-center' : 'absolute-center'"
      class="flex flex-center"
      :hover="hover"
      :new-time="videoNewTime"
      :poster="responsivePoster"
      :ratio="section.project.ratio || 16 / 9"
      :restart="videoRestart"
      :section="section"
      :src="section.project.media[0].videoUrl"
      :width="width"
      @loaded="(player) => onLoaded(player)"
      @updated="(player) => onUpdated(player)"
    />
    <div v-if="active" class="absolute-bottom full-width flex justify-between q-pa-sm">
      <video-restart-btn @restart="videoRestart = !videoRestart" />
      <video-mute-btn />
    </div>
  </div>
</template>
<script setup>
import { computed, inject, nextTick, onMounted, ref, watch } from 'vue'
import { urlFor } from 'src/boot/sanityUrlFor'
import SectionRowVideo from './SectionRowVideo.vue'
import VideoMuteBtn from '../video/VideoMuteBtn.vue'
import VideoRestartBtn from '../video/VideoRestartBtn.vue'
import { useResponsiveImageWidth } from 'src/composables/image/useResponsiveImageWidth'

const props = defineProps({
  active: { type: Boolean, default: false },
  hover: { type: Boolean, default: false },
  length: { type: Number, default: 7 },
  section: {
    type: Object,
    default: () => ({}),
  },
  height: { type: Number, default: 960 },
  width: { type: Number, default: 480 },
})

const videoCurrentTime = ref(0)
const videoDuration = ref(0)
const videoNewTime = ref(0)
const videoRestart = ref(false)

const responsiveWidth = computed(() => useResponsiveImageWidth(640))
const responsivePoster = computed(() => {
  const imageUrl = props.section.project.media[0].image?.asset?.url || null
  if (imageUrl) {
    return urlFor(imageUrl).width(Math.round(responsiveWidth.value)).url()
  }
  return null
})

const onLoaded = (player) => {
  videoDuration.value = player.duration()
}

const onUpdated = (player) => {
  videoCurrentTime.value = player.currentTime()
}
</script>
