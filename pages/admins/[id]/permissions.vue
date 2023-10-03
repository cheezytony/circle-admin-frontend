<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useForm } from 'vue3-form';
import { DatatableFilter, DatatableItem } from '~~/types/components';
import { Admin, Permission } from '~~/types/models';
import {
  truncate,
  useApiRequest,
  useDisclosure,
  useFormRequest,
} from '~~/utils';

const props = defineProps<{
  admin: Admin;
}>();
useHead({
  title: () => `Manage ${props.admin.first_name}'s Permissions`,
});

const { isOpen: isConfirmationOpen, open: openConfirmation, close: closeConfirmation } = useDisclosure();
const { isOpen, open } = useDisclosure();
const { data, isLoading } = useApiRequest<Array<Permission>>({
  url: '/permissions',
  authorize: true,
  autoLoad: true,
});
const {
  data: data2,
  isLoading: isLoading2,
  load: reloadAdminPermissions,
} = useApiRequest<Array<Permission>>({
  url: `/permissions/${props.admin.id}`,
  authorize: true,
  autoLoad: true,
  onSuccess: (data) => {
    data.data && updateForm(data.data);
  },
  onFinish: closeConfirmation,
});
const form = useForm({
  permissions: {
    value: [] as any,
  },
});
const { submit } = useFormRequest(form, {
  url: `/permissions/${props.admin.id}`,
  method: 'PUT',
  authorize: true,
  onSuccess: () => {
    open();
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
const updateForm = (selection: Permission[]) => {
  form.value.fields.permissions.value = selection.map((p) => p.slug) as any;
};

watch(adminPermissions, (value) => (selection.value = [...value]));
</script>

<template>
  <div class="flex flex-col gap-8">
    <Datatable
      v-model:selection="selection"
      v-model:active-filters="activeFilters"
      :is-loading="isLoading || isLoading2"
      :data="permissions"
      :filters="filters"
      :search-columns="columns"
      :limit="10"
      :show-search-columns="false"
      :selectable="true"
      unique-key="slug"
      @update:selection="updateForm"
    >
      <template #heading>
        <DatatableTH name="slug">Permission</DatatableTH>
        <DatatableTH>Description</DatatableTH>
        <DatatableTH align="right">Changes</DatatableTH>
      </template>
      <template #default="{ row, index }: DatatableItem<Permission>">
        <DatatableRow :index="index">
          <DatatableTD>{{ row.slug }}</DatatableTD>
          <DatatableTD>
            {{ truncate(row.description, 100) }}
          </DatatableTD>
          <DatatableTD align="right">
            <span v-if="isChanged(row)" class="text-xl text-red-500">
              <FontAwesomeIcon icon="triangle-exclamation" />
            </span>
          </DatatableTD>
        </DatatableRow>
      </template>
    </Datatable>
    <div class="flex flex-col items-start gap-2">
      <div class="flex flex-col gap-4 items-center md:flex-row">
        <Button
          :is-loading="form.loading"
          size="sm"
          class="flex-shrink-0"
          @click="openConfirmation"
        >
          Save Changes
        </Button>
        <!-- <p>Quae officiis facilis culpa tempore soluta quam sint.</p> -->
      </div>
      <!-- <div class="flex flex-col gap-4 items-center md:flex-row">
        <Button size="sm" class="flex-shrink-0" color-scheme="black:soft">Reset</Button>
        <p>Fugit, ut alias! Esse quos soluta cupiditate?</p>
      </div>
      <div class="flex flex-col gap-4 items-center md:flex-row">
        <Button size="sm" class="flex-shrink-0" color-scheme="black:outline">Assign All</Button>
        <p>Asperiores veritatis numquam a labore id maiores eveniet.</p>
      </div>
      <div class="flex flex-col gap-4 items-center md:flex-row">
        <Button size="sm" class="flex-shrink-0" color-scheme="purple:soft">Clear All</Button>
        <p>Voluptates ullam, fugit sequi accusamus nemo rem ratione.</p>
      </div> -->
    </div>

    <ModalConfirm
      v-model:is-open="isConfirmationOpen"
      :is-loading="form.loading"
      @submit="submit"
    >
      You're about to update {{ admin.first_name }}'s persmisions. Would you
      like to proceed?
    </ModalConfirm>
    <ModalSuccess v-model:is-open="isOpen">
      Permissions Updated Successfully
    </ModalSuccess>
  </div>
</template>
