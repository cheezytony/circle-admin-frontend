<script lang="ts" setup>
import { BasePlacement, VariationPlacement } from '@popperjs/core';
import { Popper } from '#components';

const positions = {
  // 'auto': 'bottom-full left-1/2 -translate-x-1/2 -translate-y-6',
  // 'top-start': 'bottom-full left-0 -translate-y-6',
  'bottom': 'top-full left-1/2 -translate-x-1/2 -translate-y-6',
  'top': 'bottom-full left-1/2 -translate-x-1/2 -translate-y-6',
  // 'top-end': 'bottom-full right-0 -translate-y-6',
  'right': 'left-full top-1/2 translate-x-6 -translate-y-1/2',
  'left': 'right-full top-1/2 translate-x-6 -translate-y-1/2',
};

const arrowPositions = {
  top: 'border-8 border-t-black left-1/2 top-full -translate-x-1/2',
  right: 'border-[6px] border-r-black top-1/2 right-full -translate-y-1/2',
};

const props = withDefaults(
  defineProps<{
    isActive?: boolean;
    content: string;
    placement?: BasePlacement;
    trigger?: 'hover' | 'click';
  }>(),
  {
    isActive: true,
    trigger: 'hover',
    placement: 'top',
  }
);

const popperRef = ref<InstanceType<typeof Popper>>();
const isOpen = ref(false);
const arrowPlacement = computed(
  () => props.placement.split('-')[0] as keyof typeof arrowPositions
);

const handleMouseEnter = () => {
  popperRef.value?.updatePosition();
  if (props.trigger === 'hover' && props.isActive) {
    isOpen.value = true;
  }
};
const handleMouseLeave = () => {
  if (props.trigger === 'hover' && props.isActive) {
    isOpen.value = false;
  }
};
</script>

<template>
  <Popper
    ref="popperRef"
    :placement="placement"
    z-index="9999"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <template #default>
      <slot />
    </template>
    <template #popper>
      <Transition
        enter-active-class="duration-300"
        enter-from-class="opacity-0 scale-90"
        leave-active-class="duration-300"
        leave-to-class="opacity-0 scale-90"
      >
        <div
          v-if="isOpen && isActive"
          class="absolute bg-black px-4 py-2 rounded shadow-md pointer-events-none text-white text-xs"
          :class="positions[props.placement]"
        >
          <span
            class="absolute border-transparent"
            :class="[arrowPositions[arrowPlacement]]"
          >
          </span>
          <span v-html="props.content" class="whitespace-nowrap"></span>
        </div>
      </Transition>
    </template>
  </Popper>
</template>

<!-- isOpen && isActive -->
