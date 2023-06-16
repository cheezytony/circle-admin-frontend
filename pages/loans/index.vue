<script lang="ts" setup>
import { Loan } from '~~/types/models';
import { dateTimeFormat } from '~~/utils/filters/dates';
import { numberFormat } from '~~/utils/filters/numbers';
import { useApiRequest } from '~~/utils/hooks/api';

useHead({
  title: 'Loans',
});

const columns = [
  { name: '_id', title: 'User ID' },
  { name: 'firstName', title: 'First Name' },
  { name: 'lastName', title: 'Last Name' },
  { name: 'email', title: 'Email Address' },
];
const {
  public: { loanBaseUrl },
} = useRuntimeConfig();
const column = ref('id');
const { data } = useApiRequest<Array<Loan>>({
  url: `${loanBaseUrl}admin/loans/users`,
  authorize: true,
  autoLoad: true,
});
</script>

<template>
  <div>
    <CommonPageHeading>
      <CommonHeading level="2">Loans</CommonHeading>
    </CommonPageHeading>

    <CommonDatatable :data="[]" :search-columns="columns" :column="column">
      <template #heading>
        <CommonDatatableTH name="id">User ID</CommonDatatableTH>
        <CommonDatatableTH name="firstName">User Name</CommonDatatableTH>
        <CommonDatatableTH name="phone_number">Phone No.</CommonDatatableTH>
        <CommonDatatableTH name="id">Loan Id</CommonDatatableTH>
        <CommonDatatableTH name="status">Status</CommonDatatableTH>
        <CommonDatatableTH name="request_amount">Loan Amount</CommonDatatableTH>
        <CommonDatatableTH name="created_at">Date Created</CommonDatatableTH>
      </template>

      <template #default="{ row }: { row: Loan }">
        <CommonDatatableRow>
          <CommonDatatableTD>
            {{ row.user_id }}
          </CommonDatatableTD>

          <CommonDatatableTD>
            {{ row?.first_name }} {{ row?.last_name }}
          </CommonDatatableTD>

          <CommonDatatableTD>{{ row.phone_number || 'N/A' }}</CommonDatatableTD>
          <CommonDatatableTD>{{ row?.id || 'N/A' }}</CommonDatatableTD>
          <CommonDatatableTD>{{ row.status }}</CommonDatatableTD>
          <CommonDatatableTD>{{
            numberFormat(row.loan_amount, 'currency')
          }}</CommonDatatableTD>
          <CommonDatatableTD>{{
            row.created_at ? dateTimeFormat(row.created_at, 'date') : 'N/A'
          }}</CommonDatatableTD>
        </CommonDatatableRow>
      </template>
    </CommonDatatable>
  </div>
</template>
