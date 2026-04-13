<template>
  <q-slider
    v-model="currentTime"
    color="primary"
    class="q-pt-xs"
    :min="0"
    :max="duration"
    @change="(value) => onChange(value)"
  />
</template>

<script setup>
import { computed, ref, watch } from "vue";

defineOptions({ name: "VideoSeekSlider" });

const emits = defineEmits(["change"]);

const props = defineProps({
  duration: { type: Number, default: 1 },
  time: { type: Number, default: 0 },
});

const computedTime = computed(() => props.time);
const currentTime = ref(props.time);

const onChange = (value) => {
  emits("change", value);
};

watch(computedTime, (newTime) => {
  currentTime.value = newTime;
});
</script>
