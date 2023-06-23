<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { DatatableFilter } from '~~/types/components';
import { Admin, Permission } from '~~/types/models';
import { truncate } from '~~/utils/filters/strings';
import { useApiRequest } from '~~/utils/hooks/api';

const props = defineProps<{
  admin: Admin;
}>();
useHead({
  title: () => `Manage ${props.admin.first_name}'s Permissions`,
});

const { data, isLoading, load } = useApiRequest<Array<Permission>>({
  url: '/permissions',
  authorize: true,
  autoLoad: true,
});
const { data: data2 } = useApiRequest<Array<Permission>>({
  url: `/permissions/${props.admin.id}`,
  authorize: true,
  autoLoad: true,
});
const permissions = computed(() => data.value?.data ?? []);
const adminPermissions = computed(() => data2.value?.data ?? []);
const columns = ['slug', 'name', 'description'];

const filters: Array<DatatableFilter> = [
  {
    title: 'Assigned',
    name: 'assigned',
    action: ({ slug }: Permission) =>
      !!adminPermissions.value.find((p) => p.slug === slug),
  },
  {
    title: 'Unassigned',
    name: 'unassigned',
    action: ({ slug }: Permission) =>
      !!adminPermissions.value.every((p) => p.slug !== slug),
  },
];
const selection = ref<Permission[]>([]);
const activeFilters = ref([]);

const isChanged = ({ slug }: Permission) => {
  const isAssigned = !!(adminPermissions.value.find((p) => p.slug === slug));
  const isSelected = !!(selection.value.find((p) => p.slug === slug));
  console.log({ isAssigned, isSelected });

  return (isAssigned && !isSelected) || (!isAssigned && isSelected);
};

watch(adminPermissions, (value) => {
  selection.value = [...value];
});
</script>

<template>
  <div>
    <CommonPageHeading>
      <CommonHeading level="2">
        Manage {{ admin.first_name }}'s Permissions {{ permissions.length }}
      </CommonHeading>
    </CommonPageHeading>

    <div>
      <CommonDatatable
        :data="permissions"
        v-model:active-filters="activeFilters"
        :filters="filters"
        :search-columns="columns"
        :limit="permissions.length"
        :show-search-columns="false"
        :selectable="true"
        unique-key="slug"
        v-model:selection="selection"
      >
        <template #heading>
          <CommonDatatableTH>Permission</CommonDatatableTH>
          <CommonDatatableTH>Description</CommonDatatableTH>
          <CommonDatatableTH align="right">Changes</CommonDatatableTH>
        </template>
        <template #default="{ row, index }: { row: Permission, index: number }">
          <CommonDatatableRow :index="index">
            <CommonDatatableTD>{{ row.name }}</CommonDatatableTD>
            <CommonDatatableTD>
              {{ truncate(row.description, 100) }}
            </CommonDatatableTD>
            <CommonDatatableTD align="right">
              <span v-if="isChanged(row)" class="text-xl text-red-500">
                <FontAwesomeIcon icon="triangle-exclamation" />
              </span>
            </CommonDatatableTD>
          </CommonDatatableRow>
        </template>
      </CommonDatatable>
    </div>
  </div>
</template>
