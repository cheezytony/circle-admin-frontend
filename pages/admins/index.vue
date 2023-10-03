<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Admin, AdminEx } from '~/types/models';
import { useAssetFunction } from '~/utils';
import { DataListItem } from '~~/types/components';
import { dateTimeFormat } from '~~/utils/filters/dates';

definePageMeta({
  layout: false,
  middleware: ['auth'],
});

useHead({ title: 'Admins' });

const columns = [
  { name: 'id', title: 'User ID' },
  { name: 'first_name', title: 'First Name' },
  { name: 'last_name', title: 'Last Name' },
  { name: 'email', title: 'Email Address' },
  { name: 'phone', title: 'Phone Number' },
];
const column = ref('id');

const dataList: Array<DataListItem> = [
  { title: 'Admins Onboarded', value: '----' },
  // { title: 'Active Admins', value: 1150, type: 'number:compact', change: 10 },
  { title: 'Active Admins', value: '----' },
  {
    title: 'Most Active',
    value: '----',
    // href: '/admins/cldvn3fo90000yhvos9e0n3yr',
  },
  {
    title: 'Recently Added',
    value: '----',
    // href: '/admins/cldvn3fo90000yhvos9e0n3yr',
  },
];

const getAsset = useAssetFunction();
const getAvatar = ({ avatar, first_name, last_name }: Admin) => {
  return avatar
    ? getAsset(avatar)
    : `https://ui-avatars.com/api/?background=000&color=fff&font-size=0.3&size=128&name=${first_name}+${last_name}`;
};
</script>

<template>
  <NuxtLayout name="default">
    <template #summary>
      <SummaryHeading>Overview</SummaryHeading>

      <DataList :data="dataList" />
    </template>
    <div>
      <PageHeading>
        <Heading level="2">All Admins</Heading>
        <Button left-icon="user-plus" href="/admins/create" size="sm">
          <span>Create</span>
        </Button>
      </PageHeading>

      <Datatable
        url="/admins"
        :search-columns="columns"
        :column="column"
        :model="AdminEx"
      >
        <template #heading>
          <DatatableTH name="first_name">Admin</DatatableTH>
          <DatatableTH name="email">Email</DatatableTH>
          <DatatableTH name="phone">Phone</DatatableTH>
          <DatatableTH name="created_at">Date Added</DatatableTH>
        </template>
        <template #default="{ row }">
          <DatatableRow :to="`/admins/${row.id}`">
            <DatatableTD>
              <div class="flex items-center gap-3">
                <img
                  class="bg-gray-300 shrink-0 h-8 rounded-full w-8"
                  :src="getAvatar(row)"
                  :alt="`${row.first_name} ${row.last_name}`"
                />
                <span class="flex flex-col gap-1">
                  <span>{{ row?.first_name }} {{ row?.last_name }}</span>
                  <span class="text-xs opacity-50">{{ row.id }}</span>
                </span>
              </div>
            </DatatableTD>
            <DatatableTD>{{ row.email }}</DatatableTD>
            <DatatableTD>{{ row.phone }}</DatatableTD>
            <DatatableTD>
              {{ dateTimeFormat(row.created_at, 'date:compact') }}
            </DatatableTD>
          </DatatableRow>
        </template>
      </Datatable>
    </div>
  </NuxtLayout>
</template>
