<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { User } from '~/types/models';
import { DataListItem } from '~~/types/components';
import { dateTimeFormat } from '~~/utils/filters/dates';

definePageMeta({
  layout: false,
  middleware: ['auth'],
});

useHead({ title: 'Users' });

const columns = ['id', 'first_name', 'last_name', 'email', 'phone'];
const column = ref('id');

const dataList: Array<DataListItem> = [
  { title: 'All Users', value: 100, type: 'number:compact' },
  { title: 'Pending Activation', value: 100, type: 'number:compact' },
  { title: 'Active Users', value: 1150, type: 'number:compact', change: 10 },
  { title: 'Declined Users', value: 1150, type: 'number:compact', change: 10 },
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
        <CommonHeading level="2">All Users</CommonHeading>
        <CommonButton left-icon="user-plus" href="/users/create" size="sm">
          <span>Create</span>
        </CommonButton>
      </CommonPageHeading>

      <CommonDatatable :columns="columns" :column="column">
        <template #heading>
          <CommonDatatableTH name="first_name">User</CommonDatatableTH>
          <CommonDatatableTH name="email">Email</CommonDatatableTH>
          <CommonDatatableTH name="phone">Phone</CommonDatatableTH>
          <CommonDatatableTH name="created_at">Date Created</CommonDatatableTH>
        </template>
        <template #default="{ row }: { row: User }">
          <CommonDatatableRow :to="`/users/${row.id}`">
            <CommonDatatableTD>
              <div class="flex items-center gap-3">
                <div class="bg-gray-300 h-8 rounded-full w-8"></div>
                <span>{{ row.first_name }} {{ row.last_name }}</span>
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
