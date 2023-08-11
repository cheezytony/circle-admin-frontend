<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { DatatableProvision } from '~~/types/components';
import { sentenceCase, titleCase } from '~~/utils/filters/strings';

const {
  search,
  searchColumns,
  showSearchColumns,
  searchColumnNames,
  setSearchColumn,
  setSearchKey,
  navigate,
} = inject<DatatableProvision>('datatable')!;

const columns = computed(() => {
  return searchColumns.map((col) => {
    const name = typeof col === 'string' ? col : col.name;
    const title = typeof col === 'string' ? titleCase(col) : col.title;
    return {
      name,
      title,
      onClick: () => setSearchColumn(name),
    };
  });
});

const updateInputValue = (event: Event) => {
  setSearchKey((event.target as HTMLInputElement).value);
};
const reset = () => {
  setSearchColumn(searchColumnNames.value[0]);
  setSearchKey('');
  navigate(1);
};
</script>

<template>
  <div class="bg-gray-100 flex flex-grow items-center relative rounded p-2">
    <CommonDropdown v-if="showSearchColumns" class="flex-shrink-0" :items="columns">
      <template #default="{ isOpen }">
        <button
          type="button"
          class="duration-300 flex gap-4 items-center min-w-[100px] pl-4 pr-4 py-3 ring-1 ring-gray-200 rounded hover:bg-gray-50 active:scale-90"
        >
          <span class="inline-flex text-lg text-gray-500">
            <FontAwesomeIcon icon="filter" />
          </span>
          <span class="text-sm">
            {{ titleCase(search.column || 'All') }}
          </span>
          <span class="inline-flex text-sm text-gray-500 ml-auto">
            <FontAwesomeIcon :icon="isOpen ? 'caret-up' : 'caret-down'" />
          </span>
        </button>
      </template>
      
    </CommonDropdown>
    <div class="relative w-full">
      <!-- <span class="absolute left-5 text-gray-400 top-1/2 -translate-y-1/2">
        <FontAwesomeIcon icon="search" />
      </span> -->
      <input
        type="text"
        class="bg-transparent pl-4 pr-12 py-3 text-sm focus:outline-none w-full"
        :placeholder="`Search ${sentenceCase(search.column || 'All')}`"
        :value="search.key"
        @input="updateInputValue"
        @keyup.enter="navigate(1)"
      />
      <button
        v-if="search.key?.length"
        class="absolute appearance-none bg-gray-100 grid h-6 place-items-center right-5 top-1/2 rounded-full -translate-y-1/2 w-6 z-20 hover:bg-gray-300"
        @click="reset"
      >
        <FontAwesomeIcon icon="close" />
      </button>
    </div>
  </div>
</template>
