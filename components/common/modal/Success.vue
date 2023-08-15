<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'update:isOpen', isOpen: boolean): void;
}>();
defineProps<{
  isOpen?: boolean | string | number;
  isLoading?: boolean;
}>();
const close = () => emit('update:isOpen', false);
</script>

<template>
  <CommonModal
    :is-open="isOpen"
    @update:is-open="emit('update:isOpen', $event)"
  >
    <div class="flex flex-col gap-14 items-center pt-12">
      <IllustrationsSuccess class="text-[4.5px]" />

      <div class="text-2xl text-center">
        <slot />
      </div>

      <div class="flex gap-4 justify-center">
        <slot name="buttons">
          <CommonButton type="button" @click="close">Close</CommonButton>
        </slot>
      </div>
    </div>
  </CommonModal>
</template>
