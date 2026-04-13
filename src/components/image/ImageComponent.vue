<template>
  <q-img :placeholder-src="placeholderSrc" :src="src" spinner-color="primary" />
</template>

<script setup>
import { computed } from "vue";
import { urlFor } from "src/boot/sanityUrlFor";
import { useResponsiveImageWidth } from "src/composables/image/useResponsiveImageWidth";

defineOptions({ name: "ImageComponent" });

const props = defineProps({
  crop: { type: Boolean, default: false },
  image: { type: Object, default: () => ({}) },
  ratio: { type: Number, default: 16 / 9 },
  width: { type: Number, default: 1024 },
});

const responsiveWidth = computed(() => useResponsiveImageWidth(props.width));

const placeholderSrc = computed(() => props.image.asset.metadata.lqip);

const src = computed(() => {
  const imageUrl = props.image.asset.url;
  if (imageUrl) {
    const width = Math.round(responsiveWidth.value);
    const height = Math.round(width / props.ratio);
    const url = props.crop
      ? urlFor(imageUrl).width(width).height(height).fit("crop").url()
      : urlFor(imageUrl).width(width).url();
    return url;
  }
  return null;
});
</script>
