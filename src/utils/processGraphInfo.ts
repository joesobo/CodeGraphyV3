import type { ConnectionMode, Edge, Node } from './types'
import {
	directoryEdges,
	directoryNodes,
	pluginEdges,
	pluginNodes,
} from './info'

import { colorEdges } from './edges/colorEdges'
import { colorNodes } from './nodes/colorNodes'

export const processGraphInfo = (mode: ConnectionMode) => {
	let nodes: Node[] = []
	let edges: Edge[] = []

	if (mode === 'Interaction') {
		nodes = pluginNodes
		edges = pluginEdges
	}
	else {
		nodes = directoryNodes
		edges = directoryEdges
	}

	colorNodes(nodes)
	colorEdges(edges)

	return { nodes, edges }
}
