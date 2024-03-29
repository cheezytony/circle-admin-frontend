<script lang="ts" setup>
import { computed } from 'vue';
import { NuxtLinkProps } from '#app';
import { NuxtLink } from '#components';
import { ApplicationColor, getAppColor } from '~~/utils';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const SIZES = {
  sm: 'font-medium gap-2 px-4 py-[0.5rem] rounded-[4px] text-[12px]',
  lg: 'font-medium gap-3 px-10 py-[1.25rem] rounded-[4px] text-[16px]',
  md: 'font-medium gap-3 max-w-full px-[24px] py-[0.825rem] rounded-[4px] text-[14px]',
};

const props = withDefaults(
  defineProps<{
    colorScheme?: ApplicationColor;
    disabled?: boolean;
    href?: NuxtLinkProps['href'];
    isLoading?: boolean;
    leftIcon?: string;
    rightIcon?: string;
    size?: 'sm' | 'md' | 'lg';
    to?: NuxtLinkProps['to'];
    type?: 'button' | 'reset' | 'submit';
    variant?: 'dropdown' | 'link' | 'solid';
  }>(),
  {
    colorScheme: 'black',
    size: 'md',
    type: 'button',
  }
);

const color = computed<string>(() => {
  if (props.variant === 'link') {
    switch (props.colorScheme) {
      case 'gray':
        return 'text-gray-500';
      case 'red':
        return 'text-red-500';
      case 'blue':
      default:
        return 'text-blue-500';
    }
  }

  return getAppColor(props.colorScheme, [
    'bg',
    'border',
    'focus',
    'hover',
    'text',
  ]);
});

const box = computed<string>(() => {
  if (props.variant === 'dropdown') return 'gap-2 text-[14px]';
  if (props.variant === 'link') return 'font-medium text-[14px]';

  return SIZES[props.size];
});

const attrs = computed(() => {
  if (props.to || props.href) {
    return { href: props.href, to: props.to };
  }

  return { type: props.type };
});

const is = computed(() => {
  if (props.to || props.href) return NuxtLink;
  return 'button';
});
</script>

<template>
  <component
    :is="is"
    :disabled="isLoading || disabled"
    v-bind="attrs"
    class="duration-300 inline-flex items-center justify-center tracking-[1px] transform active:scale-90 uppercase"
    :class="[
      box,
      color,
      isLoading || disabled
        ? 'cursor-not-allowed opacity-50'
        : 'hovers:-translate-y-1 active:scale-[0.95]',
    ]"
  >
    <template v-if="isLoading">
      <LoaderSmall />
    </template>
    <template v-else>
      <span v-if="leftIcon">
        <FontAwesomeIcon :icon="leftIcon" />
      </span>
      <slot />
      <span v-if="rightIcon">
        <FontAwesomeIcon :icon="rightIcon" />
      </span>
    </template>
  </component>
</template>
