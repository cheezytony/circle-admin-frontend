<script lang="ts" setup>
import { TabLink, TabsProvision } from '@/types/components';
import { NuxtLink } from '#components';

defineProps<{
  tabs?: Array<TabLink>;
}>();

const route = useRoute();
const { orientation, tab, setTab } = inject<TabsProvision>('tabs')!;
const isActive = (t: TabLink, index: number) => {
  if (typeof t === 'object' && t.href) {
    return t.exact
      ? t.href === route.path
      : !!route.path.match(new RegExp(t.href));
  }
  if (typeof tab.value === 'number') return index === tab.value;
  if (typeof t === 'string') return t === tab.value;
  return t.name === tab.value;
};
const getLink = (t: TabLink) => {
  return (typeof t === 'object' && t.href) || undefined;
};
</script>

<template>
  <div class="overflow-auto">
    <div
      class="flex mb-4"
      :class="[orientation === 'vertical' ? 'flex-col gap-4' : 'gap-8']"
    >
      <template :key="tabIndex" v-for="(tab, tabIndex) in tabs">
        <component
          :is="getLink(tab) ? NuxtLink : 'button'"
          :role="getLink(tab) ? 'link' : 'button'"
          :href="getLink(tab)"
          class="cursor-pointer duration-300 relative text-sm"
          :class="[isActive(tab, tabIndex) ? 'font-medium' : 'text-gray-500']"
          @click="
            setTab((typeof tab === 'string' ? tab : tab.name) || tabIndex)
          "
        >
          <span
            v-if="isActive(tab, tabIndex) && orientation === 'vertical'"
            class="absolute bg-black"
          />
          <span
            v-if="orientation === 'horizontal'"
            class="absolute bg-black duration-300 h-1 left-1/2 top-full -translate-x-1/2 translate-y-2 w-8"
            :class="[
              !isActive(tab, tabIndex) && 'opacity-0 invisible translate-y-4',
            ]"
          />
          <template v-if="typeof tab === 'string'">{{ tab }}</template>
          <template v-else>{{ tab.title }}</template>
        </component>
      </template>
    </div>
  </div>
</template>
