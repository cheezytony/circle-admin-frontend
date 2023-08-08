<script lang="ts" setup>
import { Loan } from '~~/types/models';
import { dateTimeFormat } from '~~/utils/filters/dates';
import { numberFormat } from '~~/utils/filters/numbers';

useHead({
  title: 'Loans',
});
definePageMeta({
  middleware: ['auth'],
});

const columns = [
  { name: '_id', title: 'User ID' },
  { name: 'firstName', title: 'First Name' },
  { name: 'lastName', title: 'Last Name' },
  { name: 'email', title: 'Email Address' },
];
const column = ref('id');
</script>

<template>
  <div>
    <CommonPageHeading>
      <CommonHeading level="2">Loans</CommonHeading>
    </CommonPageHeading>

    <CommonDatatable
      :url="'loans'"
      service="LOANS"
      :search-columns="columns"
      :column="column"
    >
      <template #heading>
        <CommonDatatableTH>User Name</CommonDatatableTH>
        <CommonDatatableTH>Phone No.</CommonDatatableTH>
        <CommonDatatableTH name="id">Loan Id</CommonDatatableTH>
        <CommonDatatableTH name="status">Status</CommonDatatableTH>
        <CommonDatatableTH name="request_amount">Loan Amount</CommonDatatableTH>
        <CommonDatatableTH name="created_at">Date Created</CommonDatatableTH>
      </template>

      <template #default="{ row }: { row: Loan }">
        <CommonDatatableRow :to="`/loans/${row.id}`">
          <CommonDatatableTD>
            <span class="flex flex-col gap-1">
              <span> {{ row.firstName }} {{ row.lastName }} </span>
              <span class="text-xs opacity-50">{{ row.user_id }}</span>
            </span>
          </CommonDatatableTD>

          <CommonDatatableTD>{{ row.phone_number || 'N/A' }}</CommonDatatableTD>

          <CommonDatatableTD>{{ row?.id || 'N/A' }}</CommonDatatableTD>

          <CommonDatatableTD>{{ row.status }}</CommonDatatableTD>

          <CommonDatatableTD>
            {{ numberFormat(row.loan_amount, 'currency') }}
          </CommonDatatableTD>

          <CommonDatatableTD>
            {{
              row.created_at ? dateTimeFormat(row.created_at, 'date') : 'N/A'
            }}
          </CommonDatatableTD>
        </CommonDatatableRow>
      </template>
    </CommonDatatable>
  </div>
</template>
