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

export interface File {
  path: string
}

export interface Directory {
  path: string
}

export type ConnectionMode = 'Interaction' | 'Directory'
