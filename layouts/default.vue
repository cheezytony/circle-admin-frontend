<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { storeToRefs } from 'pinia';
import { useTheme } from '~~/store/theme';

const { isSidebarCollapsed, isSummaryOpen } = storeToRefs(useTheme());
const slots = useSlots();
const hasSummary = computed(() => !!slots.summary);
</script>

<template>
  <div class="duration-300 md:grid md:h-[100dvh] md:grid-rows-[100%]">
    <LayoutSectionsAppSidebar />
    <LayoutSectionsAppHeader :page-has-summary="hasSummary" />
    <div
      class="duration-300 ml-auto pt-20 md:pt-0 md:grid md:h-[100dvh]"
      :class="[
        isSidebarCollapsed
          ? 'md:w-[calc(100%-80px)] md:max-w-[calc(100%-80px)]'
          : 'md:w-[calc(100%-300px)] md:max-w-[calc(100%-300px)] md:grid-row-[100%]',
        hasSummary
          ? isSummaryOpen
            ? 'md:grid-cols-[300px,1fr]'
            : 'md:grid-cols-[80px,1fr]'
          : 'md:grid-cols-1',
      ]"
    >
      <LayoutSectionsAppSummary v-if="hasSummary">
        <slot name="summary" />
      </LayoutSectionsAppSummary>
      <main class="pb-8 px-4 overflow-x-hidden md:px-8 md:pt-44">
        <slot />
      </main>
    </div>
  </div>
</template>
