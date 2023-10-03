<script lang="ts" setup>
import { DatatableItem } from '~/types';
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
    <PageHeading>
      <Heading level="2">Loans</Heading>
    </PageHeading>

    <Datatable
      :url="'loans'"
      service="LOANS"
      :search-columns="columns"
      :column="column"
    >
      <template #heading>
        <DatatableTH>User Name</DatatableTH>
        <DatatableTH>Phone No.</DatatableTH>
        <DatatableTH name="id">Loan Id</DatatableTH>
        <DatatableTH name="status">Status</DatatableTH>
        <DatatableTH name="request_amount">Loan Amount</DatatableTH>
        <DatatableTH name="created_at">Date Created</DatatableTH>
      </template>

      <template #default="{ row }: DatatableItem<Loan>">
        <DatatableRow :to="`/loans/${row.id}`">
          <DatatableTD>
            <span class="flex flex-col gap-1">
              <span> {{ row.firstName }} {{ row.lastName }} </span>
              <span class="text-xs opacity-50">{{ row.user_id }}</span>
            </span>
          </DatatableTD>

          <DatatableTD>{{ row.phone_number || 'N/A' }}</DatatableTD>

          <DatatableTD>{{ row?.id || 'N/A' }}</DatatableTD>

          <DatatableTD>{{ row.status }}</DatatableTD>

          <DatatableTD>
            {{ numberFormat(row.loan_amount, 'currency') }}
          </DatatableTD>

          <DatatableTD>
            {{
              row.created_at ? dateTimeFormat(row.created_at, 'date') : 'N/A'
            }}
          </DatatableTD>
        </DatatableRow>
      </template>
    </Datatable>
  </div>
</template>
