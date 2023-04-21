import type { Directory, Edge, File, Node } from '../types'

export const getDirectoryConnections = (files: File[], dirs: Directory[]) => {
	const nodes: Node[] = []
	const edges: Edge[] = []

	files.forEach((file, fileIndex) => {
		nodes.push({
			id: fileIndex,
			label: file.path.split('/').pop() || '',
			path: file.path,
			type: 'File',
		})
	})

	dirs.forEach((dir) => {
		nodes.push({
			id: nodes.length,
			label: dir.path.split('/').pop() || '',
			path: dir.path,
			type: 'Directory',
		})
	})

	// Find connections between files and directories
	nodes.forEach((node) => {
		const pathArray = node.path.split('/')
		pathArray.pop()
		const findDirectory = pathArray.join('/')

		dirs.forEach((dir, dirIndex) => {
			if (dir.path === findDirectory) {
				const directoryIndex = files.length + dirIndex
				edges.push({
					id: node.id + '-' + directoryIndex,
					from: node.id,
					to: directoryIndex,
				})
			}
		})
	})

	return { nodes, edges }
}
