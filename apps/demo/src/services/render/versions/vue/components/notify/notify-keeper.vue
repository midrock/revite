<script lang="ts">
import { defineComponent } from 'vue'
import { revite } from 'revite'
import { NotifyServiceContract } from '/~/services/notify'
import NotifyItem from './notify-item.vue'

export default defineComponent({
  name: 'notify-keeper',
  components: {
    NotifyItem,
  },
  async setup() {
    const notifyService = await revite.resolve(NotifyServiceContract)

    return {
      notifyService,
    }
  },
})
</script>

<template>
  <div
    class="right-0 top-0 fixed block w-full mt-2 sm:mt-4 sm:p-0 sm:mr-4 z-50 sm:w-80"
  >
    <transition-group
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="absolute transition-all duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      move-class="transition-all duration-300 ease-out"
    >
      <notify-item
        v-for="item in notifyService.items"
        :key="item.id"
        :item="item"
      />
    </transition-group>
  </div>
</template>
