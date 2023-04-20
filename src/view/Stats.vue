<template>
  <div class="mx-auto flex w-3/4 flex-col items-center">
    <IconLighthouse style="font-size: 4em" class="my-2" />
    <h1 class="text-lg">Vue 3 Extension Template</h1>

    <hr class="mb-8 mt-4 w-full border-white" />

    <div class="flex gap-4">
      <label>{{ t('language') }}</label>
      <select v-model="locale" class="text-black">
        <option value="en">en</option>
        <option value="ja">ja</option>
        <option value="fr">fr</option>
      </select>
    </div>
    <p>Translated Content: {{ t('hello') }}</p>

    <Button />

    <p class="mb-2 mt-4">Current File: {{ currentFile }}</p>
    <button @click="openLastFile">Open Last File</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import Button from './components/Button.vue'

import IconLighthouse from '~icons/mdi/lighthouse'

const { t, locale } = useI18n()

let currentFile = ref('')
let lastFile = ref('')

// Example of handling messages sent from the extension to the webview
window.addEventListener('message', (event) => {
	const message = event.data // The JSON data our extension sent

	switch (message.command) {
	case 'setCurrentFileExample':
		lastFile.value = currentFile.value
		currentFile.value = message.text
		return
	}
})

// Example of sending a message from the webview to the extension
const openLastFile = () => {
	vscode.postMessage({
		command: 'openFileExample',
		text: lastFile.value,
	})
}
</script>
