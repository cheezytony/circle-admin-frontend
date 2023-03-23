<script lang="ts" setup>
const positions = {
  'top-left': 'bottom-full left-0 -translate-y-4',
  'top-center': 'bottom-full left-1/2 -translate-x-1/2 -translate-y-4',
  'top-right': 'bottom-full right-0 -translate-y-4',
  'right-center': 'left-full top-1/2 translate-x-4 -translate-y-1/2'
};

const arrowPositions = {
  top: 'border-8 border-t-black left-1/2 top-full -translate-x-1/2',
  right: 'border-[6px] border-r-black top-1/2 right-full -translate-y-1/2',
}

const props = withDefaults(
  defineProps<{
    isActive?: boolean;
    content: string;
    placement?: keyof typeof positions;
    trigger?: 'hover' | 'click';
  }>(),
  {
    isActive: true,
    trigger: 'hover',
    placement: 'top-center',
  }
);

const isOpen = ref(false);
const arrowPlacement = computed(() => props.placement.split('-')[0] as keyof typeof arrowPositions);

const handleMouseEnter = () => {
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
  <div
    class="relative inline-block"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot />
    <Transition
      enter-active-class="duration-300"
      enter-from-class="opacity-0 scale-90"
      leave-active-class="duration-300"
      leave-to-class="opacity-0 scale-90"
    >
      <div
        v-if="isOpen && isActive"
        class="absolute bg-black pointer-events-none px-4 py-2 rounded shadow-md text-white text-xs"
        :class="positions[props.placement]"
      >
        <span
          class="absolute border-transparent"
          :class="[arrowPositions[arrowPlacement]]"
        >
        </span>
        <span v-html="props.content"></span>
      </div>
    </Transition>
  </div>
</template>
