<script lang="ts">
import {
  ChartBarIcon,
  DocumentTextIcon,
  HomeIcon,
  PencilIcon,
  PlusCircleIcon,
} from '@heroicons/vue/24/outline'
import { computed, defineComponent } from 'vue'

const ICONS = {
  home: HomeIcon,
  annotation: ChartBarIcon,
  document: DocumentTextIcon,
  pencil: PencilIcon,
  plus: PlusCircleIcon,
  chart: ChartBarIcon,
  menu: ChartBarIcon,
}

export default defineComponent({
  name: 'base-icon',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  async setup(props) {
    const icon = computed(() => {
      return ICONS[props.name]
    })

    return {
      icon,
    }
  },
})
</script>

<template>
  <component :is="icon" />
</template>
