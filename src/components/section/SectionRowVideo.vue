<template>
  <video
    v-if="src"
    v-intersection="options"
    ref="videoPlayer"
    playsinline
    :style="style"
    type="application/x-mpegURL"
  ></video>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useAppStore } from 'src/stores/app'
import { useVideoStore } from 'src/stores/video'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

defineOptions({ name: 'SectionRowVideo' })

const emits = defineEmits(['ended', 'loaded', 'updated'])

const props = defineProps({
  active: { type: Boolean, default: false },
  hover: { type: Boolean, default: false },
  poster: { type: String, default: '' },
  newTime: { type: Number, default: 0 },
  ratio: { type: Number, default: 16 / 9 },
  row: { type: Boolean, default: false },
  restart: { type: Boolean, default: false },
  section: {
    type: Object,
    default: () => ({}),
  },
  src: { type: String, default: '' },
  width: { type: Number, default: 480 },
})

const $q = useQuasar()
const appStore = useAppStore()
const { focused, userInteracted } = storeToRefs(appStore)
const videoStore = useVideoStore()
const { muted } = storeToRefs(videoStore)
const percent = ref(0)
const thresholds = []
for (let i = 0; i <= 1.0; i += 0.01) {
  thresholds.push(i)
}
const options = {
  handler(entry) {
    const val = (entry.intersectionRatio * 100).toFixed(0)
    if (percent.value !== val) {
      percent.value = val
    }
  },
  cfg: {
    threshold: thresholds,
  },
}
const style = computed(() => {
  return {
    height: `calc(${props.width}px / ${props.ratio})`,
    width: '100%',
  }
})
const videoPlayer = ref(null)
let player = null

const handleMute = (isMuted) => {
  if (!player) return
  const targetVolume = isMuted ? 0 : 1
  let currentVolume = player.volume()
  const step = 0.1
  const interval = 50
  if (!isMuted) {
    player.muted(false)
  }
  const fadeVolume = () => {
    const newVolume = isMuted
      ? Math.max(currentVolume - step, targetVolume)
      : Math.min(currentVolume + step, targetVolume)
    player.volume(newVolume)
    if (newVolume !== targetVolume) {
      currentVolume = newVolume
      setTimeout(fadeVolume, interval)
    } else if (isMuted) {
      player.muted(true)
    }
  }
  fadeVolume()
}

const handleSeek = (value) => {
  if (player) player.currentTime(value)
}

onMounted(async () => {
  await nextTick()
  player = videojs(videoPlayer.value, {
    autoplay: props.active,
    controls: false,
    fluid: false,
    hls: {
      limitRenditionByPlayerDimensions: true,
      useDevicePixelRatio: true,
    },
    limitRenditionByPlayerDimensions: true,
    loop: true,
    muted: true,
    poster: props.poster,
    preload: 'auto',
    useDevicePixelRatio: true,
  })
  player.src({ src: props.src })
  player.poster
  player.load()
  player.on('ended', () => {
    emits('ended', player)
  })
  player.on('loadeddata', () => {
    emits('loaded', player)
  })
  player.on('timeupdate', () => {
    emits('updated', player)
  })
})

watch(
  () => props.active,
  (isActive) => {
    if (props.row) return
    if (isActive) {
      player.play()
      handleMute(muted.value)
    } else {
      if (!props.hover) {
        player.pause()
        handleMute(true)
      }
    }
  },
)

watch(
  () => props.hover,
  async (hovering) => {
    if ($q.platform.is.mobile || props.row) return
    await nextTick()
    if (hovering) {
      player.play()
      handleMute(muted.value)
    } else {
      player.pause()
    }
  },
)

watch(
  () => props.restart,
  () => {
    handleSeek(0)
  },
)

watch(
  () => props.newTime,
  (time) => {
    handleSeek(time)
  },
)

watch(focused, (focus) => {
  if (!props.active) return
  if (focus) {
    player.play()
  } else {
    player.pause()
  }
})

watch(muted, (mute) => {
  handleMute(mute)
})

watch(userInteracted, (interacted) => {
  muted.value = false
})
</script>
