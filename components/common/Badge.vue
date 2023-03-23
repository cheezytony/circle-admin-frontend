<script lang="ts" setup>
import { colorsSchemes, getColorScheme } from '~~/utils/theme';

const props = defineProps<{
  colorScheme?: keyof typeof colorsSchemes;
}>();

const colorScheme = computed(() => getColorScheme(props.colorScheme));
</script>

<template>
  <div class="inline-flex gap-2 px-3 py-2 rounded text-sm" :class="colorScheme">
    <slot></slot>
  </div>
</template>
