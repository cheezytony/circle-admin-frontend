<script lang="ts" setup>
import { inject } from 'vue';
import { DropdownProvision } from '../../../types/components';

const { isOpen, close, toggle, keyDown } = inject<DropdownProvision>('dropdown')!;
</script>

<template>
  <button type="button" @click.prevent="toggle" @keydown="keyDown">
    <slot :isOpen="isOpen" />
  </button>
</template>
