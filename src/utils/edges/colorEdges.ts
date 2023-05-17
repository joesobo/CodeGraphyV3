import type { DataSet } from 'vis-network'
import type { ColorSettings, Edge } from '../types'

export const colorEdges = (edges: Edge[], colorSettings: ColorSettings | undefined) => {
	const edgeColor = colorSettings?.edgeColor ? colorSettings.edgeColor : '#666'

	edges.forEach((edge) => {
		edge.color = edgeColor
	})
}

export const updateEdgeColors = (edges: Edge[], colorSettings: ColorSettings | undefined, dataSetEdges: DataSet<Edge> | undefined) => {
	const edgeColor = colorSettings?.edgeColor ? colorSettings.edgeColor : '#666'

	edges.forEach((edge) => {
		dataSetEdges?.update({
			id: edge.id,
			color: edgeColor,
		})
	})
}
