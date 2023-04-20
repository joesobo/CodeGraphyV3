<template>
  <Header />
  <div class="flex flex-col items-center">
    <h1 class="text-lg">Vue 3 Extension Template</h1>

    <hr class="mb-8 mt-4 w-full border-white" />

    <div ref="graphContainer" class="h-[500px] w-[500px] bg-zinc-800" />
  </div>
</template>

<script setup lang="ts">
import { Network, DataSet } from 'vis-network/standalone'
import { onMounted, ref } from 'vue'

import type { Node, Edge } from '../utils/types'

import Header from './components/Header.vue'

const graphContainer = ref(null)

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
	vscode.postMessage({
		command: 'getGraphInfo',
	})

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
		}
	})
})
</script>
