<script lang="ts">
import { revite } from 'revite'
import { defineComponent } from 'vue'
import { NotesView } from '/~/views/notes'

export default defineComponent({
  name: 'create-note-widget',
  async setup() {
    const notesView = await revite.resolve(NotesView)

    return {
      notesView,
    }
  },
})
</script>

<template>
  <router-link
    :to="notesView.getCreateRoute()"
    class="flex flex-1"
  >
    <div
      class="bg-green-500 flex-shrink-0 flex items-center justify-center w-16 h-16 text-white text-sm font-medium rounded-l-md"
    >
      <base-icon
        class="w-8 h-8"
        name="plus"
      />
    </div>
    <div
      class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 font-medium bg-white rounded-r-md truncate px-4"
    >
      Create note
    </div>
  </router-link>
</template>
