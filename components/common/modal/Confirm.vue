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
  <CommonModal
    :close-on-outside-click="!isLoading"
    :is-open="isOpen"
    @update:is-open="emit('update:isOpen', $event)"
  >
    <div class="flex flex-col gap-14 items-center pt-12">
      <IllustrationsQuestion class="text-[4.5px]" />
      
      <div class="text-2xl text-center">
        <slot />
      </div>

      <div class="flex gap-4 justify-center">
        <CommonButton
          color-scheme="red:soft"
          :disabled="isLoading"
          type="button"
          @click="close"
        >
          Cancel
        </CommonButton>
        <CommonButton :is-loading="isLoading" @click="submit">
          Proceed
        </CommonButton>
      </div>
    </div>
  </CommonModal>
</template>
