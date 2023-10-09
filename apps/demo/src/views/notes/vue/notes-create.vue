<script lang="ts">
import { revite } from 'revite'
import { defineComponent, ref } from 'vue'
import { NotesServiceContract } from '/~/services/notes'
import { NotesView } from '../NotesView'

export default defineComponent({
  name: 'notes-create-view',
  async setup() {
    const text = ref('')
    const notesView = await revite.resolve(NotesView)
    const notesService = await revite.resolve(NotesServiceContract)

    async function onCreate() {
      await notesService.createNote({
        id: String(Date.now()),
        text: text.value,
      })

      return notesView.toList()
    }

    return {
      text,
      onCreate,
    }
  },
})
</script>

<template>
  <div class="max-w-md mx-auto">
    <h2 class="text-xl">
      Create note
    </h2>
    <div class="mt-4">
      <textarea
        v-model="text"
        class="border focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-200 rounded-md p-4"
        name="comment"
        rows="10"
      />
    </div>
    <div class="mt-4 flex justify-center">
      <button
        :disabled="!text"
        class="w-40 text-center px-4 py-2 border disabled:bg-gray-400 border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="button"
        @click="onCreate"
      >
        Create
      </button>
    </div>
  </div>
</template>
