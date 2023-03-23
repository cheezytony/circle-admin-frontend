<script lang="ts" setup>
import { Form } from 'vue3-form';

interface SubmitButton {
  form?: Form;
  isLoading?: boolean;
}

defineProps<SubmitButton>();
</script>

<template>
  <CommonButton v-bind="$attrs" class="w-full" :is-loading="form?.loading" type="submit">
    <slot />
  </CommonButton>
</template>
