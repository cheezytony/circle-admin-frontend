<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Admin } from '~/types/models';
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
</script>

<template>
  <NuxtLayout name="default">
    <template #summary>
      <CommonSummaryHeading>Overview</CommonSummaryHeading>

      <CommonDataList :data="dataList" />
    </template>
    <div>
      <CommonPageHeading>
        <CommonHeading level="2">All Admins</CommonHeading>
        <CommonButton left-icon="user-plus" href="/admins/create" size="sm">
          <span>Create</span>
        </CommonButton>
      </CommonPageHeading>

      <CommonDatatable url="/admins" :search-columns="columns" :column="column">
        <template #heading>
          <CommonDatatableTH name="first_name">Admin</CommonDatatableTH>
          <CommonDatatableTH name="email">Email</CommonDatatableTH>
          <CommonDatatableTH name="phone">Phone</CommonDatatableTH>
          <CommonDatatableTH name="created_at">Date Added</CommonDatatableTH>
        </template>
        <template #default="{ row }: { row: Admin }">
          <CommonDatatableRow :to="`/admins/${row.id}`">
            <CommonDatatableTD>
              <div class="flex items-center gap-3">
                <img
                  class="bg-gray-300 shrink-0 h-8 rounded-full w-8"
                  :src="
                    row.avatar ||
                    `https://ui-avatars.com/api/?background=000&color=fff&font-size=0.3&size=128&name=${row.first_name}+${row.last_name}`
                  "
                  :alt="`${row.first_name} ${row.last_name}`"
                />
                <span class="flex flex-col gap-1">
                  <span>{{ row?.first_name }} {{ row?.last_name }}</span>
                  <span class="text-xs opacity-50">{{ row.id }}</span>
                </span>
              </div>
            </CommonDatatableTD>
            <CommonDatatableTD>{{ row.email }}</CommonDatatableTD>
            <CommonDatatableTD>{{ row.phone }}</CommonDatatableTD>
            <CommonDatatableTD>
              {{ dateTimeFormat(row.created_at, 'date:compact') }}
            </CommonDatatableTD>
          </CommonDatatableRow>
        </template>
      </CommonDatatable>
    </div>
  </NuxtLayout>
</template>
