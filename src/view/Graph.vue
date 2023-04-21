<template>
  <Header />
  <div class="flex flex-col items-center">
    <h1 class="text-lg">Vue 3 Extension Template</h1>

    <hr class="mb-8 mt-4 w-full border-white" />

    <div ref="graphContainer" class="h-[500px] w-[500px] bg-zinc-800" />
    <button
      class="mt-4"
      @click="
        () => {
          mode = mode === 'Interaction' ? 'Directory' : 'Interaction'
          fetchGraphInfo()
        }
      "
    >
      Switch Mode
    </button>
  </div>
</template>

<script setup lang="ts">
import { Network, DataSet } from 'vis-network/standalone'
import { onMounted, ref } from 'vue'

import type { Node, Edge, ConnectionMode } from '../utils/types'
import type { Ref } from 'vue'

import Header from './components/Header.vue'

const graphContainer = ref(null)
const mode: Ref<ConnectionMode> = ref('Interaction')

const options = {
	nodes: {
		shape: 'dot',
		size: 16,
		font: {
			size: 12,
			color: '#ffffff',
		},
		borderWidth: 0,
		borderWidthSelected: 2,
	},
	layout: {
		randomSeed: 42,
		improvedLayout: true,
	},
	interaction: {
		hover: true,
	},
}

onMounted(() => {
	fetchGraphInfo()

	window.addEventListener('message', (event) => {
		const message = event.data // The JSON data our extension sent
		switch (message.command) {
		case 'setGraphInfo':
			if (graphContainer.value) {
				new Network(
					graphContainer.value,
					{
						nodes: new DataSet<Node>(message.data.nodes),
						edges: new DataSet<Edge>(message.data.edges),
					},
					options,
				)
			}
			break
		case 'pluginLoaded':
			fetchGraphInfo()
			break
		}
	})
})

const fetchGraphInfo = () => {
	vscode.postMessage({
		command: 'getGraphInfo',
		message: { mode: mode.value },
	})
}
</script>
