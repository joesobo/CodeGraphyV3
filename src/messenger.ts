import * as vscode from 'vscode'

import { getDirectoryInfo } from './utils/file/getDirectoryInfo'
import { processGraphInfo } from './utils/processGraphInfo'

export const { files, dirs } = getDirectoryInfo()

export const handleMessages = (webview: vscode.Webview) => {
	receiveMessages(webview)
}

const receiveMessages = (webview: vscode.Webview) => {
	webview.onDidReceiveMessage(async (message) => {
		switch (message.command) {
		case 'getGraphInfo':
			await webview.postMessage({
				command: 'setGraphInfo',
				data: processGraphInfo(files, dirs)
			})
			return
		}
	})
}
