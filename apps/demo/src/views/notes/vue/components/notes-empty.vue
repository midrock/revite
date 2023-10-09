<script lang="ts">
import { revite } from 'revite'
import { defineComponent } from 'vue'
import { NotesView } from '/~/views/notes'

export default defineComponent({
  name: 'notes-empty',
  async setup() {
    const notesView = await revite.resolve(NotesView)

    function onCreate() {
      return notesView.goCreate()
    }

    return {
      notesView,
      onCreate,
    }
  },
})
</script>

<template>
  <div class="text-center">
    <svg
      aria-hidden="true"
      class="mx-auto h-12 w-12 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        vector-effect="non-scaling-stroke"
      />
    </svg>
    <h3 class="mt-2 text-sm font-medium text-gray-900">
      Notes empty
    </h3>
    <p class="mt-1 text-sm text-gray-500">
      Get started by creating a new note.
    </p>
    <div class="mt-6">
      <button
        class="flex mx-auto items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
    </div>
  </div>
</template>
