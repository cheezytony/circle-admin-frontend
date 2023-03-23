<script lang="ts" setup>
import { NuxtLinkProps } from '#app';
import { computed, inject } from 'vue';
import { NuxtLink } from '#components';
import { DropdownProvision } from '../../../types/components';

const props = defineProps<{
  href?: string;
  isSelected?: boolean;
  index?: number;
  to?: NuxtLinkProps['to'];
}>();

const { isOpen, index, uiID, close } = inject<DropdownProvision>('dropdown')!;

const isSelected = computed(() => props.isSelected);
</script>

<template>
  <component
    :is="props.to ? NuxtLink : 'button'"
    class="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
    :class="[
      isSelected ? 'bg-gray-100 text-black' : 'text-gray-500',
    ]"
    :to="to"
    data-ui-type="dropdown:item"
    :data-ui-id="uiID"
    role="button"
    @click.stop="close"
  >
    <slot :isOpen="isOpen" />
  </component>
</template>
