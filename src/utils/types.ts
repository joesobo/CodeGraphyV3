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

export type NodeSettings = {
	mode: ConnectionMode
	showPackages: boolean
	showOrphans: boolean
	showLabels: boolean
	showOutlines: boolean
	showArrows: boolean
}
