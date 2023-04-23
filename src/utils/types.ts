import type { EdgeOptions, NodeOptions } from 'vis-network/standalone'

export type Node = NodeOptions & {
  id: number
  label: string
  path: string
  type: 'File' | 'Directory' | 'Package'
  color?: string
}

export type Edge = EdgeOptions & {
  id: string
  to: number
  from: number
  color?: string
}

export type File = {
  path: string
}

export type Directory = {
  path: string
}

export type ConnectionMode = 'Interaction' | 'Directory'

export type NodeSize = 'Lines' | 'Connections'

export type NodeSettings = {
	mode: ConnectionMode
	size: NodeSize
	showPackages: boolean
	showOrphans: boolean
	showLabels: boolean
	showOutlines: boolean
	showArrows: boolean
}

export type ColorSettings = {
	colorScheme: string
	selectedColor: string
	favoriteColor: string
	outlineColor: string
	edgeColor: string
}

export type ForceSettings = {
	chargeForce: number
	linkDistance: number
}
