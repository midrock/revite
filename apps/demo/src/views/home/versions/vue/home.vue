<script lang="ts">
import { revite } from 'revite'
import { defineComponent } from 'vue'
import { HomeState } from '/~/views/home'
import HomeLinks from './components/home-links.vue'
import HomeWidgets from './components/home-widgets.vue'

export default defineComponent({
  name: 'home-view',
  components: {
    HomeLinks,
    HomeWidgets,
  },
  async setup() {
    const state = await revite.resolve(HomeState)

    return {
      state,
    }
  },
})
</script>

<template>
  <home-links :links="state.links" />
  <div class="mt-8">
    <home-widgets
      :widgets="state.widgets"
    />
  </div>
</template>
