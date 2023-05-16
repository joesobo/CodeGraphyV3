import type { NodeSettings } from '../types'
import { colorEdges } from '../edges/colorEdges'
import { filterInfo } from './filterInfo'

export const processGraphInfo = (nodeSettings: NodeSettings) => {
	const { nodes, edges } = filterInfo(nodeSettings)

	colorEdges(edges)

	return { nodes, edges }
}
