<template>
  <div class="atropos cursor-pointer" ref="atroposRef">
    <div class="atropos-scale">
      <div class="atropos-rotate">
        <div class="atropos-inner">
          <q-btn
            color="primary"
            download
            :href="pdfLink"
            label="Download Resume"
            square
            no-caps
            target="_blank"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, nextTick, onMounted, ref } from "vue";

defineOptions({ name: "CvButton" });

const atropos = inject("atropos");
const atroposRef = ref(null);
const pdfLink = "/ChrisQuezada-CV.pdf";

onMounted(async () => {
  await nextTick();
  const myAtropos = atropos({
    el: atroposRef.value,
  });
});
</script>
