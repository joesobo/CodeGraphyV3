import * as vscode from 'vscode'

import { GraphViewProvider } from './GraphViewProvider'
import { StatsViewProvider } from './StatsViewProvider'
import { files, setPluginData } from './utils/info'

export function activate(context: vscode.ExtensionContext) {
	console.log('CodeGraphy - Base Extension activated!')

	const graphProvider = new GraphViewProvider(context.extensionUri)

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

	const getSystemFiles = vscode.commands.registerCommand(
		'codegraphy.getSystemFiles',
		() => {
			return { message: files }
		},
	)

	const sendPluginConnections = vscode.commands.registerCommand(
		'codegraphy.sendPluginConnections',
		async (data) => {
			setPluginData(data)
			await graphProvider.postMessage({
				command: 'pluginLoaded',
				data,
			})
		},
	)

	context.subscriptions.push(getSystemFiles, sendPluginConnections)
}
