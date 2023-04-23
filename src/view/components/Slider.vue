<template>
  <div class="relative space-y-2">
    <div class="flex w-full items-center justify-between">
      <div class="flex w-full flex-col">
        <div class="flex w-full justify-between">
          <div class="text-sm font-medium text-gray-700">
            {{ title }}
          </div>
          <div class="text-sm font-medium text-gray-700">
            {{ localValue }}
          </div>
        </div>
        <div v-if="description" class="text-sm text-gray-500">
          {{ description }}
        </div>
      </div>
    </div>

    <VueSlider v-model="localValue" :min="min" :max="max" :interval="step" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, withDefaults } from 'vue'

import VueSlider from 'vue-slider-component'

const props = withDefaults(defineProps<{
  title: string
  modelValue?: number
  min?: number
  max?: number
  step?: number
  description?: string
}>(), {
	min: 0,
	max: 100,
	step: 1,
	modelValue: 0,
})

const emit = defineEmits<(e: 'update:modelValue', value: number) => void>()

const localValue = ref(props.modelValue)

watch(localValue, (newValue) => {
	emit('update:modelValue', newValue)
})
</script>
