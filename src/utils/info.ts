import type { Edge, Node } from './types'

import { getDirectoryConnections } from './file/getDirectoryConnections'
import { getDirectoryInfo } from './file/getDirectoryInfo'

export const { files, dirs } = getDirectoryInfo()
export const { nodes: directoryNodes, edges: directoryEdges } =
  getDirectoryConnections(files, dirs)
export let pluginNodes: Node[] = []
export let pluginEdges: Edge[] = []

export const setPluginData = (data: { nodes: Node[]; edges: Edge[] }) => {
	pluginNodes = data.nodes
	pluginEdges = data.edges
}
