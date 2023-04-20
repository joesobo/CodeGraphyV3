import { EdgeOptions, NodeOptions } from 'vis-network/standalone'

export interface Node extends NodeOptions {
	id: number
	label: string
	path: string
	type: 'File' | 'Directory' | 'Package'
}

export interface Edge extends EdgeOptions {
	id: string
	to: number
	from: number
}

export interface File {
	path: string
}

export interface Directory {
	path: string
}
