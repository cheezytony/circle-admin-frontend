<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'update:isOpen', isOpen: boolean): void;
  (e: 'submit'): void;
}>();
defineProps<{
  isOpen?: boolean | string | number;
  isLoading?: boolean;
}>();
const close = () => emit('update:isOpen', false);
const submit = () => emit('submit');
</script>

<template>
  <Modal
    :close-on-outside-click="!isLoading"
    :is-open="isOpen"
    @update:is-open="emit('update:isOpen', $event)"
  >
    <div class="flex flex-col gap-8 items-center pt-0">
      <IllustrationsQuestion class="text-[4px]" />

      <div class="text-lg text-center max-w-xs">
        <slot />
      </div>

      <div class="flex gap-4 justify-center">
        <Button
          color-scheme="purple:soft"
          :disabled="isLoading"
          type="button"
          size="sm"
          @click="close"
        >
          Cancel
        </Button>
        <Button :is-loading="isLoading" size="sm" @click="submit">
          Proceed
        </Button>
      </div>
    </div>
  </Modal>
</template>
