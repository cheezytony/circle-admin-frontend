<script lang="ts" setup>
import { ApplicationColor } from '~/utils';

const props = defineProps<{
  colorScheme?: ApplicationColor;
}>();

const colorScheme = computed(() => getAppColor(props.colorScheme, ['bg', 'border', 'text']));
</script>

<template>
  <div class="inline-flex gap-2 px-3 py-2 rounded text-sm" :class="colorScheme">
    <slot></slot>
  </div>
</template>
