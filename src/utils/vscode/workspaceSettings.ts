import * as vscode from 'vscode'

import type { ColorSettings, ForceSettings, NodeSettings } from '../types'

export const fetchNodeSettings = (): NodeSettings => {
	const configuration = vscode.workspace.getConfiguration('codegraphy')

	// Node Settings
	const mode = configuration.mode
	const size = configuration.size
	const showControls = configuration.showControls
	const showPackages = configuration.showPackages
	const showOrphans = configuration.showOrphans
	const showLabels = configuration.showLabels
	const showOutlines = configuration.showOutlines
	const showArrows = configuration.showArrows

	return {
		mode,
		size,
		showControls,
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

export const fetchColorSettings = (): ColorSettings => {
	const configuration = vscode.workspace.getConfiguration('codegraphy')

	// Node Settings
	const colorScheme = configuration.colorScheme
	const selectedColor = configuration.selectedColor
	const favoriteColor = configuration.favoriteColor
	const outlineColor = configuration.outlineColor
	const edgeColor = configuration.edgeColor

	return {
		colorScheme,
		selectedColor,
		favoriteColor,
		outlineColor,
		edgeColor,
	}
}

export const saveColorSettings = (colorSettings: ColorSettings) => {
	const configuration = vscode.workspace.getConfiguration('codegraphy')
	const keys = Object.keys(colorSettings) as (keyof ColorSettings)[]

	keys.forEach((key) => {
		configuration.update(
			key,
			colorSettings[key],
			vscode.ConfigurationTarget.Workspace,
		)
	})
}

export const fetchForceSettings = (): ForceSettings => {
	const configuration = vscode.workspace.getConfiguration('codegraphy')

	// Node Settings
	const chargeForce = configuration.chargeForce
	const linkDistance = configuration.linkDistance

	return {
		chargeForce,
		linkDistance,
	}
}

export const saveForceSettings = (forceSettings: ForceSettings) => {
	const configuration = vscode.workspace.getConfiguration('codegraphy')
	const keys = Object.keys(forceSettings) as (keyof ForceSettings)[]

	keys.forEach((key) => {
		configuration.update(
			key,
			forceSettings[key],
			vscode.ConfigurationTarget.Workspace,
		)
	})
}
