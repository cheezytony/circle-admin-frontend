<script lang="ts" setup>
import { User, UserEx } from '~/types/models';
import { DataListItem } from '~~/types/components';
import { dateTimeFormat } from '~~/utils/filters/dates';

definePageMeta({
  layout: false,
  middleware: ['auth'],
});

useHead({ title: 'Users' });

const columns = ['id', 'firstName', 'lastName', 'email', 'phoneNumber'];

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
      <SummaryHeading>Overview</SummaryHeading>

      <DataList :data="dataList" />
    </template>
    <div>
      <PageHeading>
        <Heading level="2">All Users</Heading>
        <Button left-icon="user-plus" href="/users/create" size="sm">
          <span>Create</span>
        </Button>
      </PageHeading>

      <Datatable
        url="/users"
        service="USER_DATA"
        :search-columns="columns"
        order-by="created_at"
        :order-by-ascending="false"
        :model="UserEx"
      >
        <template #heading>
          <DatatableTH name="first_name">User</DatatableTH>
          <DatatableTH name="email">Email</DatatableTH>
          <DatatableTH name="phone">Phone</DatatableTH>
          <DatatableTH name="created_at">
            Date Registered
          </DatatableTH>
        </template>
        <template #default="{ row }">
          <DatatableRow :to="`/users/${row._id}`">
            <DatatableTD>
              <div class="flex items-center gap-3">
                <img
                  class="bg-gray-300 shrink-0 h-8 rounded-full w-8"
                  :src="`https://ui-avatars.com/api/?background=000&color=fff&font-size=0.3&size=128&name=${row.firstName}+${row.lastName}`"
                  :alt="`${row.firstName} ${row.lastName}`"
                />
                <span class="flex flex-col gap-1">
                  <span>{{ row?.firstName }} {{ row?.lastName }}</span>
                  <span class="text-xs opacity-50 break-words">{{ row._id }}</span>
                </span>
              </div>
            </DatatableTD>
            <DatatableTD>{{ row.email }}</DatatableTD>
            <DatatableTD>
              {{ optional(row.phoneNumber) }}
            </DatatableTD>
            <DatatableTD>
              {{ dateTimeFormat(row.createdAt, 'date') }}
            </DatatableTD>
          </DatatableRow>
        </template>
      </Datatable>
    </div>
  </NuxtLayout>
</template>
