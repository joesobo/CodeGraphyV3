<template>
  <Header />
  <div class="flex flex-col items-center">
    <IconLighthouse style="font-size: 4em" class="my-2" />
    <h1 class="text-lg">Vue 3 Extension Template</h1>

    <hr class="mb-8 mt-4 w-full border-white" />

    <div ref="graphContainer" />
  </div>
</template>

<script setup lang="ts">
import { Network, DataSet } from 'vis-network/standalone'
import { onMounted, ref } from 'vue'

import Header from './components/Header.vue'

const graphContainer = ref(null)

const nodes = new DataSet([
	{ id: 1, label: 'Node 1' },
	{ id: 2, label: 'Node 2' },
	{ id: 3, label: 'Node 3' },
	{ id: 4, label: 'Node 4' },
	{ id: 5, label: 'Node 5' },
])

// create an array with edges
const edges = new DataSet([
	{ id: 0, from: 1, to: 3 },
	{ id: 1, from: 1, to: 2 },
	{ id: 2, from: 2, to: 4 },
	{ id: 3, from: 2, to: 5 },
	{ id: 4, from: 3, to: 3 },
])

const data = {
	nodes: nodes,
	edges: edges,
}

const options = {
	layout: {
		randomSeed: 42,
	},
}

onMounted(() => {
	if (graphContainer.value) {
		new Network(graphContainer.value, data, options)
	}
})
</script>
