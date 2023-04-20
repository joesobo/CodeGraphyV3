import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

import Graph from './Graph.vue'
import Stats from './Stats.vue'
import { messages } from '../locales'

const i18n = createI18n({
	legacy: false,
	locale: 'en',
	messages,
})

const graph = createApp(Graph)
graph.use(i18n).mount('#graph-app')

const stats = createApp(Stats)
stats.use(i18n).mount('#stats-app')
