<script lang="ts">
import { defineComponent } from 'vue'
import { html } from '../terms.md'

export default defineComponent({
  name: 'terms-view',
  setup() {
    return {
      html,
    }
  },
})
</script>

<template>
  <div
    class="markup max-w-3xl mx-auto my-8"
    v-html="html"
  />
</template>
