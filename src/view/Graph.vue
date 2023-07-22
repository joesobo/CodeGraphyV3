<template>
  <Header />
  <div class="flex flex-col items-center">
    <div ref="graphContainer" class="h-[500px] w-[500px] bg-zinc-800" @click="closeContextMenu()" />
    <Slider v-model="depth" title="Depth" :min="0" :max="5" class="mt-4 w-full" />
    <div
      v-if="contextMenu.show && contextMenu.node"
      id="context-menu"
      ref="contextMenuRef"
    >
      <ContextMenu
        :contextNode="contextMenu.node"
        @update="popperInstance?.update()"
        @close="closeContextMenu()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { DataSet, Network } from 'vis-network/standalone'
import { nextTick, onMounted, reactive, ref } from 'vue'
import type { Instance } from '@popperjs/core'
import { createPopper } from '@popperjs/core'

import type {
	ColorSettings,
	Edge,
	ForceSettings,
	Node,
	NodeSettings,
} from '../utils/types'

import { colorNodes, updateNodeColors } from '../utils/nodes/colorNodes'
import { colorEdges, updateEdgeColors } from '../utils/edges/colorEdges'
import Header from './components/Header.vue'
import Slider from './components/Slider.vue'
import ContextMenu from './components/ContextMenu.vue'

const network = ref<Network>()
const graphContainer = ref(null)

const isContextClick = ref(false)
const contextMenu = reactive<{ show: boolean; node: Node | undefined; position: { x: number; y: number } }>({
	show: false,
	node: undefined,
	position: { x: 0, y: 0 },
})
const contextMenuRef = ref(null)
const popperInstance = ref<Instance | null>(null)

const depth = ref(0)

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
					navigationButtons: nodeSettings.value?.showControls,
					zoomView: true,
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

				network.value.on('click', (properties) => {
					if (isContextClick.value) {
						isContextClick.value = false
						return
					}

					if (!properties.nodes.length) {
						return
					 }

					const id = properties.nodes[0]
					const clickedNode = nodes.value[id]

					if (clickedNode.type !== 'File') {
						return
					 }

					vscode.postMessage({
						command: 'openFile',
						text: clickedNode.path,
					})

					closeContextMenu()
				})

				network.value.on('oncontext', (properties) => {
					closeContextMenu()
					isContextClick.value = true
					properties.event.preventDefault()

					if (!network.value) {
						return
					 }

					const id = network.value.getNodeAt(properties.pointer.DOM)

					if (id === null) {
						return
					 }

					const clickedNode = nodes.value[id as number]

					if (clickedNode && clickedNode.type === 'Package') {
						return
					}

					contextMenu.show = true
					contextMenu.node = clickedNode
					contextMenu.position = {
						x: properties.pointer.DOM.x,
						y: properties.pointer.DOM.y,
					}
					showContextMenu()
				})
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

const showContextMenu = () => {
	// Create a dummy element at the click position to attach the popper to
	const dummyElement = document.createElement('div')
	dummyElement.style.position = 'absolute'
	dummyElement.style.left = `${contextMenu.position.x}px`
	dummyElement.style.top = `${contextMenu.position.y}px`
	document.body.appendChild(dummyElement)

	// Use the dummy element as the popper reference
	nextTick().then(() => {
		if (contextMenuRef.value) {
			popperInstance.value = createPopper(dummyElement, contextMenuRef.value, {
				placement: 'right',
				strategy: 'fixed',
				modifiers: [
					{
						name: 'flip',
						options: {
							fallbackPlacements: ['left'],
						},
					},
					{
						name: 'offset',
						options: {
							offset: ({ placement }: { placement: string }) => {
								switch (placement) {
								case 'right': return [0, 25]
								case 'left': return [0, 5]
								default: return [0, 25]
								}
							},
						},
					},
					{
						name: 'preventOverflow',
						options: {
							boundary: graphContainer.value,
						},
					},
				],
			})
		}
	})
	popperInstance.value?.update()
}

const closeContextMenu = () => {
	contextMenu.show = false
	contextMenu.node = undefined
	if (popperInstance.value) {
		popperInstance.value.destroy()
		popperInstance.value = null
	}
}
</script>
