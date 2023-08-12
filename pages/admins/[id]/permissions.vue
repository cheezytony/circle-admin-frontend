<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useForm } from 'vue3-form';
import { DatatableFilter } from '~~/types/components';
import { Admin, Permission } from '~~/types/models';
import { truncate } from '~~/utils/filters/strings';
import { useApiRequest, useFormRequest } from '~~/utils/hooks/api';

const props = defineProps<{
  admin: Admin;
}>();
useHead({
  title: () => `Manage ${props.admin.first_name}'s Permissions`,
});

const { data, isLoading, load: loadAll } = useApiRequest<Array<Permission>>({
  url: '/permissions',
  authorize: true,
  autoLoad: true,
});
const { data: data2, load: reloadAdminPermissions } = useApiRequest<Array<Permission>>({
  url: `/permissions/${props.admin.id}`,
  authorize: true,
  autoLoad: true,
});
const form = useForm({
  permissions: {
    value: [] as any,
  },
});
const { submit } = useFormRequest(form, {
  url: `/permissions/${props.admin.id}`,
  method: 'PATCH',
  authorize: true,
  onSuccess: () => {
    reloadAdminPermissions();
  },
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
  const isAssigned = !!adminPermissions.value.find((p) => p.slug === slug);
  const isSelected = !!selection.value.find((p) => p.slug === slug);
  return (isAssigned && !isSelected) || (!isAssigned && isSelected);
};
const handleSelectionUpdate = (selection: Permission[]) => {
  form.value.fields.permissions.value = selection.map((p) => p.slug) as any;
};

watch(adminPermissions, (value) => (selection.value = [...value]));

</script>

<template>
  <div>
    <CommonPageHeading>
      <CommonHeading level="2">
        {{ admin.first_name }}'s Permissions
      </CommonHeading>
    </CommonPageHeading>

    <div class="flex flex-col gap-8">
      <CommonDatatable
        :data="permissions"
        v-model:active-filters="activeFilters"
        :filters="filters"
        :search-columns="columns"
        :limit="10"
        :show-search-columns="false"
        :selectable="true"
        unique-key="slug"
        v-model:selection="selection"
        @update:selection="handleSelectionUpdate"
      >
        <template #heading>
          <CommonDatatableTH name="slug">Permission</CommonDatatableTH>
          <CommonDatatableTH>Description</CommonDatatableTH>
          <CommonDatatableTH align="right">Changes</CommonDatatableTH>
        </template>
        <template #default="{ row, index }: { row: Permission, index: number }">
          <CommonDatatableRow :index="index">
            <CommonDatatableTD>{{ row.slug }}</CommonDatatableTD>
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
      <div class="flex flex-col items-start gap-2">
        <div class="flex flex-col gap-4 items-center md:flex-row">
          <CommonButton
            :is-loading="form.loading"
            size="sm"
            class="flex-shrink-0"
            @click="submit"
          >
            Save Changes
          </CommonButton>
          <!-- <p>Quae officiis facilis culpa tempore soluta quam sint.</p> -->
        </div>
        <!-- <div class="flex flex-col gap-4 items-center md:flex-row">
          <CommonButton size="sm" class="flex-shrink-0" color-scheme="black:soft">Reset</CommonButton>
          <p>Fugit, ut alias! Esse quos soluta cupiditate?</p>
        </div>
        <div class="flex flex-col gap-4 items-center md:flex-row">
          <CommonButton size="sm" class="flex-shrink-0" color-scheme="black:outline">Assign All</CommonButton>
          <p>Asperiores veritatis numquam a labore id maiores eveniet.</p>
        </div>
        <div class="flex flex-col gap-4 items-center md:flex-row">
          <CommonButton size="sm" class="flex-shrink-0" color-scheme="red:soft">Clear All</CommonButton>
          <p>Voluptates ullam, fugit sequi accusamus nemo rem ratione.</p>
        </div> -->
      </div>
    </div>
  </div>
</template>
