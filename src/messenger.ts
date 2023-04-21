import type * as vscode from 'vscode'

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
		}
	})
}
