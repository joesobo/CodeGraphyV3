import * as vscode from 'vscode'

import type { Directory, File } from '../types'

import fs from 'fs'
import path from 'path'

import { containsBlacklist } from '../vscode/blacklist'

export const getDirectoryInfo = () => {
	const rootDirectory = vscode.workspace.workspaceFolders?.[0]?.uri?.path ?? ''

	const files: File[] = []
	const dirs: Directory[] = []
	const touchedDirs: string[] = [rootDirectory]

	dirs.push({ path: rootDirectory })

	while (touchedDirs.length > 0) {
		const currentDir = touchedDirs.pop() || ''

		const directoryContents = fs.readdirSync(currentDir)

		for (const content of directoryContents) {
			const fullPath = path.join(currentDir, content)

			if (containsBlacklist(fullPath)) continue

			if (fs.statSync(fullPath).isFile()) {
				files.push({
					path: fullPath,
				})
			} else {
				touchedDirs.push(fullPath)
				dirs.push({ path: fullPath })
			}
		}
	}

	return { files, dirs }
}
