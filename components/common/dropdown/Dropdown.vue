<script lang="ts" setup>
import { NuxtLink } from '#components';

interface DropdownItem {
  disabled?: boolean;
  href?: string;
  isDivider?: boolean;
  key?: string;
  title: string;
  value?: string;
  onClick?: VoidFunction;
}

const slots = useSlots();
const emit = defineEmits<{
  (e: 'open'): void;
  (e: 'close'): void;
}>();
const props = withDefaults(
  defineProps<{
    items?: Array<DropdownItem>;
  }>(),
  {
    items: () => [],
  }
);

const isOpen = ref(false);
const open = () => {
  updateDomRect();
  isOpen.value = true;
  emit('open');
};
const close = () => {
  isOpen.value = false;
  emit('close');
};
const toggle = () => {
  isOpen.value ? close() : open();
};

const index = ref<number | null>(null);
const itemsRendered = ref(0);
const updateItemsRendered = () => {
  itemsRendered.value = menuRef.value!.querySelectorAll('ul > li').length || 0;
};
const maxItems = computed(() => {
  if (slots.items) return itemsRendered.value;
  return props.items.filter((item) => !item.isDivider).length;
});
const next = () => {
  updateItemsRendered();
  if (index.value === null) {
    index.value = 0;
  } else {
    index.value = (index.value + 1) % maxItems.value;
  }
};
const prev = () => {
  updateItemsRendered();
  if (index.value === null) {
    index.value = maxItems.value - 1;
  } else {
    index.value = (index.value - 1 + maxItems.value) % maxItems.value;
  }
};
const select = () => {
  if (index.value === null) return;
  const item = menuRef.value!.querySelectorAll('ul > li')[index.value];
  if (!item) return;
  const link = item.querySelector<HTMLAnchorElement | HTMLButtonElement>(
    'a, button'
  );
  if (!link) return;
  link.click();
};

const inputRef = ref<HTMLInputElement>();
const menuRef = ref<HTMLElement>();
const menuDomRect = ref<DOMRect>();
const triggerRef = ref<HTMLElement>();
const triggerDomRect = ref<DOMRect>();
const domRectCheckInterval = ref<NodeJS.Timeout>();
const updateDomRect = () => {
  clearTimeout(domRectCheckInterval.value);

  triggerDomRect.value =
    triggerRef.value?.children?.[0]?.getBoundingClientRect();
  menuDomRect.value = menuRef.value?.getBoundingClientRect();

  domRectCheckInterval.value = setTimeout(updateDomRect, 100);
};

const overflowingBottom = computed(() => {
  if (!menuDomRect.value || !triggerDomRect.value) return false;

  return (
    window.innerHeight < menuDomRect.value.height + triggerDomRect.value.bottom
  );
});

const overflowingRight = computed(() => {
  if (!menuDomRect.value || !triggerDomRect.value) return false;
  return (
    window.innerWidth < menuDomRect.value.width + triggerDomRect.value.left
  );
});

const handleTriggerClick = () => toggle();
const handleItemClick = (item: DropdownItem) => {
  close();
  item.onClick?.();
};
const handleOutsideClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const inTrigger = target
    .closest('[data-ui-type="dropdown"]')
    ?.isSameNode(triggerRef.value!);

  const inMenu = target
    .closest('[data-ui-type="dropdown-menu"]')
    ?.isSameNode(menuRef.value!);

  if (!inTrigger && !inMenu) {
    close();
  }
};
const handleInputKeydown = (event: KeyboardEvent) => {
  if (event.key.match(/(Arrow(Down|Up))|Escape|Enter|\s/)) {
    event.preventDefault();
  }
  
  switch (event.key) {
    case 'ArrowDown':
      isOpen.value ? next() : open();
      break;
    case 'ArrowUp':
      isOpen.value ? prev() : open();
      break;
    case 'Escape':
      close();
      break;
    case 'Enter':
    case ' ': {
      isOpen.value ? select() : open();
      break;
    }
  }
};

const resizeObserver = new ResizeObserver(updateDomRect);

onMounted(() => {
  updateDomRect();
  window.addEventListener('resize', updateDomRect);
  window.addEventListener('scroll', updateDomRect);
  window.addEventListener('click', handleOutsideClick);
  resizeObserver.observe(menuRef.value!);
  if (triggerRef.value!.children[0]) {
    resizeObserver.observe(triggerRef.value!.children[0]);
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', updateDomRect);
  window.removeEventListener('scroll', updateDomRect);
  window.removeEventListener('click', handleOutsideClick);
  resizeObserver.disconnect();
});
</script>

<template>
  <div
    class="inline"
    data-ui-type="dropdown"
    tabindex="0"
    ref="triggerRef"
    @click="handleTriggerClick"
    @keydown="handleInputKeydown"
  >
    <slot v-bind="{ isOpen }" />
    <Teleport to="body">
      <div
        class="fixed pointer-events-none z-[1099]"
        :style="{
          top: `${triggerDomRect?.top || 0}px`,
          left: `${triggerDomRect?.left || 0}px`,
          width: `${triggerDomRect?.width || 0}px`,
          height: `${triggerDomRect?.height || 0}px`,
        }"
      >
        <div
          class="absolute bg-white duration-300 pointer-events-auto rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
          :class="{
            'opacity-0 pointer-events-none invisible': !isOpen,
            'right-0': overflowingRight,
            'left-0': !overflowingRight,
            'top-full translate-y-2': !overflowingBottom,
            'bottom-full -translate-y-4': overflowingBottom,
          }"
          data-ui-type="dropdown-menu"
          ref="menuRef"
        >
          <slot v-if="$slots.items" name="items" :index="index" :close="close" />
          <ul v-else-if="items.length" class="flex flex-col">
            <template v-for="(item, itemIndex) in items" :key="itemIndex">
              <!-- <hr v-if="item.isDivider" class="my-1" /> -->
              <li @click="handleItemClick(item)">
                <slot
                  v-if="$slots.item"
                  v-bind="{
                    item,
                    itemIndex,
                    index,
                    isSelected: itemIndex === index,
                    close,
                  }"
                  name="item"
                />
                <component
                  v-else
                  :is="item.href ? NuxtLink : 'button'"
                  :href="item.href"
                  class="flex items-center justify-between px-4 py-2 rounded text-sm w-full whitespace-nowrap hover:bg-gray-100"
                  :class="{
                    'bg-gray-100': itemIndex === index,
                  }"
                >
                  <div class="flex items-center gap-2">
                    <span class>{{ item.title }}</span>
                  </div>
                </component>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </Teleport>
  </div>
</template>
