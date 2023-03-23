<script lang="ts" setup>
const emit = defineEmits(['update:modelValue']);
defineProps<{
  type?: string;
  modelValue?: string | number;
}>();

const listeners = {
  change: (event: KeyboardEvent) => {
    emit('update:modelValue', (event.target as HTMLInputElement)?.value);
  },
  input: (event: KeyboardEvent) => {
    emit('update:modelValue', (event.target as HTMLInputElement)?.value);
  },
};
</script>

<template>
  <input
    :type="type"
    v-bind="$attrs"
    :value="modelValue"
    class="input"
    inputmode="numeric"
    v-on="listeners"
  />
</template>
