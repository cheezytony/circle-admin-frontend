<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ApplicationColor } from '~~/utils/theme';

const props = defineProps<{
  status: string;
  iconOnly?: boolean;
}>();

const theme = computed<{color: ApplicationColor, icon: string }>(() => {
  switch (props.status.toLocaleLowerCase()) {
    case 'active':
    case 'completed':
    case 'confirmed':
    case 'fulfilled':
    case 'success':
      return { color: 'green:soft', icon: 'check-double'};
    case 'failed':
    case 'error':
    case 'canceled':
      return { color: 'red:soft', icon: 'ban'};
    case 'reversed':
      return { color: 'orange', icon: 'rotate-left'};
    case 'pending':
    default:
      return { color: 'gray:soft', icon: 'hourglass-half'};
  }
});
</script>

<template>
  <Badge :color-scheme="theme.color">
    <FontAwesomeIcon :icon="theme.icon" size="xs" />
    <span v-if="!iconOnly">
      {{ props.status }}
    </span>
  </Badge>
</template>
