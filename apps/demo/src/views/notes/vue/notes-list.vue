<script lang="ts">
import { revite } from 'revite'
import { defineComponent } from 'vue'
import { NotesServiceContract } from '/~/services/notes'
import { NotesView } from '/~/views/notes'
import NotesEmpty from './components/notes-empty.vue'

export default defineComponent({
  name: 'notes-list-view',
  components: {
    NotesEmpty,
  },
  async setup() {
    const notesView = await revite.resolve(NotesView)
    const notesService = await revite.resolve(NotesServiceContract)

    function onCreate() {
      return notesView.goCreate()
    }

    return {
      notesService,
      onCreate,
    }
  },
})
</script>

<template>
  <notes-empty v-if="notesService.isEmpty" />
  <div v-else>
    <button
      class="flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      type="button"
      @click="onCreate"
    >
      <base-icon
        class="w-6 h-6"
        name="plus"
      />
      <span class="ml-2">
        Create note
      </span>
    </button>
    <div class="grid gap-4 grid-cols-1 sm:grid-cols-3 mt-6">
      <div
        v-for="note in notesService.notes"
        :key="note.id"
        class="bg-white border rounded-lg p-4"
      >
        <div class="text-gray-500 text-xs mb-2">
          {{ note.createDate }}
        </div>
        <div class="break-words">
          {{ note.text }}
        </div>
      </div>
    </div>
  </div>
</template>
