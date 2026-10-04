<template>
  <div
    :id="section.slug.current"
    @mouseenter="$q.platform.is.mobile ? null : (hover = true)"
    @mouseleave="$q.platform.is.mobile ? null : (hover = false)"
  >
    <router-link
      class="no-text-underline"
      :class="{ 'no-cursor-pointer': active }"
      :to="{
        name: 'section',
        params: { section: section.slug.current },
      }"
      style="display: block; min-height: 113px"
    >
      <div
        class="full-width relative-position"
        style="min-height: 113px; overflow: hidden"
        :style="styleNav"
      >
        <section-row-media
          :active="active"
          :height="height"
          :hover="hover"
          :length="length"
          :section="section"
          :width="width"
        />
        <div
          v-if="!active"
          :class="[
            $q.screen.lt.md ? 'q-pl-md' : 'q-pl-xl',
            active ? `items-start ${$q.screen.lt.md ? 'q-py-lg' : 'q-py-xl'}` : 'items-center',
          ]"
          class="absolute-full justify-between row z-top overflow-visible"
        >
          <section-row-label
            :active="active"
            class="cursor-pointer"
            :hover="active || hover"
            :section="section"
          />
        </div>
      </div>
      <div class="bg-primary text-white q-px-md q-py-md" v-if="active">
        <mark
          :class="[$q.screen.lt.md ? 'text-h6' : 'text-h5']"
          class="bg-primary q-pa-md text-white"
          >{{ section.title }}
          <q-icon :class="{ 'rotate-90': active }" color="white" name="chevron_right" />
        </mark>
        <div class="row q-pt-md">
          <div class="col col-xs-12 col-sm-6 q-px-md">
            <p v-if="section.project.description" class="text-body1" style="max-width: 60ch">
              {{ section.project.description }}
            </p>
          </div>
          <div class="col col-xs-12 col-sm-6 q-px-md">
            <p v-if="section.project.roles" class="text-subtitle2">
              {{ section.project.roles }}
            </p>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import SectionRowLabel from './SectionRowLabel.vue'
import SectionRowMedia from './SectionRowMedia.vue'

defineOptions({ name: 'SectionRow' })

const props = defineProps({
  active: { type: Boolean, default: false },
  length: { type: Number, default: 7 },
  section: {
    type: Object,
    default: () => ({}),
  },
  height: { type: Number, default: 960 },
  width: { type: Number, default: 480 },
})

const hover = ref(false)

const styleNav = computed(() => ({
  height: props.active
    ? `calc(${props.width}px / ${props.section.project.ratio || 16 / 9})`
    : `${props.height}px`,
}))
</script>
