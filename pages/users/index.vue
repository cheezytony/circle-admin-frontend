<script lang="ts" setup>
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
  { title: 'All Users', value: '----' },
  { title: 'Pending Activation', value: '----' },
  { title: 'Active Users', value: '----' },
  { title: 'Declined Users', value: '----' },
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

      <CommonDatatable
        url="/users"
        service="USER_DATA"
        :columns="columns"
        :column="column"
      >
        <template #heading>
          <CommonDatatableTH name="first_name">User</CommonDatatableTH>
          <CommonDatatableTH name="email">Email</CommonDatatableTH>
          <CommonDatatableTH name="phone">Phone</CommonDatatableTH>
          <CommonDatatableTH name="created_at"
            >Date Registered</CommonDatatableTH
          >
        </template>
        <template #default="{ row }: { row: User }">
          <CommonDatatableRow :to="`/users/${row._id}`">
            <CommonDatatableTD>
              <div class="flex items-center gap-3">
                <div class="bg-gray-300 h-8 rounded-full w-8"></div>
                <span>{{ row.firstName }} {{ row.lastName }}</span>
              </div>
            </CommonDatatableTD>
            <CommonDatatableTD>{{ row.email }}</CommonDatatableTD>
            <CommonDatatableTD>{{ optional(row.phoneNumber) }}</CommonDatatableTD>
            <CommonDatatableTD>
              {{ dateTimeFormat(row.createdAt, 'date') }}
            </CommonDatatableTD>
          </CommonDatatableRow>
        </template>
      </CommonDatatable>
    </div>
  </NuxtLayout>
</template>
