<template>
  <form>
    <div class="space-y-12 px-4 pb-8 pt-2">
      <p class="max-w-2xl text-sm font-light leading-6 text-gray-600">
        These settings change the distances and forces acting on nodes and connections.
      </p>

      <div v-if="forceSettings" class="mt-6 space-y-8">
        <Slider v-model="forceSettings.chargeForce" title="Charge" description="Push / Pull factor of nodes on each other" min="-100" max="100" step="10" />

        <Slider v-model="forceSettings.linkDistance" title="Distance" description="Link distance between nodes" min="0" max="100" step="5" />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import type { ForceSettings } from '../../utils/types'
import Slider from './Slider.vue'

const forceSettings = ref<ForceSettings>()

onMounted(() => {
	fetchForceSettings()

	window.addEventListener('message', (event) => {
		const message = event.data // The JSON data our extension sent
		switch (message.command) {
		case 'setForceSettings':
			forceSettings.value = message.forceSettings
			break
		}
	})
})

const fetchForceSettings = () => {
	vscode.postMessage({
		command: 'getForceSettings',
	})
}

watch(forceSettings, (newVal) => {
	vscode.postMessage({
		command: 'saveForceSettings',
		forceSettings: { ...newVal },
	})
}, { deep: true })
</script>
