<template>
  <div
    class="rounded-md border bg-[#202125] px-4 py-2 text-white"
  >
    <!-- Add File -->
    <form v-if="creatingFile" class="flex">
      <input
        v-model="newFileName"
        type="text"
        class="border-border mr-2 border text-white"
      >
      <button type="submit" @click="addFile">
        Add File
      </button>
    </form>

    <!-- Add Folder -->
    <form v-else-if="creatingFolder" class="flex">
      <input
        v-model="newFolderName"
        type="text"
        class="border-border mr-2 border text-white"
      >
      <button type="submit" @click="addFolder">
        Add Folder
      </button>
    </form>

    <!-- Rename Node -->
    <form v-else-if="renamingNode" class="flex">
      <input
        v-model="newNodeName"
        type="text"
        class="border-border mr-2 border text-white"
      >
      <button type="submit" @click="renameNode">
        Rename Node
      </button>
    </form>

    <!-- Main Content -->
    <div v-else>
      <p class="mb-2 text-lg">
        {{ contextNode.label }}
      </p>

      <div class="flex flex-col justify-between space-y-2">
        <IconButton
          content="Add File"
          @click="startCreatingFile"
        >
          <FileIcon width="1.25rem" height="1.25rem" />
        </IconButton>
        <IconButton
          v-if="canCreateFolder"
          content="Add Folder"
          @click="startCreatingFolder"
        >
          <FolderIcon width="1.25rem" height="1.25rem" />
        </IconButton>
        <IconButton
          v-if="canFavorite"
          content="Favorite"
          @click="favoriteFile"
        >
          <StarIcon width="1.25rem" height="1.25rem" />
        </IconButton>
        <IconButton content="Rename">
          <RenameIcon
            width="1.25rem"
            height="1.25rem"
            @click="startRenamingNode"
          />
        </IconButton>
        <IconButton content="Copy Path" @click="copyPath">
          <CopyIcon width="1.25rem" height="1.25rem" />
        </IconButton>
        <IconButton content="Delete" @click="deleteNode">
          <DeleteIcon width="1.25rem" height="1.25rem" />
        </IconButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

import type { Node } from '../../utils/types'
import IconButton from './IconButton.vue'

import CopyIcon from '~icons/mdi/content-copy'
import DeleteIcon from '~icons/mdi/delete'
import FileIcon from '~icons/mdi/file'
import FolderIcon from '~icons/mdi/folder'
import RenameIcon from '~icons/mdi/rename'
import StarIcon from '~icons/mdi/star'

const props = defineProps<{
  contextNode: Node
}>()

const emit = defineEmits<{
  (event: 'close'): void
	(update: 'update'): void
}>()

const creatingFile = ref(false)
const newFileName = ref('')

const creatingFolder = ref(false)
const newFolderName = ref('')

const renamingNode = ref(false)
const newNodeName = ref('')

let handleKeyDown: (event: KeyboardEvent) => void

onMounted(() => {
	handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			emit('close')
		}
	}
	window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
	window.removeEventListener('keydown', handleKeyDown)
})

const canCreateFolder = computed(() => props.contextNode.type === 'Directory')
const canFavorite = computed(() => props.contextNode.type !== 'Directory')

const startCreatingFile = () => {
	creatingFile.value = true
	emit('update')
}

const startCreatingFolder = () => {
	creatingFolder.value = true
	emit('update')
}

const startRenamingNode = () => {
	renamingNode.value = true
	emit('update')
}

const addFile = () => {
	vscode.postMessage({
		command: 'createFile',
		text: {
			nodeConnection: {
				...props.contextNode,
			},
			newFileName: newFileName.value,
		},
	})

	creatingFile.value = false
	newFileName.value = ''
	emit('close')
}

const addFolder = () => {
	vscode.postMessage({
		command: 'createFolder',
		text: {
			nodeConnection: {
				...props.contextNode,
			},
			newFolderName: newFolderName.value,
		},
	})

	creatingFolder.value = false
	newFolderName.value = ''
	emit('close')
}

const renameNode = () => {
	vscode.postMessage({
		command: 'renameNode',
		text: {
			node: {
				...props.contextNode,
			},
			newNodeName: newNodeName.value,
		},
	})

	renamingNode.value = false
	newNodeName.value = ''
	emit('close')
}

const favoriteFile = () => {
	vscode.postMessage({
		command: 'favoriteFile',
		text: {
			node: {
				...props.contextNode,
			},
		},
	})
	emit('close')
}

const copyPath = () => {
	vscode.postMessage({
		command: 'copyPath',
		text: {
			path: props.contextNode.path,
		},
	})
	emit('close')
}

const deleteNode = () => {
	vscode.postMessage({
		command: 'deleteNode',
		text: {
			node: { ...props.contextNode },
		},
	})
	emit('close')
}
</script>
