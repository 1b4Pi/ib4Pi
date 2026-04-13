<template>
  <q-btn :label="label" @click="onClick()" />
</template>

<script setup>
import { computed } from "vue";

defineOptions({ name: "VideoSkipBtn" });

const props = defineProps({
  back: { type: Boolean, default: false },
});

const label = computed(() => (props.back ? "<<" : ">>"));

const emits = defineEmits(["skipBack", "skipForward"]);

const onClick = () => {
  props.back ? emits("skipBack") : emits("skipForward");
};
</script>
