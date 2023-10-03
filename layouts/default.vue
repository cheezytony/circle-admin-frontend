<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAuth } from '~/store/auth';
import { useTheme } from '~~/store/theme';

const { logout } = useAuth();
const { timeToExpiry } = storeToRefs(useAuth());

const { isSidebarCollapsed, isSummaryOpen } = storeToRefs(useTheme());
const slots = useSlots();
const hasSummary = computed(() => !!slots.summary);

const authTimeout = ref<NodeJS.Timeout>();
onMounted(() => {
  if (!timeToExpiry.value) return;
  authTimeout.value = setTimeout(() => logout(), timeToExpiry.value);
});
onBeforeUnmount(() => {
  if (authTimeout.value) clearTimeout(authTimeout.value);
});
</script>

<template>
  <div>
    <AppSidebar />
    <AppHeader :page-has-summary="hasSummary" />
    <div
      class="duration-300 ml-auto pt-20 md:pt-0 md:grid"
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
      <AppSummary v-if="hasSummary">
        <slot name="summary" />
      </AppSummary>
      <main
        class="pb-8 px-4 overflow-x-hidden md:px-8 md:pt-44 @container"
        id="main-content"
      >
        <slot />
      </main>
    </div>
  </div>
</template>
