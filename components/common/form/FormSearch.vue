<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { sentenceCase, titleCase } from '~~/utils/filters/strings';

const emit = defineEmits<{
  (e: 'cancel'): void;
  (e: 'submit'): void;
  (e: 'update:modelValue', value: string): void;
  (e: 'update:column', value: string): void;
}>();
const props = withDefaults(
  defineProps<{
    column?: string;
    columns?: string[];
    searchDropdown?: boolean;
    modelValue?: string;
  }>(),
  {
    searchDropdown: true,
  }
);

const column = ref(props.column);
const inputValue = ref(props.modelValue);

const setColumn = (value: string) => {
  emit('update:column', (column.value = value));
};
const updateInputValue = (event: Event) => {
  emit(
    'update:modelValue',
    (inputValue.value = (event.target as HTMLInputElement).value)
  );
};
const reset = () => {
  emit('update:modelValue', (inputValue.value = ''));
  emit('update:column', (column.value = ''));
  nextTick().then(() => emit('cancel'));
};

watch(
  () => props.modelValue,
  (modelValue) => (inputValue.value = modelValue)
);
</script>

<template>
  <div class="bg-gray-100 flex flex-grow items-center relative rounded">
    <CommonDropdown v-if="searchDropdown" class="flex-shrink-0">
      <CommonDropdownButton
        class="duration-300 flex gap-4 items-center min-w-[150px] pl-4 pr-4 py-4 rounded hover:bg-gray-50 active:scale-90"
      >
        <template #default="{ isOpen }">
          <span class="inline-flex text-lg text-gray-500">
            <FontAwesomeIcon icon="filter" />
          </span>
          <span class="text-sm">
            {{ titleCase(column || 'All') }}
          </span>
          <span class="inline-flex text-sm text-gray-500 ml-auto">
            <FontAwesomeIcon :icon="isOpen ? 'caret-up' : 'caret-down'" />
          </span>
        </template>
      </CommonDropdownButton>
      <CommonDropdownMenu class="max-w-[200px]">
        <template :key="index" v-for="(col, index) in columns">
          <CommonDropdownItem @click="setColumn(col)">
            {{ titleCase(col) }}
          </CommonDropdownItem>
        </template>
      </CommonDropdownMenu>
    </CommonDropdown>
    <div class="relative w-full">
      <!-- <span class="absolute left-5 text-gray-400 top-1/2 -translate-y-1/2">
        <FontAwesomeIcon icon="search" />
      </span> -->
      <input
        type="text"
        class="bg-transparent pl-4 pr-12 py-4 text-sm focus:outline-none w-full"
        :placeholder="`Search ${sentenceCase(column || '')}`"
        :value="inputValue"
        @input="updateInputValue"
        @keyup.enter="$emit('submit')"
      />
      <button
        v-if="inputValue?.length"
        class="absolute appearance-none bg-gray-100 grid h-6 place-items-center right-5 top-1/2 rounded-full -translate-y-1/2 w-6 z-20 hover:bg-gray-300"
        @click="reset"
      >
        <FontAwesomeIcon icon="close" />
      </button>
    </div>
  </div>
</template>
