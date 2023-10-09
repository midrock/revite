<script lang="ts">
import { defineComponent, ref } from 'vue'
import AppMenu from './components/app/app-menu.vue'
import AppHeader from './components/app/app-header.vue'
import NotifyKeeper from './components/notify/notify-keeper.vue'

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

export default defineComponent({
  components: {
    AppMenu,
    AppHeader,
    NotifyKeeper,
  },
  setup() {
    const mobileMenuOpen = ref(false)

    return {
      userNavigation,
      mobileMenuOpen,
    }
  },
})
</script>

<template>
  <suspense>
    <template #default>
      <div class="h-screen flex">
        <app-menu />
        <!-- Content area -->
        <div class="flex-1 flex flex-col overflow-hidden">
          <app-header />

          <main class="flex-1 overflow-y-auto bg-gray-50 p-6">
            <router-view />
          </main>
        </div>
        <notify-keeper />
      </div>
    </template>
  </suspense>
</template>
