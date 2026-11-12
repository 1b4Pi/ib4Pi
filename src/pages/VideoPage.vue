<template>
  <q-page class="bg-black flex flex-center">
    <div v-if="video" class="full-width video-container" data-vjs-player>
      <video ref="videoElement" class="video-js vjs-big-play-centered" playsinline></video>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

import { sanityClient } from 'src/boot/sanity'

defineOptions({
  name: 'VideoPage',
})

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
})

const video = ref(null)
const videoElement = ref(null)

let player = null

const VIDEO_QUERY = `
  *[_type == "video" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    url,
    "poster": poster.asset->url
  }
`

onMounted(async () => {
  video.value = await sanityClient.fetch(VIDEO_QUERY, {
    slug: props.slug,
  })

  if (!video.value) return

  await nextTick()

  player = videojs(videoElement.value, {
    controls: true,
    autoplay: false,
    preload: 'metadata',
    fluid: true,
    responsive: true,
    aspectRatio: '16:9',

    poster: video.value.poster,

    sources: [
      {
        src: video.value.url,
        type: 'application/x-mpegURL',
      },
    ],
  })
})

onBeforeUnmount(() => {
  if (player) {
    player.dispose()
    player = null
  }
})
</script>

<style scoped>
.video-container {
  max-width: 1920px;
}
</style>
