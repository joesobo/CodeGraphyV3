import * as vscode from 'vscode'

import { GraphViewProvider } from './GraphViewProvider'
import type { PluginData } from './utils/types'
import { PluginManager } from './utils/plugin/pluginManager'
import { StatsViewProvider } from './StatsViewProvider'

export const activate = (context: vscode.ExtensionContext) => {
	// eslint-disable-next-line no-console -- For Testing Purposes
	console.log('CodeGraphy - Base Extension activated!')

	const graphProvider = new GraphViewProvider(context.extensionUri)
	const pluginManager = new PluginManager(graphProvider)

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			'codegraphy-v3-view-graph',
			graphProvider,
		),
	)

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			'codegraphy-v3-view-stats',
			new StatsViewProvider(context.extensionUri),
		),
	)

	const registerPlugin = vscode.commands.registerCommand(
		'codegraphy.registerPlugin',
		async (pluginData: PluginData) => {
			pluginManager.registerPlugin(pluginData)
		},
	)

	context.subscriptions.push(registerPlugin)
}
