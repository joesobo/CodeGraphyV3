<template>
  <SwitchGroup as="div" class="flex items-center justify-between">
    <span class="mr-4 flex grow flex-col">
      <SwitchLabel as="span" class="text-sm font-medium leading-6 text-gray-900" passive>{{ title }}</SwitchLabel>
      <SwitchDescription v-if="description" as="span" class="text-sm font-light text-gray-500">{{ description }}</SwitchDescription>
    </span>
    <PickColors v-model:value="localColor" class="cursor-pointer" />
  </SwitchGroup>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { SwitchDescription, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import PickColors from 'vue-pick-colors'

const props = defineProps<{
	title: string
	color?: string
	description?: string
}>()

const emit = defineEmits<(e: 'update:color', value: string) => void>()

const localColor = ref(props.color || '#fff')

watch(localColor, (newVal) => {
	emit('update:color', newVal)
})
</script>
