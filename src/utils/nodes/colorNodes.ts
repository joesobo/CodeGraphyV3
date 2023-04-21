import chroma from 'chroma-js'
import type { Node } from '../types'

// Create a color scale for file extensions using chroma.js
const spectralColors = [
	'#9e0142',
	'#d53e4f',
	'#f46d43',
	'#fdae61',
	'#fee08b',
	'#ffffbf',
	'#e6f598',
	'#abdda4',
	'#66c2a5',
	'#3288bd',
	'#5e4fa2',
]

const infernoColors = [
	'#000004',
	'#2c1157',
	'#721f81',
	'#b93c6d',
	'#f07049',
	'#fca37e',
	'#fcffa4',
]

const colorScale = chroma.scale(infernoColors).mode('lch').colors(20)

// Function to get the color based on color string
const getColorByFileExtension = (colorString: string) => {
	// Create a simple hash from the string
	const hash = colorString.split('').reduce((acc, char) => {
		return char.charCodeAt(0) + ((acc << 5) - acc)
	}, 0)
	// Use the hash to get an index in the colorScale array
	const index = Math.abs(hash) % colorScale.length
	return colorScale[index]
}

export const colorNodes = (nodes: Node[]) => {
	nodes.forEach((node) => {
		const colorString
      = (node.type === 'Directory' || node.type === 'Package')
      	? node.type
      	: node.label.split('.')[1]

		node.color = getColorByFileExtension(colorString)
	})
}
