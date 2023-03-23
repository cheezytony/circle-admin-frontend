<template>
  <div
    class="flex gap-2 items-center mb-8 px-[24px] py-[12px] rounded-[4px] text-[13px]"
    :class="[color.theme]"
  >
    <span>
      <FontAwesomeIcon :icon="color.icon" />
    </span>
    <div class="leading-[1.2]">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed } from 'vue';

const COLORS = {
  red: {
    theme: 'bg-red-400 text-white',
    icon: 'fa-solid fa-circle-exclamation',
  },
  blue: {
    theme: 'bg-blue-500 text-white',
    icon: 'fa-solid fa-circle-exclamation',
  },
  green: {
    theme: 'bg-green-500 text-white',
    icon: 'fa-solid fa-circle-check',
  },
};

const props = withDefaults(
  defineProps<{
    colorScheme?: keyof typeof COLORS;
  }>(),
  {
    colorScheme: 'blue',
  }
);

const color = computed(() => {
  return COLORS[props.colorScheme];
});
</script>
