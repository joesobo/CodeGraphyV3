<template>
  <form>
    <div class="space-y-12 px-4 pb-8 pt-2">
      <p class="max-w-2xl text-sm font-light leading-6 text-gray-600">
        These settings are applied to all nodes.
      </p>

      <div class="mt-6 space-y-8">
        <Toggle title="Packages" description="Render used packages as nodes" />

        <Toggle title="Orphans" description="Render nodes with no connections" />

        <Toggle title="Labels" description="Render node labels" />

        <Toggle title="Outlines" description="Render node outlines" />

        <Toggle title="Arrows" description="Render connection arrows" />

        <!-- TODO: Move to Forces? -->
        <Toggle title="Collisions" description="Allow nodes to collide" />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import Toggle from './Toggle.vue'
</script>
