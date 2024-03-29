<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const emit = defineEmits<{
  (e: 'update:isOpen', isOpen: boolean): void;
}>();
const props = withDefaults(
  defineProps<{
    isOpen?: boolean | string | number;
    closeOnOutsideClick?: boolean;
  }>(),
  {
    closeOnOutsideClick: true,
  }
);

const modalRef = ref<HTMLElement | null>(null);
const close = () => emit('update:isOpen', false);
const handleOutsideClick = () => props.closeOnOutsideClick && close();
const handleKeyDown = (e: KeyboardEvent) => {
  e.preventDefault();
  e.stopPropagation();
  e.key === 'Escape' && close();
};

watch(
  () => props.isOpen,
  async (isOpen) => {
    nextTick(() => {
      isOpen ? modalRef.value?.focus() : modalRef.value?.blur();
    });
  }
);
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="duration-150"
      enter-from-class="opacity-0"
      leave-active-class="duration-300"
      leave-to-class="opacity-0"
    >
      <div
        ref="modalRef"
        v-show="isOpen"
        tabindex="1"
        class="fixed flex inset-0 overflow-y-auto p-6 z-[1100]"
        :class="{ 'dialog-open': isOpen }"
        @keydown="handleKeyDown"
      >
        <div
          class="fixed bg-black bg-opacity-50 cursor-pointer inset-0"
          @click="handleOutsideClick"
        />
        <Transition
          enter-active-class="duration-150"
          enter-from-class="scale-[.95] -translate-y-10"
          leave-active-class="duration-150"
          leave-to-class="scale-[.95] translate-y-10"
        >
          <div
            v-if="isOpen"
            class="bg-white max-w-lg m-auto rounded-lg p-8 relative transform w-fit"
          >
            <div class="absolute right-4 top-4">
              <Button color-scheme="gray:soft" size="sm" @click="close">
                <FontAwesomeIcon icon="times" @click="close" />
              </Button>
            </div>
            <slot />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
