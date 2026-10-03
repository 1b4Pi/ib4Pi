<template>
  <q-page class="column full-width">
    <q-scroll-area
      class="full-width mask-overflow-b"
      ref="scrollArea"
      :style="pageStyle"
      :thumb-style="thumbStyle"
      visible
    >
      <q-toolbar class="bg-primary">
        <q-toolbar-title> Chris Quezada </q-toolbar-title>
        <q-btn stretch flat label="About" no-caps @click="about = true" />
        <q-btn stretch flat label="Contact" no-caps @click="contact = true" />
      </q-toolbar>
      <template v-for="section in app.page.sections" :key="section._key">
        <div>
          <section-row
            :active="slug === section.slug.current"
            :height="height"
            :length="app.page.sections.length"
            :section="section"
            style="min-height: 113px"
            :width="pageSize.width"
          />
        </div>
      </template>
    </q-scroll-area>
    <q-dialog v-model="about">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">About</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="text-subtitle1">
          {{ metaDescription }}
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="contact">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Contact</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="text-subtitle1">
          <a class="text-white" style="text-decoration: none" :href="`mailto:${email}`">
            {{ email }}
          </a>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-resize-observer @resize="(size) => onResize(size)" />
  </q-page>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { scroll, useMeta } from 'quasar'
import { useAppStore } from 'src/stores/app'
import { useProjectsStore } from 'src/stores/projects'
import { urlFor } from 'src/boot/sanityUrlFor'
import SectionRow from 'src/components/section/SectionRow.vue'

const { getScrollTarget, setVerticalScrollPosition } = scroll

const router = useRouter()

const appStore = useAppStore()
const { app } = storeToRefs(appStore)

const projectsStore = useProjectsStore()
const { slug } = storeToRefs(projectsStore)

const about = ref(false)
const contact = ref(false)
const email = ref('')
const isClient = ref(false)
const pageSize = ref({ width: 0, height: 0 })
const thumbColor = ref('#fff')

const height = computed(() => pageSize.value.height / 8)
const pageStyle = computed(() => {
  return {
    height: '100dvh',
    overflowX: 'hidden',
  }
})
const slugParam = computed(() => router.currentRoute.value.params.section || null)
const currentSection = computed(() =>
  app.value.page.sections.find((section) => section.slug.current === slugParam.value),
)
const thumbStyle = computed(() => {
  return {
    borderRadius: '0px',
    backgroundColor: thumbColor.value,
    opacity: 0.6,
    zIndex: 999,
  }
})

const onResize = (size) => {
  pageSize.value = size
}

const scrollToElement = (id) => {
  if (!isClient.value) return
  const el = document.getElementById(id)
  if (el) {
    const target = getScrollTarget(el)
    const offset = el.offsetTop - 32
    const duration = 400
    setVerticalScrollPosition(target, offset, duration)
  }
}

const metaCardBackup = '/card.jpg'
const metaDescription = ref(
  'Chris Quezada is a multi-disciplinary storyteller that lifts people and brands as a Writer, Producer, Director, Editor, Brand Designer, Experience Designer, UI/UX Designer, Full-Stack Developer, Educator, and Scratch Baker.',
)
const metaImage = computed(() => {
  let image = metaCardBackup
  if (currentSection.value) {
    const imageUrl = currentSection.value.project.media[0].image?.asset?.url || null
    if (imageUrl) {
      image = urlFor(imageUrl).width(1200).height(630).url()
    }
  }
  return image
})

const metaTitle = computed(() => {
  let title = 'Chris Quezada'
  if (currentSection.value) {
    if (currentSection.value.title === title) {
      title += ' / About'
    } else {
      title += ` / ${currentSection.value.title}`
    }
  }
  return title
})

useMeta(() => {
  return {
    title: metaTitle.value,
    meta: {
      description: {
        name: 'description',
        content: metaDescription.value,
      },
      ogDescription: {
        property: 'og:description',
        content: metaDescription.value,
      },
      ogImage: {
        property: 'og:image',
        content: metaImage.value,
      },
      ogTitle: {
        property: 'og:title',
        content: metaTitle.value,
      },
    },
  }
})

onMounted(async () => {
  isClient.value = true
})

watch(
  slugParam,
  async (newSlugParam) => {
    slug.value = newSlugParam
    await nextTick()
    scrollToElement(slug.value)
  },
  { immediate: true },
)

watch(contact, async () => {
  email.value = contact.value ? ['chris', '@', '1b4pi.com'].join('') : ''
})
</script>
