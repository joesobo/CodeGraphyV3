import type { Edge, Node, NodeSettings } from '../types'
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

	// pre-made filters
	const filters = {
		showPackages: (node: Node) => node.type !== 'Package',
		showOrphans: (node: Node) => {
			return edges.some((edge) => {
				const regex = /(\d+)-(\d+)/
				const match = edge.id.match(regex)

				if (match) {
					const sourceId = Number.parseInt(match[1])
					const targetId = Number.parseInt(match[2])

					if (sourceId === node.id || targetId === node.id) {
						return true
					}
				}
				return false
			})
		},
	}

	// apply filters
	for (const filter in filters) {
		nodes = nodes.filter((node) => {
			const key = filter as keyof typeof filters
			if (!nodeSettings[key] && !filters[key](node)) {
				return false
			}

			return true
		})
		edges = filterEdges(edges, nodes)
	}

	return { nodes, edges }
}

// filter out affected edges
const filterEdges = (edges: Edge[], nodes: Node[]) => {
	return edges.filter((edge) => {
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
}
