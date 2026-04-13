<template>
    <!-- <div class="flex flex-center"> -->
    <div class="absolute-full">
       <section-row-video-wrapper
            v-if="section.project.media[0].videoUrl"
            :active="active"
            :class="active ? 'absolute-top' : 'absolute-center'"
            :hover="hover"
            :section="section"
            :width="width"
        />
        <section-row-swiper
            v-else-if="!$q.platform.is.mobile"
            :active="active"
            :class="active ? 'absolute-top' : 'absolute-center'"
            :hover="hover"
            :media="section.project.media"
            :ratio="section.project.ratio || 16 / 9"
            :width="width"
        />
        <image-component
            v-else
            :class="active ? 'absolute-top' : 'absolute-center'"
            :crop="false"
            :image="section.project.media[0].image"
            :ratio="section.project.ratio || 16 / 9"
        />
    </div>
</template>
<script setup>
import ImageComponent from '../image/ImageComponent.vue';
import SectionRowSwiper from './SectionRowSwiper.vue';
import SectionRowVideoWrapper from './SectionRowVideoWrapper.vue';


defineOptions({ name: "SectionRowMedia" });

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
});
</script>