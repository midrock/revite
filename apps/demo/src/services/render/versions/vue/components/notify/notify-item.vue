<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { revite } from 'revite'
import { NotifyServiceContract } from '/~/services/notify'

const CLASSES = {
  body: {
    info: 'border-blue-200 bg-blue-50',
    success: 'border-green-200 bg-green-50',
    error: 'border-red-200 bg-red-50',
    warning: 'border-orange-200 bg-orange-50',
  },
  icon: {
    info: 'text-white bg-blue-500',
    success: 'text-white bg-green-500',
    error: 'text-white bg-red-500',
    warning: 'text-white bg-orange-500',
  },
}

export default defineComponent({
  name: 'notify-item',
  props: {
    item: {
      type: Object as PropType<Service.Notify.Item>,
      required: true,
    },
  },
  async setup(props) {
    const notifyService = await revite.resolve(NotifyServiceContract)

    function onClick() {
      notifyService.removeItem(props.item.id)
    }

    return {
      onClick,
    }
  },
  computed: {
    classes() {
      return {
        body: CLASSES.body[this.item.type],
        icon: CLASSES.icon[this.item.type],
      }
    },
  },
})
</script>

<template>
  <div class="w-full px-2 sm:p-0">
    <div
      class="flex mb-3 overflow-hidden font-sans rounded-r shadow-lg cursor-default"
      @click="onClick()"
    >
      <div
        :class="[
          classes.icon
        ]"
        class="px-1 rounded-l sm:px-3 sm:py-3"
        data-test="notify-icon"
      >
        <svg
          class="hidden w-8 h-8 sm:block"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            v-if="item.type === 'success'"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
          <path
            v-if="item.type === 'info'"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
          <path
            v-if="/warning|error/.test(item.type)"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
      </div>
      <div
        :class="[
          classes.body,
        ]"
        class="flex flex-col justify-center w-full px-3 py-3 space-y-2 border-t border-b border-r rounded-r sm:py-4 sm:px-5"
        data-test="notify-body"
      >
        <div
          v-if="item.title"
          class="font-medium leading-5"
          v-html="item.title"
        />
        <div
          v-if="item.text"
          class="text-sm leading-5"
          v-html="item.text"
        />
      </div>
    </div>
  </div>
</template>
