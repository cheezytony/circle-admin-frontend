<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useCountries, Country } from '~~/store/countries';

const emit = defineEmits(['update:modelValue']);
defineProps<{
  type?: string;
  modelValue?: string | number;
}>();

const value = ref<string>('');
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

const listeners = {
  change: (event: KeyboardEvent) => {
    const { value } = event.target as HTMLInputElement;
    emit('update:modelValue', selectedCountry.value.dialCode + value);
  },
  input: (event: KeyboardEvent) => {
    const { value } = event.target as HTMLInputElement;
    emit('update:modelValue', selectedCountry.value.dialCode + value);
  },
};

const onKeyPress = (event: KeyboardEvent) => {
  if (event.key.length === 1 && isNaN(Number(event.key)))
    event.preventDefault();
};
</script>

<template>
  <div class="flex gap-2">
    <CommonDropdown>
      <CommonDropdownButton
        class="border flex font-medium gap-2 h-full items-center px-4 rounded"
      >
        <span>{{ selectedCountry.flag.emoji }}</span>
        <span>
          <FontAwesomeIcon icon="chevron-down" />
        </span>
      </CommonDropdownButton>
      <CommonDropdownMenu>
        <div
          class="border flex items-center mb-4 pl-4 overflow-hidden rounded focus-within:border-blue-500"
        >
          <span class="text-sm">
            <FontAwesomeIcon icon="search" />
          </span>
          <input
            v-model="search"
            class="px-3 py-2 text-sm w-full focus:outline-none"
            placeholder="Search country"
            @click.stop
          />
        </div>
        <div class="max-h-[250px] overflow-auto">
          <template
            :key="country.countryCode"
            v-for="country in filteredCountries"
          >
            <CommonDropdownItem
              class="flex gap-4 items-center"
              @click="selectCountry(country)"
            >
              <span>{{ country.flag.emoji }}</span>
              <span class="font-medium text-left">
                {{ country.name }}
              </span>
              <span class="ml-auto text-gray-500 text-left text-xs">
                {{ country.dialCode }}
              </span>
            </CommonDropdownItem>
          </template>
        </div>
      </CommonDropdownMenu>
    </CommonDropdown>
    <label
      class="bg-transparent flex h-full input items-center focus:outline-none"
    >
      <span class="font-medium text-xs whitespace-nowrap">
        {{ selectedCountry.dialCode }}
      </span>
      <input
        v-model="value"
        v-on="listeners"
        type="text"
        inputmode="numeric"
        class="bg-transparent h-full w-full focus:outline-none"
        @keypress="onKeyPress"
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
}
</style>
