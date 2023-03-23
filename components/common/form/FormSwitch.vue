<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();
const props = defineProps<{
  id?: string;
  modelValue?: boolean;
}>();

const isChecked = ref<boolean>(false);
const onChange = (event: Event) => {
  emit(
    'update:modelValue',
    (isChecked.value = (event.target as HTMLInputElement)?.checked)
  );
};

watch(
  () => props.modelValue,
  (value) => (isChecked.value = value || false)
);
</script>

<template>
  <div class="mb-4 select-none inline-flex gap-3 items-center group relative">
    <i
      class="border duration-300 flex-shrink-0 inline-flex h-5 items-center justify-center relative rounded-full w-12 group-active:scale-50"
      :class="[
        isChecked
          ? 'border-blue-500 bg-blue-500'
          : 'bg-gray-50 border-gray-300 text-gray-100 group-hover:bg-blue-50 group-hover:border-blue-300',
      ]"
    >
      <span
        class="absolute bg-white border duration-300 h-7 left-0 rounded-full top-1/2 -translate-y-1/2 w-7"
        :class="[isChecked ? 'border-blue-500 translate-x-5' : '-translate-x-px group-hover:border-blue-300']"
      />
    </i>
    <span class="text-sm text-gray-500 group-hover:text-gray-700">
      <slot />
    </span>
    <input
      :id="id"
      type="checkbox"
      class="absolute cursor-pointer h-full inset-0 opacity-0 w-full"
      :checked="isChecked"
      v-bind="$attrs"
      @change="onChange"
    />
  </div>
</template>
