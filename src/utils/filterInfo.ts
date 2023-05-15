import type { Edge, Node, NodeSettings } from './types'
import {
	directoryEdges,
	directoryNodes,
	pluginEdges,
	pluginNodes,
} from './info'

export const filterInfo = (nodeSettings: NodeSettings) => {
	let nodes: Node[] = []
	let edges: Edge[] = []

	// main graph mode
	if (nodeSettings.mode === 'Interaction') {
		nodes = pluginNodes
		edges = pluginEdges
	}
	else {
		nodes = directoryNodes
		edges = directoryEdges
	}

	// filter packages
	if (!nodeSettings.showPackages) {
		nodes = nodes.filter(node => node.type !== 'Package')
	}

	// filter out affected edges
	const filteredEdges = edges.filter((edge) => {
		const regex = /(\d+)-(\d+)/
		const match = edge.id.match(regex)

		if (match) {
			const sourceId = Number.parseInt(match[1])
			const targetId = Number.parseInt(match[2])

			const sourceNode = nodes.find(node => node.id === sourceId)
			const targetNode = nodes.find(node => node.id === targetId)

			return sourceNode && targetNode
		}

		return false
	})

	return { nodes, edges: filteredEdges }
}
