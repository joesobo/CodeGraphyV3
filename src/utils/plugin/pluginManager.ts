import { EventEmitter } from 'node:events'
import type { GraphViewProvider } from '../GraphViewProvider'
import { getPluginData, resetPluginData } from './info/info'
import type { PluginData } from './types'
import { loadPlugins } from './loadPlugins'

export const registeredPlugins: PluginData[] = []

export class PluginManager extends EventEmitter {
	private pluginCount = 0
	private timeoutId?: NodeJS.Timeout
	private readonly TIMEOUT_DURATION: number = 1000 // time to wait for all plugins to register before running
	private graphProvider: GraphViewProvider

	constructor(graphProvider: GraphViewProvider) {
		super()
		this.on('pluginRegistered', this.resetTimeout.bind(this))
		this.graphProvider = graphProvider
	}

	registerPlugin(pluginData: PluginData) {
		if (!registeredPlugins) {
			resetPluginData()
		}

		registeredPlugins.push(pluginData)
		this.pluginCount++
		this.emit('pluginRegistered')
	}

	private resetTimeout() {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId)
		}

		this.timeoutId = setTimeout(() => {
			this.allPluginsLoaded()
		}, this.TIMEOUT_DURATION)
	}

	private allPluginsLoaded = async () => {
		loadPlugins()
		await this.graphProvider.postMessage({
			command: 'pluginLoaded',
			data: getPluginData(),
		})
	}
}
