<script lang="ts" setup>
import { DatatableProvision, DataTableSearch } from '~~/types/components';
import { useApiRequest } from '~~/utils/hooks/api';
import {
  DatatableSearchColumn,
  DatatableFilter,
  DatatableMeta,
  DatatableSort,
} from '~~/types/components';

defineExpose();
const emit = defineEmits<{
  (e: 'update:activeFilters', value: string[]): void;
  (e: 'update:searchColumn', value: DatatableSearchColumn): void;
  (e: 'update:searchKey', value: string): void;
  (e: 'update:selection', value: any[]): void;
}>();
const props = withDefaults(
  defineProps<{
    activeFilters?: string[];
    baseURL?: string;
    data?: any[];
    filterable?: boolean;
    filters?: Array<DatatableFilter>;
    limit?: number;
    orderBy?: string;
    orderByAscending?: boolean;
    page?: number;
    paginatable?: boolean;
    searchable?: boolean;
    searchColumn?: string;
    searchColumns?: Array<DatatableSearchColumn>;
    searchKey?: string;
    selectable?: boolean;
    showSearchColumns?: boolean;
    uniqueKey?: string;
    url?: string;
  }>(),
  {
    activeFilters: () => [],
    data: () => [],
    filterable: true,
    filters: () => [],
    limit: 10,
    orderByAscending: true,
    page: 1,
    paginatable: true,
    searchable: true,
    searchColumns: () => [],
    searchKey: '',
    selectable: false,
    showSearchColumns: true,
  }
);

const router = useRouter();
const route = useRoute();
const mode = computed(() => (props.url ? 'server' : 'local'));

// ========================================================================================================================
// Pagination
// ========================================================================================================================
const meta = reactive<DatatableMeta>({
  count: 0,
  limit: props.limit,
  page: props.page,
  pages: 0,
  total: 0,
});
const start = computed<number>(() => meta.limit * (meta.page - 1));
const end = computed<number>(() => meta.limit * meta.page);
const paginationLinks = computed(() => {
  if (meta.pages <= 1) return [];

  let pagination: {
    isActive?: boolean;
    isDisabled?: boolean;
    title: string | number;
    action?: () => void;
  }[] = [
    {
      isDisabled: meta.page === 1,
      title: '&LT;&LT;',
      action: () => navigate(1),
    },
    { isDisabled: meta.page === 1, title: '&LT;', action: prev },
  ];

  pagination = [
    ...pagination,
    ...Array(meta.pages)
      .fill(0)
      .map((a, i) => i + 1)
      .filter(
        (a) => a === meta.page || a - meta.page === 1 || meta.page - a === 1
      )
      .map((a) => ({
        title: a,
        isActive: a === meta.page,
        action: () => navigate(a),
      })),
  ];

  return [
    ...pagination,
    { isDisabled: meta.page === meta.pages, title: '&GT;', action: next },
    {
      isDisabled: meta.page === meta.pages,
      title: '&GT;&GT;',
      action: () => navigate(meta.pages),
    },
  ];
});
const paginatedData = computed(() => {
  const items =
    mode.value === 'server'
      ? serverPaginatedItems.value
      : locallyPaginatedItems.value;

  return items.map((row, index) => ({
    row,
    index,
    isSelected: getSelectionIndex(row) > -1,
  }));
});
const next = () => {
  if (meta.page >= meta.pages) return;
  meta.page++;
  if (mode.value === 'server') loadFromServer();
};
const prev = () => {
  if (meta.page <= 0) return;
  meta.page--;
  if (mode.value === 'server') loadFromServer();
};
const navigate = (page: number) => {
  if (page > meta.pages || page < 0) return;
  meta.page = page;
  if (mode.value === 'server') loadFromServer();
};
watch([() => props.limit, () => props.page], ([limit, page]) => {
  meta.limit = limit;
  meta.page = page;
  if (mode.value === 'server') loadFromServer();
});
// ========================================================================================================================

// ========================================================================================================================
// Sorting.
// ========================================================================================================================

const sort = reactive<DatatableSort>({
  column: props.orderBy,
  orderByAscending: props.orderByAscending,
});
const setSorting = (column: string) => {
  (() => {
    if (column === sort.column) {
      if (!sort.orderByAscending) {
        return (sort.column = undefined);
      }
      return (sort.orderByAscending = !sort.orderByAscending);
    }

    sort.column = column;
  })();

  if (mode.value === 'server') navigate(1);
};
watch(
  [() => props.orderBy, () => props.orderByAscending],
  ([orderBy, orderByAscending]) => {
    sort.column = orderBy;
    sort.orderByAscending = orderByAscending;
    if (mode.value === 'server') navigate(1);
  }
);
// ========================================================================================================================

// ========================================================================================================================
// Searching
// ========================================================================================================================

const searchColumnNames = computed(() => {
  return props.searchColumns.map((column) => {
    return typeof column === 'string' ? column : column.name;
  });
});
const search = reactive<DataTableSearch>({
  key: props.searchKey,
  column: props.searchColumn || searchColumnNames.value[0],
});
const searchExpression = computed(() => new RegExp(search.key, 'i'));
const setSearchKey = (key: string) => {
  emit('update:searchKey', (search.key = key));
};
const setSearchColumn = (column: string) => {
  emit('update:searchColumn', (search.column = column));
};
watch(
  [() => props.searchKey, () => props.searchColumn],
  ([searchKey, searchColumn]) => {
    search.key = searchKey;
    search.column = searchColumn;
  }
);
// ========================================================================================================================

// ========================================================================================================================
// Filtering
// ========================================================================================================================

const activeFilters = computed(() => {
  return props.filters.filter(({ name }) => props.activeFilters.includes(name));
});
const isFilterApplied = (filterName: string) => {
  return props.activeFilters.includes(filterName);
};
const toggleFilter = (filterName: string) => {
  let activeFilters = [...props.activeFilters];
  ((index: number) => {
    index > -1
      ? activeFilters.splice(index, 1)
      : activeFilters.push(filterName);
  })(activeFilters.indexOf(filterName));

  emit('update:activeFilters', activeFilters);
};
// ========================================================================================================================

// ========================================================================================================================
//
// ========================================================================================================================
const selection = ref<any[]>([]);
// const isAllSelected = computed(() => {
//   // return selection.value.every();
// });
const getSelectionIndex = (item: any) => {
  return selection.value.findIndex((selectedItem) => {
    if (props.uniqueKey) {
      const uniqueKey = props.uniqueKey;
      return selectedItem[uniqueKey] === item[uniqueKey];
    }

    return selectedItem === item;
  });
};
const selectAll = (state: boolean) =>
  mode.value === 'server'
    ? selectAllFromServer(state)
    : selectAllFromLocal(state);
const toggleSelection = (item: any) => {
  const index = getSelectionIndex(item);
  index > -1 ? selection.value.splice(index, 1) : selection.value.push(item);

  emit('update:selection', selection.value);
};
const clearSelection = () => emit('update:selection', (selection.value = []));
// ========================================================================================================================

// ========================================================================================================================
// Local Data Control
// ========================================================================================================================
const localItems = ref<any[]>(props.data);
const localSearch = (items: any[]) => {
  if (!search.key || !props.searchColumns.length) return items;
  return items.filter((item) => {
    // Search with one column.
    if (search.column) {
      return searchExpression.value.test(item[search.column]);
    }
    // Search will all searchColumns. Only allowed with local search.
    return props.searchColumns.some((column) => {
      const key = typeof column === 'string' ? column : column.name;
      return searchExpression.value.test(item[key]);
    });
  });
};
const localFilter = (items: any[]) => {
  if (!activeFilters.value.length) return items;
  return items.filter((item) => {
    return activeFilters.value.every((filter) => {
      return filter.action ? filter.action(item) : true;
    });
  });
};
const localSort = (items: any[]) => {
  if (!sort.column) return items;
  const column = sort.column;
  return [...items].sort((itemA, itemB) => {
    const columnA = itemA[column];
    const columnB = itemB[column];
    return 1;
  });
};
const locallyModifiedItems = computed(() => {
  return localSort(localFilter(localSearch([...localItems.value])));
});
const locallyPaginatedItems = computed(() => {
  return locallyModifiedItems.value.splice(start.value, end.value);
});
const selectAllFromLocal = (state: boolean) => {
  return emit(
    'update:selection',
    (selection.value = state ? [...localItems.value] : [])
  );
};
watch(
  () => props.data,
  (data) => {
    localItems.value = data;
    meta.total = data.length;
  }
);
// ========================================================================================================================

// ========================================================================================================================
// Server Data Control
// ========================================================================================================================
const controller = ref(new AbortController());
const serverItems = ref<any[]>([]);
const serverPaginatedItems = computed(() => serverItems.value);
const selectAllFromServer = (state: boolean) => {
  return emit(
    'update:selection',
    (selection.value = state ? [...serverItems.value] : [])
  );
};
const serverQuery = computed(() => {
  return {
    search_value: search.key,
    search_column: search.column,
    sort_column: sort.column,
    sort_order: sort.orderByAscending ? 'asc' : 'desc',
    page: meta.page,
    limit: meta.limit,
  };
});
const { isLoading, error, load } = useApiRequest<any[]>({
  baseURL: props.baseURL,
  url: props.url || '',
  authorize: true,
  autoLoad: false,
  initialLoadingState: true,
  signal: controller.value.signal,
  onSuccess: (response) => {
    if (!response?.data) return;
    const { data } = response;
    serverItems.value = data || [];
    const { size, limit, page, lastPage, total } = response.meta!;
    meta.count = size;
    meta.limit = limit;
    meta.page = page;
    meta.pages = lastPage;
    meta.total = total;
  },
});
const loadFromServer = async () => {
  if (isLoading.value) {
    controller.value.abort();
    controller.value = new AbortController();
  }
  await load({ params: serverQuery.value });
  router.replace({
    path: route.path,
    query: { ...route.query, ...serverQuery.value },
  });
};
onMounted(() => {
  if (props.url) loadFromServer();
});
// ========================================================================================================================

provide<DatatableProvision>('datatable', {
  getSelectionIndex,
  searchColumns: props.searchColumns,
  searchColumnNames,
  selectable: props.selectable,
  selection,
  showSearchColumns: props.showSearchColumns,
  paginatedData,
  paginationLinks,
  ...toRefs(
    reactive({
      meta,
      search,
      sort,
    })
  ),
  setSearchKey,
  setSearchColumn,
  next,
  prev,
  navigate,
  clearSelection,
  loadFromServer,
  selectAll,
  setSorting,
  toggleFilter,
  toggleSelection,
});
</script>

<template>
  <div class="flex flex-col gap-6 max-w-full">
    <div
      v-if="paginatable"
      class="flex flex-wrap gap-10 items-center justify-between"
    >
      <div class="text-sm">
        <template v-if="paginatedData.length">
          Showing {{ start + 1 }} to
          {{ end > meta.total ? meta.total : end }} of
          {{ meta.total }}
        </template>
        <template v-else>---</template>
      </div>
      <div class="flex flex-wrap gap-2">
        <template
          :key="index"
          v-for="(
            { isActive, isDisabled, title, action }, index
          ) in paginationLinks"
        >
          <button
            class="border px-4 py-2 rounded text-sm"
            :class="[
              isActive
                ? 'bg-black border-black text-white'
                : 'border-gray-400 hover:bg-gray-100 hover:border-black',
              isDisabled && 'opacity-25 pointer-events-none',
            ]"
            type="button"
            :disabled="isDisabled || isActive"
            v-html="title"
            @click.prevent="action"
          />
        </template>
      </div>
    </div>
    <div
      v-if="$slots.cta || searchable"
      class="flex flex-wrap gap-x-12 gap-y-2 items-center"
    >
      <div v-if="$slots.cta" class="md:ml-auto md:order-3">
        <slot name="cta" />
      </div>
      <CommonDatatableSearch />
    </div>
    <div class="flex gap-4" v-if="filterable && filters.length">
      <template v-for="filter in filters">
        <CommonTag
          :is-active="isFilterApplied(filter.name)"
          :right-icon="isFilterApplied(filter.name) ? 'close' : undefined"
          @click="toggleFilter(filter.name)"
        >
          {{ filter.title || filter.name }}
        </CommonTag>
      </template>
      <span>{{ selection.length }}</span>
    </div>
    <slot
      name="table"
      :error="error"
      :is-loading="isLoading"
      :paginated-data="paginatedData"
    >
      <div class="grid place-items-center h-[200px]" v-if="isLoading">
        <CommonLoaderSmall />
      </div>
      <div
        class="border border-gray-300 flex items-center justify-center min-h-[20rem] rounded-lg"
        v-else-if="!paginatedData.length"
      >
        <p>There are no results to display</p>
      </div>
      <div v-else-if="error">Error</div>
      <div v-else class="overflow-x-scroll w-full">
        <table
          class="border border-gray-100 border-collapse whitespace-nowrap w-full"
        >
          <thead>
            <tr class="bg-gray-50">
              <CommonDatatableTH v-if="selectable">
                <CommonFormCheckbox
                  class="mb-0"
                  @update:modelValue="selectAll"
                />
              </CommonDatatableTH>
              <slot name="heading" />
            </tr>
          </thead>
          <tbody>
            <template v-for="(row, index) in paginatedData">
              <slot v-bind="row" />
            </template>
          </tbody>
        </table>
      </div>
    </slot>
  </div>
</template>
