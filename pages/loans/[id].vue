<script lang="ts" setup>
import { DatatableItem } from '~/types';
import { LoanRepayment } from '~~/types/models';
import { dateTimeFormat } from '~~/utils/filters/dates';
import { numberFormat } from '~~/utils/filters/numbers';

definePageMeta({
  middleware: ['auth'],
});

const route = useRoute();
const loanId = computed(() => route.params.id as string);

const columns = [
  { name: 'id', title: 'ID' },
  { name: 'loan_id', title: 'Loan ID' },
  { name: 'user_id', title: 'User ID' },
];
useHead({
  title: 'Loan Details',
});
</script>

<template>
  <div>
    <PageHeading>
      <Heading level="2">Loan History</Heading>
    </PageHeading>
    <Datatable
      :url="`loans/${loanId}`"
      service="LOANS"
      :search-columns="columns"
    >
      <template #heading>
        <DatatableTH name="id">ID</DatatableTH>
        <DatatableTH name="loan_id">loan Id</DatatableTH>
        <DatatableTH name="user_id">User ID</DatatableTH>
        <DatatableTH name="amount">Amount</DatatableTH>
        <DatatableTH name="overdue_fee">Over Due Fee</DatatableTH>
        <DatatableTH name="due_date">Due Date </DatatableTH>
        <DatatableTH name="status">Status </DatatableTH>
        <DatatableTH name="created_at">Date </DatatableTH>
      </template>
      <template #default="{ row }: DatatableItem<LoanRepayment>">
        <DatatableRow>
          <DatatableTD>
            {{ row?.id }}
          </DatatableTD>

          <DatatableTD>
            {{ row?.loan_id }}
          </DatatableTD>

          <DatatableTD>
            {{ row?.user_id }}
          </DatatableTD>

          <DatatableTD>
            {{ numberFormat(row.amount, 'currency') }}
          </DatatableTD>

          <DatatableTD>
            {{ numberFormat(row.overdue_fee, 'currency') }}
          </DatatableTD>

          <DatatableTD>
            {{ dateTimeFormat(row.due_date, 'date:compact') }}
          </DatatableTD>

          <DatatableTD> {{ row.status }}</DatatableTD>

          <DatatableTD>
            {{ dateTimeFormat(row.created_at, 'date:compact') }}
          </DatatableTD>
        </DatatableRow>
      </template>
    </Datatable>
  </div>
</template>
