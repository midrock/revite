<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'home-widgets',
  props: {
    widgets: {
      type: Object as PropType<Service.Dashboard.Widget[]>,
      required: true,
    },
  },
})
</script>

<template>
  <ul
    class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
    role="list"
  >
    <li
      v-for="(widget, idx) in widgets"
      :key="widget.order + idx"
      class="col-span-1 flex rounded-md"
    >
      <component :is="widget.component" />
    </li>
  </ul>
</template>
