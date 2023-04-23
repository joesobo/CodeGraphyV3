<template>
  <Menu v-slot="{ open }" as="div" class="relative">
    <div class="mx-auto max-w-7xl px-2">
      <div class="relative flex h-16 items-center justify-between">
        <div class="flex items-center px-2">
          <div class="shrink-0">
            <img class="block h-8 w-auto" src="https://user-images.githubusercontent.com/26047842/177056994-e6be0cd0-6e18-40c1-a254-ae847c62ffaf.png" alt="CodeGraphy">
          </div>
        </div>
        <div class="flex flex-1 justify-center px-2">
          <div class="w-full max-w-lg">
            <label for="search" class="sr-only">Search</label>
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input id="search" name="search" class="block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-gray-300 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0" placeholder="Search" type="search">
            </div>
          </div>
        </div>
        <div class="inline-flex cursor-pointer items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
          <span class="sr-only">Change connection mode</span>
          <GraphIcon
            class="block h-6 w-6"
          />
        </div>
        <MenuButton class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
          <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
        </MenuButton>
      </div>
    </div>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems class="absolute right-0 z-10 mt-2 w-64 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        <p class="px-4 py-3 text-sm font-medium text-gray-900">
          Settings
        </p>
        <MenuItem v-slot="{ active }">
          <div>
            <div class="flex cursor-pointer items-center justify-between p-4" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700']" @click.stop="toggleSettings('nodes')">
              <a href="#" class="block text-sm focus:outline-none">Nodes</a>
              <ChevronUpIcon v-if="openSettings === 'nodes'" class="block h-5 w-5 text-gray-400" aria-hidden="true" />
              <ChevronDownIcon v-else class="block h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <NodeSettingsForm v-if="openSettings === 'nodes'" />
          </div>
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <div>
            <a href="#" class="block p-4 text-sm" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700']" @click.stop="toggleSettings('colors')">Colors</a>
          </div>
        </MenuItem>
        <MenuItem v-slot="{ active }" class="rounded-md">
          <div class="rounded-md">
            <a href="#" class="block rounded-md p-4 text-sm" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700']" @click.stop="toggleSettings('forces')">Forces</a>
          </div>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

import { ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

import { ref } from 'vue'
import NodeSettingsForm from './NodeSettingsForm.vue'
import GraphIcon from '~icons/ph/graph'

const openSettings = ref('')

const toggleSettings = (settings: string) => {
	openSettings.value = openSettings.value === settings ? '' : settings
}
</script>
