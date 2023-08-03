<script lang="ts" setup>
const positions = {
  'top-left': 'bottom-full left-0 -translate-y-6',
  'top-center': 'bottom-full left-1/2 -translate-x-1/2 -translate-y-6',
  'top-right': 'bottom-full right-0 -translate-y-6',
  'right-center': 'left-full top-1/2 translate-x-6 -translate-y-1/2',
};

const arrowPositions = {
  top: 'border-8 border-t-black left-1/2 top-full -translate-x-1/2',
  right: 'border-[6px] border-r-black top-1/2 right-full -translate-y-1/2',
};

const wrapper = ref<HTMLDivElement>();
const boundingRect = ref<DOMRect>();

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
const arrowPlacement = computed(
  () => props.placement.split('-')[0] as keyof typeof arrowPositions
);
const width = computed(() => `${boundingRect.value?.width || 0}px`);
const height = computed(() => `${boundingRect.value?.height || 0}px`);
const left = computed(() => `${boundingRect.value?.left || 0}px`);
const top = computed(() => `${boundingRect.value?.top || 0}px`);

const handleMouseEnter = () => {
  if (props.trigger === 'hover' && props.isActive) {
    updateCoordinates();
    isOpen.value = true;
  }
};
const handleMouseLeave = () => {
  if (props.trigger === 'hover' && props.isActive) {
    isOpen.value = false;
  }
};

const updateCoordinates = () => {
  if (!wrapper.value) return;
  boundingRect.value = wrapper.value.getBoundingClientRect();
};

onMounted(updateCoordinates);
</script>

<template>
  <div
    ref="wrapper"
    class="relative inline-block"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot />
    <Teleport to="body">
      <div
        class="fixed pointer-events-none z-[9999]"
        :style="{ width, height, top, left }"
      >
        <Transition
          enter-active-class="duration-300"
          enter-from-class="opacity-0 scale-90"
          leave-active-class="duration-300"
          leave-to-class="opacity-0 scale-90"
        >
          <div
            v-if="isOpen && isActive"
            class="absolute bg-black px-4 py-2 rounded shadow-md text-white text-xs"
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
      </div>
    </Teleport>
  </div>
</template>

<!-- isOpen && isActive -->
