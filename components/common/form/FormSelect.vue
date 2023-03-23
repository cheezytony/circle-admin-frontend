<script lang="ts" setup>
const emit = defineEmits(['update:modelValue']);
defineProps<{
  modelValue?: number | string;
  options?: Array<{
    value?: string;
    name?: string;
    option?: string;
    title?: string;
  }>;
  type?: string;
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
  <select v-bind="$attrs" class="input" :value="modelValue" v-on="listeners">
    <template :key="n" v-for="(option, n) in options">
      <option :value="option.value">
        {{ option.name || option.title }}
      </option>
    </template>
  </select>
</template>
