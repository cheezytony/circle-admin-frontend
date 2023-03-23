<script lang="ts" setup>
import DTableTD from './TD.vue';
import Dropdown from '../dropdown/Dropdown.vue';
import DropdownButton from '../dropdown/DropdownButton.vue';
import DropdownMenu from '../dropdown/DropdownMenu.vue';
</script>

<template>
  <DTableTD class="px-0 align-middle w-0">
    <Dropdown class="flex items-center">
      <DropdownButton>
      </DropdownButton>
      <DropdownMenu>
        <slot />
      </DropdownMenu>
    </Dropdown>
  </DTableTD>
</template>
