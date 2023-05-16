import type { NodeSettings } from '../types'
import { colorEdges } from '../edges/colorEdges'
import { colorNodes } from '../nodes/colorNodes'
import { filterInfo } from './filterInfo'

export const processGraphInfo = (nodeSettings: NodeSettings) => {
	const { nodes, edges } = filterInfo(nodeSettings)

	colorNodes(nodes)
	colorEdges(edges)

	return { nodes, edges }
}
