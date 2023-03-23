<script lang="ts" setup>
import { TabsProvision } from '~~/types/components';

const props = withDefaults(
  defineProps<{
    tab?: string | number;
    orientation?: 'horizontal' | 'vertical';
  }>(),
  { tab: 0, orientation: 'horizontal' }
);

const tab = ref<string | number>(props.tab);

const setTab = (t: string | number) => tab.value = t;

provide<TabsProvision>('tabs', { ...props, tab, setTab });
</script>

<template>
  <div class="mb-8">
    <slot />
  </div>
</template>
