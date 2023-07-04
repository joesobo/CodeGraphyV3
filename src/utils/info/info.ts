import type { Edge, Node } from '../types'

import { getDirectoryConnections } from '../file/getDirectoryConnections'
import { getDirectoryInfo } from '../file/getDirectoryInfo'

export const { files, dirs } = getDirectoryInfo()
export const { nodes: directoryNodes, edges: directoryEdges }
  = getDirectoryConnections(files, dirs)
export const pluginNodes: Node[] = []
export const pluginEdges: Edge[] = []

export const resetPluginData = () => {
	pluginNodes.length = 0
	pluginEdges.length = 0
}

export const setPluginData = (data: { nodes: Node[]; edges: Edge[] }) => {
	pluginNodes.push(...data.nodes)
	pluginEdges.push(...data.edges)
}

export const getPluginData = () => {
	return { nodes: pluginNodes, edges: pluginEdges }
}
