import type * as vscode from 'vscode'

import { fetchColorSettings, fetchForceSettings, fetchNodeSettings, saveColorSettings, saveForceSettings, saveNodeSettings } from './utils/vscode/workspaceSettings'

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
		case 'getColorSettings':
			await webview.postMessage({
				command: 'setColorSettings',
				colorSettings: fetchColorSettings(),
			})
			break
		case 'saveColorSettings':
			saveColorSettings(message.colorSettings)
			await webview.postMessage({
				command: 'updateColorSettings',
				colorSettings: message.colorSettings,
			})
			break
		case 'getForceSettings':
			await webview.postMessage({
				command: 'setForceSettings',
				forceSettings: fetchForceSettings(),
			})
			break
		case 'saveForceSettings':
			saveForceSettings(message.forceSettings)
			await webview.postMessage({
				command: 'updateForceSettings',
				forceSettings: message.forceSettings,
			})
			break
		}
	})
}
