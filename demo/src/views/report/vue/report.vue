<script lang="ts">
import { defineComponent } from 'vue'
import { getReport } from '/~/../../src/utils/report'

export default defineComponent({
  name: 'report-view',
  setup() {
    const report = getReport()

    return {
      report,
    }
  },
})
</script>

<template>
  <div>
    <h2 class="text-xl mb-4">
      Providers
    </h2>
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="border overflow-hidden border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Provider
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="providerReport in report.providers"
                  :key="providerReport.name"
                >
                  <td class="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ providerReport.name }}
                  </td>
                  <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    {{ providerReport.isLoaded ? 'Loaded' : 'Not loaded' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
