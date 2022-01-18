<script lang="ts">
import { defineComponent } from 'vue'
import { revite } from 'revite'
import { AuthServiceContract } from '/~/services/auth'

export default defineComponent({
  name: 'app-header',
  async setup() {
    const authService = await revite.resolve(AuthServiceContract)

    return {
      authService,
    }
  },
})
</script>

<template>
  <header class="w-full">
    <div class="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
      <div class="flex-1 flex items-center justify-between px-6">
        <h1 class="text-lg">
          Revite Vue Demo
        </h1>

        <div class="text-right">
          <div class="flex justify-end space-x-1">
            <span>
              {{ authService.user?.firstName }}
            </span>
            <span>
              {{ authService.user?.lastName }}
            </span>
          </div>

          <div class="text-gray-500 text-xs">
            {{ authService.user?.email }}
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
