<template>
  <button
    class="pointer-events-auto flex w-full cursor-pointer items-center p-0 hover:text-blue-300"
  >
    <div class="mr-2 h-5 w-5">
      <slot />
    </div>
    <p>{{ content }}</p>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  content: string
}>()
</script>
