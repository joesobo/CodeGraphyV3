import type { Edge } from '../types'

export const colorEdges = (edges: Edge[]) => {
	edges.forEach((edge) => {
		edge.color = '#666'
	})
}
