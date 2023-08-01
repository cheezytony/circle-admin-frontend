<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { storeToRefs } from 'pinia';
import { useTheme } from '~~/store/theme';

const { isSummaryOpen, isSmallScreen } = storeToRefs(useTheme());
const { openSummary, toggleSummary } = useTheme();
const slots = useSlots();
const hasSummary = computed(() => !!slots.summary);
const handleClick = () => {
  openSummary();
};
</script>

<template>
  <div>
    <div
      class="bg-gray-100 border-y flex gap-2 h-10 items-center mb-8 px-4 md:hidden"
      @click="toggleSummary"
    >
      <span class="w-5">
        <FontAwesomeIcon :icon="isSummaryOpen ? 'xmark' : 'bars'" />
      </span>
      <div class="font-medium text-sm">
        {{ isSummaryOpen ? 'Hide' : 'View' }} Summary
      </div>
    </div>
    <div
      class="bg-gray-100 duration-300 fixed inset-0 overflow-y-auto px-4 pb-8 top-[120px] md:h-[100dvh] md:sticky md:top-0 md:pt-8 md:px-8"
      :class="[
        isSummaryOpen
          ? 'z-[1080]'
          : '-translate-x-full md:cursor-pointer md:translate-x-0',
        isSummaryOpen && isSmallScreen && 'dialog-open'
      ]"
      @click="handleClick"
    >
      <TransitionGroup
        enter-active-class="duration-150"
        enter-to-class="delay-150"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0 300"
      >
        <div v-if="isSummaryOpen">
          <slot />
        </div>
        <div
          v-if="!isSummaryOpen"
          class="flex flex-col-reverse h-full items-center justify-center"
        >
          <template
            :key="letter"
            v-for="letter in [...'Click-to-view-summary']"
          >
            <div
              class="font-medium opacity-75 -rotate-90 text-sm uppercase"
              v-html="letter === '-' ? '&nbsp;' : letter"
            />
          </template>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>
