<script lang="ts" setup>
import { useTheme } from '~~/store/theme';
import { storeToRefs } from 'pinia';

const { sidebarWidth } = storeToRefs(useTheme());
</script>

<template>
  <div class="bg-gray-200 flex min-h-[100vh]">
    <LayoutSectionsAppSidebar />
    <div class="flex overflow-hidden relative w-full">
      <LayoutSectionsAppSummary v-if="$slots.summary">
        <slot name="summary" />
      </LayoutSectionsAppSummary>
      <div class="flex flex-col bg-white w-full">
        <LayoutSectionsAppHeader />
        <main class="flex-grow max-w-[1600px] px-5 pb-16 pt-32 md:pt-0 md:px-10">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
