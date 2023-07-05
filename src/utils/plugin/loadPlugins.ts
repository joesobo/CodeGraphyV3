import fs from 'node:fs'
import { pluginEdges as edges, files, pluginNodes as nodes, setPluginData } from '../info/info'

import type { Node } from '../types'
import { registeredPlugins } from './pluginManager'

export const loadPlugins = () => {
	const tempNodes: Node[] = []
	// create nodes of each file
	files.forEach((file, fileIndex) => {
		tempNodes.push({
			id: fileIndex,
			label: file.path.split('/').pop() || '',
			path: file.path,
			type: 'File',
		})
	})

	setPluginData({ nodes: tempNodes, edges: [] })

	files.forEach((file, fileIndex) => {
		const fileContents = fs.readFileSync(file.path, 'utf-8')

		registeredPlugins.forEach((plugin) => {
			plugin.regex.forEach((regex) => {
				let match
				// eslint-disable-next-line no-cond-assign
				while ((match = regex.exec(fileContents)) !== null) {
					setPluginData(plugin.getConnection(match, file, fileIndex, nodes, edges))
				}
			})
		})
	})
}
