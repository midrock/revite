<script lang="ts">
import { defineComponent } from 'vue'
import { revite } from 'revite'
import { UiService } from '/~/services/ui'
import BaseIcon from '../base/base-icon.vue'

export default defineComponent({
  name: 'app-menu',
  components: {
    BaseIcon,
  },
  async setup() {
    const uiService = await revite.resolve(UiService)

    return {
      uiService,
    }
  },
})
</script>

<template>
  <div class="hidden w-28 bg-indigo-700 overflow-y-auto md:block">
    <div class="w-full py-6 flex flex-col items-center">
      <div class="flex-shrink-0 flex items-center">
        <img
          alt="Workflow"
          class="h-8 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
        >
      </div>
      <div class="flex-1 mt-6 w-full px-2 space-y-1">
        <router-link
          v-for="item in uiService.mainMenu"
          :key="item.title"
          :aria-current="item.current ? 'page' : undefined"
          :class="[item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-800 hover:text-white', 'group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium']"
          :to="item.route"
        >
          <base-icon
            :class="[item.current ? 'text-white' : 'text-indigo-300 group-hover:text-white', 'h-6 w-6']"
            :name="item.icon"
          />
          <span class="mt-2">
            {{ item.title }}
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>
