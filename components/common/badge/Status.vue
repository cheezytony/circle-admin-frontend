<script lang="ts" setup>
import { colorsSchemes } from '~~/utils/theme';

const props = defineProps<{
  status: string;
}>();

const colorScheme = computed<keyof typeof colorsSchemes>(() => {
  switch (props.status.toLocaleLowerCase()) {
    case 'completed':
    case 'confirmed':
    case 'fulfilled':
    case 'success':
      return 'green:soft';
    case 'failed':
    case 'error':
    case 'canceled':
      return 'red:soft';
    case 'reversed':
      return 'orange';
    case 'pending':
    default:
      return 'gray:soft';
  }
});
</script>

<template>
  <CommonBadge :color-scheme="colorScheme">
    {{ props.status }}
  </CommonBadge>
</template>
