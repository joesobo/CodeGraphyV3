import * as vscode from 'vscode'

import { GraphViewProvider } from './GraphViewProvider'
import { StatsViewProvider } from './StatsViewProvider'

export function activate(context: vscode.ExtensionContext) {
	console.log('CodeGraphy - Base Extension activated!')

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			'codegraphy-v3-view-graph',
			new GraphViewProvider(context.extensionUri),
		),
	)

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			'codegraphy-v3-view-stats',
			new StatsViewProvider(context.extensionUri),
		),
	)

	const files = [
		{
			id: '1',
			name: 'Node 1',
		},
		{
			id: '2',
			name: 'Node 2',
		},
	]

	const getData = vscode.commands.registerCommand('codegraphy.getData', () => {
		return { message: files }
	})

	const printData = vscode.commands.registerCommand(
		'codegraphy.printData',
		(data) => {
			console.log('TEST', data)
			vscode.window.showInformationMessage(
				`Connections: ${data.connections.length}`,
			)
		},
	)

	context.subscriptions.push(getData, printData)
}
