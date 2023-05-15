<template>
  <Header />
  <div class="flex flex-col items-center">
    <div ref="graphContainer" class="h-[500px] w-[500px] bg-zinc-800" />
  </div>
</template>

<script setup lang="ts">
import { DataSet, Network } from 'vis-network/standalone'
import { onMounted, ref } from 'vue'

import type { ColorSettings, Edge, ForceSettings, Node, NodeSettings } from '../utils/types'

import Header from './components/Header.vue'

const network = ref<Network>()
const graphContainer = ref(null)

const nodeSettings = ref<NodeSettings>()
const colorSettings = ref<ColorSettings>()
const forceSettings = ref<ForceSettings>()

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
	fetchGraphSettings()

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
		else if (message.command === 'setNodeSettings') {
			nodeSettings.value = message.nodeSettings
			fetchGraphInfo()
		}
		else if (message.command === 'setColorSettings') {
			colorSettings.value = message.colorSettings
			fetchGraphInfo()
		}
		else if (message.command === 'setForceSettings') {
			forceSettings.value = message.forceSettings
			fetchGraphInfo()
		}
		else if (message.command === 'pluginLoaded') {
			fetchGraphInfo()
		}
		else if (message.command === 'updateNodeSettings') {
			nodeSettings.value = message.nodeSettings
			fetchGraphInfo()
		}
	})
})

const fetchGraphSettings = () => {
	vscode.postMessage({
		command: 'getNodeSettings',
	})
	vscode.postMessage({
		command: 'getColorSettings',
	})
	vscode.postMessage({
		command: 'getForceSettings',
	})
}

const fetchGraphInfo = () => {
	vscode.postMessage({
		command: 'getGraphInfo',
		nodeSettings: { ...nodeSettings.value },
	})
}
</script>
