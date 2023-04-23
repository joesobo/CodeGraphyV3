import type * as vscode from 'vscode'

import { fetchNodeSettings, saveNodeSettings } from './utils/vscode/workspaceSettings'

import { processGraphInfo } from './utils/processGraphInfo'

export const handleMessages = (webview: vscode.Webview) => {
	receiveMessages(webview)
}

const receiveMessages = (webview: vscode.Webview) => {
	webview.onDidReceiveMessage(async (message) => {
		switch (message.command) {
		case 'getGraphInfo':
			await webview.postMessage({
				command: 'setGraphInfo',
				data: { ...processGraphInfo(message.message.mode) },
			})
			break
		case 'getNodeSettings':
			await webview.postMessage({
				command: 'setNodeSettings',
				nodeSettings: fetchNodeSettings(),
			})
			break
		case 'saveNodeSettings':
			saveNodeSettings(message.nodeSettings)
			await webview.postMessage({
				command: 'updateNodeSettings',
				nodeSettings: message.nodeSettings,
			})
			break
		}
	})
}
