<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { v4 } from 'uuid';

type FixedFilter = {
  type: 'fixed';
  name: string;
  title: string;
};

type CustomFilter = {
  type: 'custom';
  name: string;
  title: string;
  propterty?: string;
  operator?: string;
  value?: string;
};

type Filter = FixedFilter | CustomFilter;

type FilterItem = {
  id: string;
  filter?: Filter;
};

type Operator = {
  title: string;
  name: string;
  value: string;
};

const filters: Array<Filter> = [
  {
    type: 'custom',
    name: 'id',
    title: 'ID',
  },
  {
    type: 'custom',
    name: 'first_name',
    title: 'First Name',
  },
  {
    type: 'custom',
    name: 'last_name',
    title: 'Last Name',
  },
  {
    type: 'custom',
    name: 'email',
    title: 'Email',
  },
  {
    type: 'custom',
    name: 'phone',
    title: 'Phone',
  },
  {
    type: 'fixed',
    name: 'is_approved',
    title: 'Approved',
  },
];
const operators: Array<{ title: string; name: string; value: string }> = [
  { value: '=', name: 'equals', title: 'Equals' },
  { value: '+', name: 'contains', title: 'Contains' },
  { value: '-', name: 'not_containing', title: 'Not containing' },
  { value: '>', name: 'greater_than', title: 'Greater than' },
  { value: '<', name: 'less_than', title: 'Less than' },
  {
    value: '>=',
    name: 'greater_than_or_equal_to',
    title: 'Greater than or equal to',
  },
  {
    value: '<=',
    name: 'less_than_or_equal_to',
    title: 'Less than or equal to',
  },
  { value: '[]', name: 'in', title: 'In' },
  { value: '![]', name: 'not in', title: 'Not in' },
];
const filterItems = ref<Array<FilterItem>>([
  {
    id: v4(),
    filter: {
      type: 'custom',
      name: 'id',
      title: 'id',
      propterty: 'id',
      operator: '=',
      value: '',
    },
  },
]);

const query = computed(() => {
  const query = filterItems.value
    .filter((item) => item.filter)
    .map((item) => {
      if (!item.filter) return '';

      const filter = item.filter;
      let name = filter.name;

      const operator = (filter as CustomFilter).operator ?? '';
      if (operator) {
        name = `${name}:${operator}`;
      }
      if (filter.type === 'custom') {
        name = `${name}[]`;
      }
      const value = (filter.type === 'fixed' ? 'true' : filter.value) ?? '';
      return `${name}=${value}`;
    })
    .join('&');
  return query ? `?${query}` : '';
});

const addFilterItem = () => {
  filterItems.value.push({
    id: v4(),
  });
};
const removeFilterItem = (index: number) => {
  filterItems.value.splice(index, 1);
};
const selectFilter = (index: number, { name, title, type }: Filter) => {
  filterItems.value = filterItems.value.map((item, i) => {
    if (index === i && item.filter?.name !== name) {
      item.filter = { name, title, type };
    }
    return item;
  });
};
const selectOperator = (index: number, operator: Operator) => {
  filterItems.value = filterItems.value.map((item, i) => {
    if (
      index === i &&
      item.filter?.type === 'custom' &&
      item.filter.operator !== operator.name
    ) {
      item.filter.operator = operator.name;
      item.filter.value = '';
    }
    return item;
  });
};
const updateValue = (index: number, value: string) => {
  filterItems.value = filterItems.value.map((item, i) => {
    if (index === i && item.filter?.type === 'custom') {
      item.filter.value = value;
    }
    return item;
  });
};

watch(filterItems.value, (value) => {
  console.log(value);
});
</script>

<template>
  <div class="bg-gray-100 flex flex-wrap gap-4 items-center p-2">
    <template v-for="(filterItem, index) in filterItems" :key="filterItem.id">
      <div class="flex">
        <CommonDropdown :items="filters">
          <button class="bg-white px-3 py-1 text-sm" type="button">
            <span v-if="filterItem.filter">
              {{ filterItem.filter.title }}
            </span>
            <span v-else>select filter</span>
          </button>
          <template #item="{ item: filter, isSelected }">
            <button
              class="block px-4 py-2 text-sm w-full text-left whitespace-nowrap hover:bg-gray-100"
              :class="{ 'bg-gray-100': isSelected }"
              type="button"
              @click="selectFilter(index, filter as Filter)"
            >
              {{ filter.title }}
            </button>
          </template>
        </CommonDropdown>
        <template v-if="filterItem.filter?.type === 'custom'">
          <div class="border-l border-gray-200" />
          <CommonDropdown :items="operators">
            <button class="bg-white px-3 py-1 text-sm" type="button">
              {{ filterItem.filter.operator || 'select operator' }}
            </button>
            <template #item="{ item: operator, isSelected }">
              <button
                class="block px-4 py-2 text-sm w-full text-left whitespace-nowrap hover:bg-gray-100"
                :class="{ 'bg-gray-100': isSelected }"
                type="button"
                @click="selectOperator(index, operator as Operator)"
              >
                {{ operator.title }}
              </button>
            </template>
          </CommonDropdown>

          <input
            v-if="filterItem.filter.operator"
            type="text"
            class="border border-gray-200 px-2 py-1 max-w-[6rem] text-sm"
            :placeholder="`${filterItem.filter.name} ${filterItem.filter.operator} ?`"
            :value="filterItem.filter.value"
            @input="
              updateValue(index, ($event.target as HTMLInputElement)?.value)
            "
          />
        </template>
        <CommonButton
          color-scheme="gray:soft"
          size="sm"
          @click="removeFilterItem(index)"
        >
          <FontAwesomeIcon icon="minus" />
        </CommonButton>
      </div>
    </template>
    <CommonButton color-scheme="gray:soft" size="sm" @click="addFilterItem">
      <FontAwesomeIcon icon="plus" />
    </CommonButton>
  </div>
</template>
