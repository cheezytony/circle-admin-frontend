<script lang="ts" setup>
import {
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  Ref,
} from 'vue';
import { DropdownProvision } from '../../../types/components';

defineProps<{
  class?: string;
}>();

const { isOpen, root, close } = inject<DropdownProvision>('dropdown')!;

const menuRef = ref<HTMLElement>();
const position = ref({ x: 0, y: 0 });
const isPositioned = ref(false);

const resetOverflow = () => {
  position.value = { x: 0, y: 0 };
};
const positionMenu = () => {
  const menu = menuRef.value;
  if (!menu || menu.tagName === '#comment') return;
  const dropdown = root?.value;
  if (!dropdown) return;
  const menuBoundaries = menu.getBoundingClientRect();
  const dropdownBoundaries = dropdown.getBoundingClientRect();
  resetOverflow();

  position.value.x =
    dropdownBoundaries.right + menuBoundaries.width > window.innerWidth
      ? dropdownBoundaries.right - menuBoundaries.width
      : dropdownBoundaries.left;
  position.value.y =
    dropdownBoundaries.bottom + menuBoundaries.height > window.innerHeight
      ? dropdownBoundaries.top - menuBoundaries.height
      : dropdownBoundaries.bottom;
  isPositioned.value = true;
};

onMounted(() => {
  positionMenu();
  window.addEventListener('scroll', positionMenu);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', positionMenu);
});

// @ts-ignore
watch(isOpen, () => {
  nextTick().then(positionMenu);
});
</script>

<template>
  <Teleport to="body">
    <Transition enter-from-class="opacity-0 scale-[.95]">
      <div
        v-bind="{ ...$attrs, ...$props }"
        class="fixed min-w-[200px] max-w-screen mt-2 overflow-auto origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transform focus:outline-none z-[1090]"
        :class="[
          !isOpen && 'opacity-0 pointer-events-none scale-[.95]',
          isPositioned && 'duration-300',
        ]"
        data-ui-type="dropdown:menu"
        :style="{ left: `${position.x}px`, top: `${position.y}px` }"
        ref="menuRef"
      >
        <div class="p-1.5">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
