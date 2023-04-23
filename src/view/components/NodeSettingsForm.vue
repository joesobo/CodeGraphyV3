<template>
  <form>
    <div class="space-y-12 px-4 pb-8 pt-2">
      <p class="max-w-2xl text-sm font-light leading-6 text-gray-600">
        These settings are applied to all nodes.
      </p>

      <div v-if="nodeSettings" class="mt-6 space-y-8">
        <Toggle :enabled="isInteraction" title="Mode" description="Test toggle mode" @update:enabled="toggleMode" />

        <Toggle v-model:enabled="nodeSettings.showPackages" title="Packages" description="Render used packages as nodes" />

        <Toggle v-model:enabled="nodeSettings.showOrphans" title="Orphans" description="Render nodes with no connections" />

        <Toggle v-model:enabled="nodeSettings.showLabels" title="Labels" description="Render node labels" />

        <Toggle v-model:enabled="nodeSettings.showOutlines" title="Outlines" description="Render node outlines" />

        <Toggle v-model:enabled="nodeSettings.showArrows" title="Arrows" description="Render connection arrows" />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

import type { NodeSettings } from '../../utils/types'
import Toggle from './Toggle.vue'

const nodeSettings = ref<NodeSettings>()

onMounted(() => {
	if (nodeSettings.value === undefined) {
		fetchNodeSettings()
	}

	window.addEventListener('message', (event) => {
		const message = event.data // The JSON data our extension sent
		switch (message.command) {
		case 'setNodeSettings':
			nodeSettings.value = message.nodeSettings
			break
		}
	})
})

const fetchNodeSettings = () => {
	vscode.postMessage({
		command: 'getNodeSettings',
	})
}

const isInteraction = computed(() => nodeSettings.value?.mode === 'Interaction')

const toggleMode = () => {
	if (nodeSettings.value) {
		nodeSettings.value.mode = nodeSettings.value?.mode === 'Interaction' ? 'Directory' : 'Interaction'
	}
}

watch(nodeSettings, (newVal) => {
	vscode.postMessage({
		command: 'saveNodeSettings',
		nodeSettings: { ...newVal },
	})
}, { deep: true })
</script>
