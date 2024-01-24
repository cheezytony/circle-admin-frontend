<script lang="ts" setup>
import { NuxtLink } from '#components';
import type { DropdownProvision } from '~/types';

defineProps<{
  href?: string;
}>();

const { index, navigate } = inject<DropdownProvision>('dropdown')!;

const itemRef = ref<HTMLButtonElement | InstanceType<typeof NuxtLink>>();
const itemIndex = ref<number | null>(null);
const isSelected = computed(() => index.value === itemIndex.value);

const onMouseEnter = () => {
  itemIndex.value !== null && navigate(itemIndex.value);
};

const getElement = (): HTMLElement => {
  return itemRef.value instanceof HTMLButtonElement
    ? itemRef.value
    : itemRef.value?.$el!;
};

onMounted(() => {
  const element = getElement();
  const dropdownMenu: HTMLDivElement = element.closest(
    '[data-ui-type="dropdown-menu"]'
  )!;
  const items: HTMLElement[] = Array.from(
    dropdownMenu.querySelectorAll('[data-ui-type="dropdown-item"]')
  );
  itemIndex.value = items.indexOf(element);
});

watch(isSelected, (isSelected) => {
  if (isSelected) {
    getElement()?.scrollIntoView({ block: 'nearest' });
  }
});
</script>

<template>
  <component
    ref="itemRef"
    :is="href ? NuxtLink : 'button'"
    class="flex items-center w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
    :class="[isSelected ? 'bg-gray-100 text-black' : 'text-gray-500']"
    :role="href ? 'link' : 'button'"
    :href="href"
    data-ui-type="dropdown-item"
    @mouseenter="onMouseEnter"
  >
    <slot />
  </component>
</template>
