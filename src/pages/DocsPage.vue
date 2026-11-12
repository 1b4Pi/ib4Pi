<template>
  <q-page class="flex flex-center">
    <div class="text-center q-pa-lg">
      <q-spinner v-if="loading" color="white" size="50px" />

      <template v-else-if="doc">
        <div class="text-h4 q-mb-md">
          {{ doc.title }}
        </div>

        <div class="text-body1 q-mb-lg">Your download should begin automatically.</div>

        <q-btn
          color="primary"
          label="Download PDF"
          icon="download"
          :href="downloadUrl"
          unelevated
          no-caps
        />
      </template>

      <div v-else class="text-h5">
        {{ error || 'Document not found' }}
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { sanityClient } from 'src/boot/sanity'

defineOptions({
  name: 'DocsPage',
})

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
})

const doc = ref(null)
const loading = ref(true)
const error = ref(null)

const DOC_QUERY = `
  *[_type == "doc" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "url": file.asset->url,
    "filename": file.asset->originalFilename
  }
`

const downloadUrl = computed(() => {
  if (!doc.value?.url) return undefined

  const filename = doc.value.filename || `${props.slug}.pdf`

  const url = new URL(doc.value.url)
  url.searchParams.set('dl', filename)

  return url.toString()
})

onMounted(async () => {
  try {
    doc.value = await sanityClient.fetch(DOC_QUERY, {
      slug: props.slug,
    })

    if (!doc.value?.url) {
      doc.value = null
      return
    }

    // Automatically download the PDF
    window.location.assign(downloadUrl.value)
  } catch (err) {
    console.error('Error fetching document:', err)
    error.value = 'Unable to download document'
  } finally {
    loading.value = false
  }
})
</script>
