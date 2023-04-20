import type { Edge, Node } from './types'

import { getDirectoryInfo } from './file/getDirectoryInfo'
import { getStandardConnections } from './file/getStandardConnections'

export const processGraphInfo = () => {
	// const nodes: Node[] = []
	// const edges: Edge[] = []

	const { files, dirs } = getDirectoryInfo()

	// get directory connection data
	const { nodes, edges } = getStandardConnections(files, dirs)

	// send files to plugin to be processed into connections

	return { nodes, edges }
}
