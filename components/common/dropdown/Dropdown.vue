<script lang="ts" setup>
import { v4 } from 'uuid';
import { provide, ref } from 'vue';
import { DropdownProvision } from '../../../types/components';

const uiID = v4();
const dropdownRef = ref<HTMLDivElement>();
const isOpen = ref<boolean>(false);
const index = ref<number>(0);
const close = () => (isOpen.value = false);
const open = () => (isOpen.value = true);
const toggle = () => {
  isOpen.value = !isOpen.value;
};
const next = () => {
  index.value = ++index.value;
  focusOnItem();
};
const prev = () => {
  index.value = --index.value;
  focusOnItem();
};
// const select = () => {};

const keyDown: DropdownProvision['keyDown'] = (event) => {
  if (event.code.match(/ArrowDown|ArrowUp|Escape|Enter|Space/)) {
    event.preventDefault();
    event.stopPropagation();
  }
  switch (event.code) {
    case 'ArrowDown':
      open();
      next();
      break;
    case 'ArrowUp':
      prev();
      break;
    case 'Enter':
      toggle();
      break;
    case 'Escape':
      close();
      break;
    case 'Space':
      open();
      break;
  }
};

const focusOnItem = () => {
  const elements = document.querySelectorAll(
    `[data-ui-type="dropdown:item"][data-ui-id="${uiID}"]`
  );
  const item = elements[index.value];
  item.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'nearest',
  });
};
const handleOutsideClick = (event: Event) => {
  const dropdown = dropdownRef.value;
  if (!dropdown || !isOpen) return;
  if (!dropdown.contains(event.target as HTMLElement)) close();
};

onMounted(() => {
  window.addEventListener('click', handleOutsideClick);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', handleOutsideClick);
});

provide<DropdownProvision>('dropdown', {
  root: dropdownRef,
  uiID,
  isOpen,
  index,
  close,
  open,
  toggle,
  keyDown,
});
</script>

<template>
  <component
    is="div"
    class="relative"
    data-ui-type="dropdown"
    ref="dropdownRef"
    @click.stop
  >
    <!-- <input ref="inputRef" type="text" class="hidden" @keydown="keyDown" /> -->
    <slot :isOpen="isOpen" />
  </component>
</template>
