<template>
  <div class="atropos" ref="atroposRef">
    <div class="atropos-scale">
      <div class="atropos-rotate">
        <div class="atropos-inner">
          <mark
            :class="[
              hover ? 'bg-primary' : 'bg-dark',
              $q.screen.lt.md ? 'text-h6' : 'text-h5',
            ]"
            class="q-px-sm text-white"
            >{{ section.title
            }}
              <q-icon
                v-if="hover"
                :class="{ 'rotate-90': active }"
                color="white"
                name="chevron_right"
            />
          </mark>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, nextTick, onMounted, ref } from "vue";

defineOptions({ name: "SectionRowLabel" });

const atropos = inject("atropos");
const atroposRef = ref(null);

const props = defineProps({
  active: { type: Boolean, default: false },
  hover: { type: Boolean, default: false },
  section: {
    type: Object,
    default: () => ({}),
  },
});

onMounted(async () => {
  await nextTick();

  const myAtropos = atropos({
    el: atroposRef.value,
  });
});
</script>
