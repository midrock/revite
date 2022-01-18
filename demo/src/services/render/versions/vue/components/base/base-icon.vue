<script lang="ts">
import { computed, defineComponent } from 'vue'
import {
  AnnotationIcon,
  ChartBarIcon,
  DocumentTextIcon,
  HomeIcon,
  MenuAlt2Icon,
  PencilIcon,
  PlusCircleIcon,
} from '@heroicons/vue/outline'

const ICONS = {
  home: HomeIcon,
  annotation: AnnotationIcon,
  document: DocumentTextIcon,
  pencil: PencilIcon,
  plus: PlusCircleIcon,
  chart: ChartBarIcon,
  menu: MenuAlt2Icon,
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
