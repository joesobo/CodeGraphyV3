<template>
  <SwitchGroup as="div" class="flex items-center justify-between">
    <span class="mr-4 flex grow flex-col">
      <SwitchLabel as="span" class="text-sm font-medium leading-6 text-gray-900" passive>{{ title }}</SwitchLabel>
      <SwitchDescription v-if="description" as="span" class="text-sm font-light text-gray-500">{{ description }}</SwitchDescription>
    </span>
    <Switch v-model="enabled" class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2" :class="[enabled ? 'bg-indigo-600' : 'bg-gray-200']">
      <span aria-hidden="true" class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" :class="[enabled ? 'translate-x-5' : 'translate-x-0']" />
    </Switch>
  </SwitchGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Switch, SwitchDescription, SwitchGroup, SwitchLabel } from '@headlessui/vue'

const props = defineProps<{
	title: string
	enabled?: boolean
	description?: string
}>()

const enabled = ref(props.enabled || false)
</script>
