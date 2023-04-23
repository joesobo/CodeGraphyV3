<template>
  <form>
    <div class="space-y-12 px-4 pb-8 pt-2">
      <p class="max-w-2xl text-sm font-light leading-6 text-gray-600" @click.stop>
        These settings change colors of nodes and connections in the graph.
      </p>

      <div v-if="colorSettings" class="mt-6 space-y-8">
        <ColorToggle v-model:color="colorSettings.colorScheme" title="ColorScheme" description="Color scheme for all nodes" @click="(e: Event) => e.preventDefault()" />

        <ColorToggle v-model:color="colorSettings.selectedColor" title="Selected" description="Color of selected node" @click="(e: Event) => e.preventDefault()" />

        <ColorToggle v-model:color="colorSettings.favoriteColor" title="Favorite" description="Color of favorite nodes" @click="(e: Event) => e.preventDefault()" />

        <ColorToggle v-model:color="colorSettings.outlineColor" title="Outline" description="Color of node outlines" @click="(e: Event) => e.preventDefault()" />

        <ColorToggle v-model:color="colorSettings.edgeColor" title="Edge" description="Color of edges" @click="(e: Event) => e.preventDefault()" />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import type { ColorSettings } from '../../utils/types'
import ColorToggle from './ColorToggle.vue'

const colorSettings = ref<ColorSettings>()

onMounted(() => {
	fetchColorSettings()

	window.addEventListener('message', (event) => {
		const message = event.data // The JSON data our extension sent
		switch (message.command) {
		case 'setColorSettings':
			colorSettings.value = message.colorSettings
			break
		}
	})
})

const fetchColorSettings = () => {
	vscode.postMessage({
		command: 'getColorSettings',
	})
}

watch(colorSettings, (newVal) => {
	vscode.postMessage({
		command: 'saveColorSettings',
		colorSettings: { ...newVal },
	})
}, { deep: true })
</script>
