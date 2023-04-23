import * as vscode from 'vscode'

import type { NodeSettings } from 'utils/types'

export const fetchNodeSettings = (): NodeSettings => {
	const configuration = vscode.workspace.getConfiguration('codegraphy')

	// Node Settings
	const mode = configuration.mode
	const showPackages = configuration.showPackages
	const showOrphans = configuration.showOrphans
	const showLabels = configuration.showLabels
	const showOutlines = configuration.showOutlines
	const showArrows = configuration.showArrows

	return {
		mode,
		showPackages,
		showOrphans,
		showLabels,
		showOutlines,
		showArrows,
	}
}

export const saveNodeSettings = (nodeSettings: NodeSettings) => {
	const configuration = vscode.workspace.getConfiguration('codegraphy')
	const keys = Object.keys(nodeSettings) as (keyof NodeSettings)[]

	keys.forEach((key) => {
		configuration.update(
			key,
			nodeSettings[key],
			vscode.ConfigurationTarget.Workspace,
		)
	})
}
