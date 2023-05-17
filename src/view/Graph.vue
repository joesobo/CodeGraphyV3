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

import { colorNodes, updateNodeColors } from '../utils/nodes/colorNodes'
import { colorEdges, updateEdgeColors } from '../utils/edges/colorEdges'
import Header from './components/Header.vue'

const network = ref<Network>()
const graphContainer = ref(null)

const nodeSettings = ref<NodeSettings>()
const colorSettings = ref<ColorSettings>()
const forceSettings = ref<ForceSettings>()

const nodes = ref<Node[]>([])
const edges = ref<Edge[]>([])

const dataSetNodes = ref<DataSet<Node>>()
const dataSetEdges = ref<DataSet<Edge>>()

onMounted(() => {
	fetchGraphSettings()

	window.addEventListener('message', (event) => {
		const message = event.data // The JSON data our extension sent
		if (message.command === 'setGraphInfo') {
			colorNodes(message.data.nodes, colorSettings.value)
			colorEdges(message.data.edges, colorSettings.value)

			nodes.value = message.data.nodes
			edges.value = message.data.edges

			edges.value?.forEach((edge) => {
				edge.arrows = nodeSettings.value?.showArrows ? 'from' : ''
			})

			dataSetNodes.value = new DataSet<Node>(message.data.nodes)
			dataSetEdges.value = new DataSet<Edge>(message.data.edges)

			const options = {
				nodes: {
					shape: 'dot',
					size: 16,
					font: {
						size: nodeSettings.value?.showLabels ? 12 : 0,
						color: '#ffffff',
					},
					borderWidth: 0,
					borderWidthSelected: nodeSettings.value?.showOutlines ? 2 : 0,
				},
				layout: {
					randomSeed: 42,
					improvedLayout: true,
				},
				interaction: {
					hover: true,
				},
			}

			if (graphContainer.value) {
				network.value = new Network(
					graphContainer.value,
					{
						nodes: dataSetNodes.value,
						edges: dataSetEdges.value,
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

			edges.value?.forEach((edge) => {
				dataSetEdges.value?.update({
					id: edge.id,
					arrows: nodeSettings.value?.showArrows ? 'to' : '',
				})
			})

			fetchGraphInfo()
		}
		else if (message.command === 'updateColorSettings') {
			updateNodeColors(nodes.value, colorSettings.value, dataSetNodes.value)
			updateEdgeColors(edges.value, colorSettings.value, dataSetEdges.value)
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
