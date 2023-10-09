<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'home-links',
  props: {
    links: {
      type: Object as PropType<Service.Dashboard.Link[]>,
      required: true,
    },
  },
})
</script>

<template>
  <div
    class="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
  >
    <div
      v-for="link in links"
      :key="link.title"
      class="group col-span-1 flex flex-col rounded-md bg-white relative p-6 border border-gray-200"
    >
      <div>
        <span
          :class="link.icon.class"
          class="rounded-lg inline-flex p-3 ring-4 ring-white"
        >
          <base-icon
            :name="link.icon.name"
            aria-hidden="true"
            class="h-6 w-6"
          />
        </span>
      </div>
      <div class="mt-8">
        <h3 class="text-lg font-medium">
          <router-link
            :to="link.route"
            class="focus:outline-none"
          >
            <span
              aria-hidden="true"
              class="absolute inset-0"
            />
            {{ link.title }}
          </router-link>
        </h3>
        <p class="mt-2 text-sm text-gray-500">
          {{ link.description }}
        </p>
      </div>
      <span
        aria-hidden="true"
        class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
      >
        <svg
          class="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
          />
        </svg>
      </span>
    </div>
  </div>
</template>
