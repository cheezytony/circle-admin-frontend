<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useCountries, Country } from '~~/store/countries';

const emit = defineEmits(['update:modelValue']);
const props = withDefaults(
  defineProps<{
    type?: string;
    modelValue?: string | number;
    id: string;
  }>(),
  {
    type: 'text',
    modelValue: '',
  }
);

const inputRef = ref<HTMLInputElement>();

const splitValue = (value: string) => {
  const country = countries.find(({ dialCode }) => {
    return value.startsWith(dialCode);
  });
  if (!country) return;

  selectedCountry.value = country;
  value = value.replace(country.dialCode, '');

  return { country, value };
};

const inputValue = ref<string>('');
const { countries } = useCountries();
const search = ref<string>('');
const filteredCountries = computed(() => {
  if (!search.value) return countries;

  return countries.filter(({ name }) => {
    return name.match(new RegExp(search.value, 'i'));
  });
});
const selectedCountry = ref<Country>(countries[0]);
const selectCountry = (country: Country) => {
  selectedCountry.value = country;
  search.value = '';
};

const valueInputListeners = {
  change: (event: KeyboardEvent) => {
    const { value } = event.target as HTMLInputElement;
    emit('update:modelValue', selectedCountry.value.dialCode + value);
  },
  input: (event: KeyboardEvent) => {
    const { value } = event.target as HTMLInputElement;
    emit('update:modelValue', selectedCountry.value.dialCode + value);
  },
  keypress: (event: KeyboardEvent) => {
    if (
      (event.key.length === 1 && isNaN(Number(event.key))) ||
      event.key === ' '
    ) {
      event.preventDefault();
    }
  },
};
const onDropdownOpen = () => {
  setTimeout(() => {
    inputRef.value?.focus();
  }, 100);
};

const updateInputValue = (value: string) => {
  // Remove the starting zero
  value = value.replace(/^0/, '');
  const split = splitValue(value);
  if (!split) {
    // Default to Nigeria as country.
    selectedCountry.value = countries[0];
    inputValue.value = value;
    return;
  }
  selectedCountry.value = split.country;
  inputValue.value = split.value;
};

onMounted(() => {
  updateInputValue(props.modelValue as string);
});
watch(
  () => props.modelValue,
  (value) => {
    updateInputValue(value as string);
  }
);
</script>

<template>
  <div class="flex gap-2">
    <Dropdown @open="onDropdownOpen">
      <button
        type="button"
        class="border flex font-medium gap-2 h-full items-center px-4 rounded"
      >
        <span>{{ selectedCountry.flag.emoji }}</span>
        <span class="text-sm">
          <FontAwesomeIcon icon="chevron-down" />
        </span>
      </button>
      <template #items="{ handleInputKeydown }">
        <div class="max-w-full w-[300px]">
          <div class="px-4 py-4">
            <div
              class="border flex items-center pl-4 overflow-hidden rounded focus-within:border-blue-500"
            >
              <span class="text-sm">
                <FontAwesomeIcon icon="search" />
              </span>
              <input
                ref="inputRef"
                v-model="search"
                class="px-3 py-2 text-sm w-full focus:outline-none"
                placeholder="Search country"
                @keydown="handleInputKeydown"
                @click.stop
              />
            </div>
          </div>
          <div class="max-h-[250px] overflow-y-auto overflow-x-clip">
            <template
              :key="country.countryCode"
              v-for="country in filteredCountries"
            >
              <DropdownItem @click="selectCountry(country)">
                <div class="flex gap-4">
                  <span>{{ country.flag.emoji }}</span>
                  <span class="font-medium text-left">
                    {{ country.name }}
                  </span>
                  <span class="ml-auto text-gray-500 text-left text-xs">
                    {{ country.dialCode }}
                  </span>
                </div>
              </DropdownItem>
            </template>
          </div>
        </div>
      </template>
    </Dropdown>
    <label
      class="bg-transparent flex h-full input items-center focus:outline-none"
    >
      <span class="font-medium opacity-50 text-xs whitespace-nowrap">
        {{ selectedCountry.dialCode }}
      </span>
      <input
        :value="inputValue"
        :id="id"
        type="text"
        inputmode="numeric"
        class="bg-transparent h-full w-full focus:outline-none"
        v-on="valueInputListeners"
      />
    </label>
  </div>
</template>

<style scoped>
.input {
  display: flex;
  padding: 0;
  padding-left: var(--tw-input-padding-x);
}
.input input {
  --tw-input-padding-y: 1rem;
  height: var(--tw-input-height);
  font: inherit;
  padding: var(--tw-input-padding-y) var(--tw-input-padding-x);
  padding-left: calc(var(--tw-input-padding-x)/5);
}
</style>
