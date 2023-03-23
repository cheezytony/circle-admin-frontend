<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  level?: '1' | '2' | '3' | '4';
}>();

const sizing = computed(() => {
  switch (props.level) {
    case '2':
      return 'font-medium leading-[1.2] text-[24px]';
    case '3':
      return 'font-medium leading-[1.2] text-[18px]';
    case '1':
    default:
      return 'font-medium leading-[1.2] mb-16 text-[32px]';
  }
});
</script>

<template>
  <div :class="[sizing]">
    <slot />
  </div>
</template>
