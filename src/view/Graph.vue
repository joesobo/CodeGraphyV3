<template>
  <Header />
  <div class="flex flex-col items-center">
    <div ref="graphContainer" class="h-[500px] w-[500px] bg-zinc-800" />
    <button
      class="mt-4"
      @click="() => {
        mode = mode === 'Interaction' ? 'Directory' : 'Interaction'
        fetchGraphInfo()
      }"
    >
      Switch Mode
    </button>
  </div>
</template>

<script setup lang="ts">
import { DataSet, Network } from 'vis-network/standalone'
import { onMounted, ref } from 'vue'

import type { Ref } from 'vue'
import type { ConnectionMode, Edge, Node } from '../utils/types'

import Header from './components/Header.vue'

const network = ref<Network>()
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
		if (message.command === 'setGraphInfo') {
			if (graphContainer.value) {
				network.value = new Network(
					graphContainer.value,
					{
						nodes: new DataSet<Node>(message.data.nodes),
						edges: new DataSet<Edge>(message.data.edges),
					},
					options,
				)
			}
		}
		else if (message.command === 'pluginLoaded') {
			fetchGraphInfo()
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
