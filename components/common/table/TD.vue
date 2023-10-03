<script lang="ts" setup>
withDefaults(
  defineProps<{
    padding?: string;
  }>(),
  {
    padding: 'px-4 py-2 md:first:pl-8 md:last:pr-8',
  }
);
</script>

<template>
  <td :class="padding">
    <slot />
  </td>
</template>
