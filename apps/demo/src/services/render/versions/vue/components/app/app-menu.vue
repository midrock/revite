<script lang="ts">
import { revite } from 'revite'
import { defineComponent } from 'vue'
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-10 text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
          />
        </svg>
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
