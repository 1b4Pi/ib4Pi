<template>
  <q-btn
    class="backdrop-blur backdrop-dimmed q-mb-xs cursor-pointer"
    color="primary"
    :icon="symSharpRestartAlt"
    size="md"
    round
    unelevated
    @click="onClick()"
  />
</template>

<script setup>
import { symSharpRestartAlt } from '@quasar/extras/material-symbols-sharp'

defineOptions({ name: 'VideoMuteBtn' })

const emits = defineEmits(['restart'])

const onClick = () => {
  emits('restart')
}
</script>
