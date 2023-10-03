<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const colorSchemes = {
  black: ['black:soft', 'black'],
  blue: ['blue:soft', 'blue'],
  green: ['green:soft', 'green'],
  red: ['red:soft', 'red'],
};

const props = withDefaults(defineProps<{
  colorScheme?: keyof typeof colorSchemes;
  isActive?: boolean;
  leftIcon?: string;
  rightIcon?: string;
}>(), { colorScheme: 'black' });

const colorScheme = computed(() => {
  const [baseColor, activeColor] = colorSchemes[props.colorScheme];
  return getAppColor(
    (props.isActive ? activeColor : baseColor) as keyof typeof colorSchemes,
    ['bg', 'border', 'hover', 'text', 'focus']
  );
});
</script>

<template>
  <div class="cursor-pointer inline-flex gap-2 px-4 py-2 rounded text-sm" :class="colorScheme">
    <span v-if="leftIcon">
      <FontAwesomeIcon :icon="leftIcon" />
    </span>
    <slot />
    <span v-if="rightIcon">
      <FontAwesomeIcon :icon="rightIcon" />
    </span>
  </div>
</template>
