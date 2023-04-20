import type { Directory, File } from './types'

import { getStandardConnections } from './file/getStandardConnections'

export const processGraphInfo = (files: File[], dirs: Directory[]) => {
	// get directory connection data
	const { nodes, edges } = getStandardConnections(files, dirs)

	// send files to plugin to be processed into connections

	return { nodes, edges }
}
