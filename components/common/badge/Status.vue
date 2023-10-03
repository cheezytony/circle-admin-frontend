<script lang="ts" setup>
import { ApplicationColor } from '~~/utils/theme';

const props = defineProps<{
  status: string;
}>();

const colorScheme = computed<ApplicationColor>(() => {
  switch (props.status.toLocaleLowerCase()) {
    case 'active':
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
  <Badge :color-scheme="colorScheme">
    {{ props.status }}
  </Badge>
</template>
