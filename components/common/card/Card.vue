<script lang="ts" setup>
defineProps<{
  removePadding?: boolean;
}>();
</script>

<template>
  <div
    class="border border-gray-100 rounded-lg"
    :class="{
      'p-4 md:p-8': !removePadding,
    }"
  >
    <div class="flex flex-col gap-8 h-full">
      <slot />
    </div>
  </div>
</template>
