<script lang="ts" setup>
const sizes = {
  xs: 'h-2',
  sm: 'h-4',
  md: 'h-6',
  lg: 'h-8',
  xl: 'h-10',
};
const colors = {
  black: 'bg-black text-black',
  blue: 'bg-blue-500 text-blue-500',
  gray: 'bg-gray-500 text-gray-500',
  green: 'bg-green-500 text-green-500',
  orange: 'bg-orange-500 text-orange-500',
  purple: 'bg-purple-500 text-purple-500',
  red: 'bg-red-500 text-red-500',
  white: 'bg-white text-white',
}
const props = withDefaults(
  defineProps<{
    colorScheme?: keyof typeof colors;
    size?: keyof typeof sizes;
    hideLabel?: boolean;
    value: number;
  }>(),
  {
    colorScheme: 'black',
    hideLabel: false,
    size: 'md',
  }
);

const color = computed<string>(() => colors[props.colorScheme]);

const size = computed<string>(() => sizes[props.size]);
</script>

<template>
  <div class="overflow-hidden bg-opacity-10 relative rounded" :class="[color, size]">
    <div class="h-full" :class="[color]" :style="{ width: `${value}%` }" />
    <div
      v-if="!hideLabel"
      class="absolute grid mix-blend-difference inset-0 place-items-center text-white text-xs"
    >
      {{ value }}%
    </div>
  </div>
</template>
