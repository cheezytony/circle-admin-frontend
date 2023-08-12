<script lang="ts" setup>
import DTableTD from './TD.vue';
import Dropdown from '../dropdown/Dropdown.vue';
</script>

<template>
  <DTableTD class="px-0 align-middle w-0">
    <Dropdown class="flex items-center">
      <button>
      </button>
      <template #items>
        <slot />
      </template>
    </Dropdown>
  </DTableTD>
</template>
