<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

type SelectOption =
  | {
      value?: string;
      name?: string;
      option?: string;
      title?: string;
    }
  | string
  | number;

const emit = defineEmits(['update:modelValue']);
const props = withDefaults(
  defineProps<{
    modelValue?: number | string;
    searchable?: boolean;
    options?: Array<SelectOption>;
    type?: string;
    size?: 'sm' | 'md';
  }>(),
  {
    size: 'md',
  }
);

const listeners = {
  change: (event: InputEvent) => {
    emit('update:modelValue', (event.target as HTMLInputElement)?.value);
  },
};

const setValue = (option: SelectOption) => {
  const value = typeof option === 'object' ? option.value : option;
  emit('update:modelValue', value);
};
</script>

<template>
  <Dropdown>
    <template #default="{ isOpen }">
      <div class="inline relative">
        <input
          type="text"
          class="cursor-pointer input relative"
          :class="[`input-${size}`]"
          readonly
          :value="modelValue"
        />
        <span class="absolute right-2 top-1/2 -translate-y-1/2">
          <FontAwesomeIcon :icon="isOpen ? 'chevron-up' : 'chevron-down'" />
        </span>
      </div>
    </template>
    <template #items>
      <template :key="n" v-for="(option, n) in options">
        <DropdownItem @click="setValue(option)">
          <template v-if="typeof option === 'object'">
            {{ option.name || option.title }}
          </template>
          <template v-else>
            {{ option }}
          </template>
        </DropdownItem>
      </template>
    </template>
  </Dropdown>
  <!-- <select v-bind="$attrs" class="input" :value="modelValue" v-on="listeners">
    <template :key="n" v-for="(option, n) in options">
      <option :value="typeof option === 'object' ? option.value : option">
        <template v-if="typeof option === 'object'">
          {{ option.name || option.title }}
        </template>
        <template v-else>
          {{ option }}
        </template>
      </option>
    </template>
  </select> -->
</template>
