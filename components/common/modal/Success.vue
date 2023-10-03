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
  <Modal
    :is-open="isOpen"
    @update:is-open="emit('update:isOpen', $event)"
  >
    <div class="flex flex-col gap-8 items-center pt-0">
      <IllustrationsSuccess class="text-[4px]" />

      <div class="text-xl text-center max-w-xs">
        <slot />
      </div>

      <div class="flex gap-4 justify-center">
        <slot name="buttons">
          <Button type="button" size="sm" @click="close">
            Close
          </Button>
        </slot>
      </div>
    </div>
  </Modal>
</template>
