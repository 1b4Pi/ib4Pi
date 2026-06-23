<template>
  <div :style="style">
    <swiper-container
      class="relative-postition"
      init="false"
      navigation="false"
      pagination="false"
      ref="swiper"
    >
      <swiper-slide
        v-for="slide in media"
        class="relative-position"
        :key="slide._key"
        :style="style"
      >
        <image-component v-if="slide.type === 'image'" crop :image="slide.image" :width="width" />
        <video-component v-else :src="slide.videoUrl" />
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { Autoplay, EffectFade } from 'src/boot/swiper'
import ImageComponent from 'src/components/image/ImageComponent.vue'
import VideoComponent from 'src/components/video/VideoComponent.vue'

defineOptions({ name: 'SectionRowSwiper' })

const props = defineProps({
  active: { type: Boolean, default: false },
  hover: { type: Boolean, default: false },
  media: { type: Array, default: () => [] },
  ratio: { type: Number, default: 16 / 9 },
  width: { type: Number, default: 480 },
})

const $q = useQuasar()
const swiper = ref(null)
const style = computed(() => {
  return {
    height: `calc(${props.width}px / ${props.ratio})`,
    width: `${props.width}px`,
  }
})

const params = {
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    waitForTransition: false,
  },
  centeredSlides: true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  grabCursor: false,
  injectStylesUrls: ['/css/fade-element.css'],
  loop: true,
  materialEffect: {
    slideSplitRatio: 0.65,
  },
  modules: [Autoplay, EffectFade],
  noSwiping: true,
  slidesPerView: 1,
  simulateTouch: false,
  spaceBetween: 0,
}

onMounted(() => {
  Object.assign(swiper.value, params)
  nextTick(() => {
    if (swiper.value) {
      swiper.value.initialize()
      if (props.active) {
        swiper.value.swiper.autoplay.start()
      } else {
        swiper.value.swiper.autoplay.stop()
      }
    }
  })
})

watch(
  () => props.active,
  async (active) => {
    if (!swiper.value) return
    if (active) {
      swiper.value.swiper.autoplay.start()
    } else {
      swiper.value.swiper.autoplay.stop()
    }
  },
)

watch(
  () => props.hover,
  async (hover) => {
    if ($q.platform.is.mobile) return
    if (!swiper.value) return
    if (hover) {
      swiper.value.swiper.autoplay.start()
    } else {
      swiper.value.swiper.autoplay.stop()
    }
  },
)
</script>
