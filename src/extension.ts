import * as vscode from 'vscode'

import { BaseViewProvider } from './BaseViewProvider'

export function activate(context: vscode.ExtensionContext) {
	console.log('CodeGraphy - Base Extension activated!')

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

	const provider = new BaseViewProvider(context.extensionUri)

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			BaseViewProvider.viewType,
			provider,
		),
	)

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
