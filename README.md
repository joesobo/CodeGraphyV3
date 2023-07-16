# CodeGraphy - Base Extension

This is the base VSCode extension for displaying, graphing, and analyzing your code repository

## Usage

To use this extension you should install a few plugins as the base extension is quite limited

Click on the CodeGraphy icon in the VSCode sidebar to open the extension.

#### NOTE: It is essential to add to your codegraphy.blacklist vscode setting before using the extension
Due to the manner that CodeGraphy analyzes the repository any files that aren't desired should be explicitly added to the blacklist array. This includes any generated files or packages.

## Plugins

Plugins are used in CodeGraphy to specify how exactly the base Codegraphy extension should process the file data and establish connections. Plugins can also support external package connections

### Current Plugins

- [JS](https://github.com/joesobo/CodeGraphyJSPlugin)
- [C#](https://github.com/joesobo/CodeGraphyC-PLugin)

### Plugin API

- In the plugin extension.ts execute the following command:

```ts
export interface File {
  path: string
}

await vscode.commands.executeCommand(
	'codegraphy.registerPlugin',
	{
		name: PLUGIN_NAME,
		regex: REGEX_ARRAY,
		getConnection: (match: RegExpExecArray, file: File, fileIndex: number, nodes: Node[], edges: Edge[]) => { nodes: Node[]; edges: Edge[] },
	},
)
```

- PLUGIN_NAME should be replaced with the name of the plugin
- REGEX_ARRAY should be replaced with an array of regex patterns to match for in code to establish connections
- getConnection takes in a function with
	- match result from regex
	- file
	- index of the file
	- list of all nodes
	- list of all edges
- getConnection should return any new nodes / edges to display

Example:

```ts
await vscode.commands.executeCommand(
	'codegraphy.registerPlugin',
	{
		name: 'JSPlugin',
		regex: [
			/import\s+(?:\*+\s+as\s+[\w*]+|(?:type\s+(?:(?:[\w*]+\s*,\s*)?\{[^{}]*\})+|(?:(?:[\w*]+\s*,\s*)?\{[^{}]*\}|[\w*]+)))\s*from\s*['"]([^'"]+)['"]/g,
			/require\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
		],
		getConnection,
	},
)
```

## Development

To run:

- modify .vscode/launch.json to include all extensions:

```json
"args": [
	"--extensionDevelopmentPath=/PATH_TO_REPO/CodeGraphyV3",
	"--extensionDevelopmentPath=/PATH_TO_REPO/CodeGraphyJSPlugin",
	"--extensionDevelopmentPath=/PATH_TO_REPO/CodeGraphyC#Plugin"
],
```

- run `pnpm watch` on base CodeGraphy extension and any plugins
- open the base CodeGraphy `extension.ts` and press `F5`
	- occasionally gets stuck booting and must be overridden with `CTRL + C`

### Example codegraphy.blacklist:

```json
"codegraphy.blacklist": [
	"cypress",
	"generated",
	"node_modules",
	"dist",
	".nuxt",
	".output",
	".vscode",
	".git",
	".github",
	".nuxt",
	".output",
	".yalc",
	".husky",
	".tool-versions",
	".editorconfig",
	".circleci",
	".browserslistrc",
	".npmignore",
	"CONTRIBUTING",
	"CODEOWNERS",
	"CHANGELOG",
	"LICENSE",
	".spec.",
	".d.ts",
	".storybook",
	".log",
	".lock",
	"lerna.json",
	".excalidraw",
	".yaml",
	".DS_Store",
	"types.ts",
	".vscode",
	".Asset",
	".asset",
	".shadergraph",
	".inputactions",
	".DotSettings",
	".meta",
	".prefab",
	".cgninc",
	".unity",
	".mat",
	".xml",
	"CORE.md",
	".iml",
	".next"
],
```
