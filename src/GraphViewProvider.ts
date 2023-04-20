import * as vscode from 'vscode'

import { handleMessages } from './messenger'

export class GraphViewProvider implements vscode.WebviewViewProvider {
	public static readonly viewType = 'graph-view-sidebar'

	private _view?: vscode.WebviewView

	constructor(private readonly _extensionUri: vscode.Uri) {}

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		this._view = webviewView

		webviewView.webview.options = {
			// Allow scripts in the webview
			enableScripts: true,
			localResourceRoots: [this._extensionUri],
		}

		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview)
	}

	private _getHtmlForWebview(webview: vscode.Webview) {
		// Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
		const scriptUri = webview.asWebviewUri(
			vscode.Uri.joinPath(this._extensionUri, 'dist/compiled', 'index.es.js'),
		)

		// Do the same for the stylesheet.
		const styleMainUri = webview.asWebviewUri(
			vscode.Uri.joinPath(this._extensionUri, 'dist', 'output.css'),
		)

		handleMessages(webview)

		return `
			<!DOCTYPE html>
			<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">

					<!-- Tailwind CSS -->
					<link href="${styleMainUri}" rel="stylesheet">
					<!-- Inter Font -->
					<link rel="stylesheet" href="https://rsms.me/inter/inter.css">
					<!-- Vis Network -->
					<link href="https://unpkg.com/vis-network@9.0.6/dist/vis-network.min.css" rel="stylesheet" type="text/css" />

					<title>Graph View Extension</title>
				</head>
				<body>
					<script>
						const vscode = acquireVsCodeApi();
					</script>

					<div id="graph-app"></div>

					<script type="module" src="${scriptUri}"></script>
				</body>
			</html>`
	}
}
