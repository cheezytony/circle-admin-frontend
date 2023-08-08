<script lang="ts" setup>
import { LoanRepayment } from '~~/types/models';
import { dateTimeFormat } from '~~/utils/filters/dates';
import { numberFormat } from '~~/utils/filters/numbers';

definePageMeta({
  middleware: ['auth'],
});

const route = useRoute();
const loanId = computed(() => route.params.id as string);

useHead({
  title: 'Loan Details',
});
</script>

<template>
  <div>
    <CommonPageHeading>
      <CommonHeading level="2">Loan History</CommonHeading>
    </CommonPageHeading>
    <CommonDatatable
      :url="`loans/${loanId}`"
      service="LOANS"
      :search-columns="columns"
      :column="column"
    >
      <template #heading>
        <CommonDatatableTH>ID</CommonDatatableTH>
        <CommonDatatableTH>loan Id</CommonDatatableTH>
        <CommonDatatableTH>User ID</CommonDatatableTH>
        <CommonDatatableTH>Amount</CommonDatatableTH>
        <CommonDatatableTH>Over Due Fee</CommonDatatableTH>
        <CommonDatatableTH>Due Date </CommonDatatableTH>
        <CommonDatatableTH>Status </CommonDatatableTH>
        <CommonDatatableTH>Date </CommonDatatableTH>
      </template>
      <template #default="{ row }: { row: LoanRepayment }">
        <CommonDatatableRow>
          <CommonDatatableTD>
            {{ row?.id }}
          </CommonDatatableTD>

          <CommonDatatableTD>
            {{ row?.loan_id }}
          </CommonDatatableTD>

          <CommonDatatableTD>
            {{ row?.user_id }}
          </CommonDatatableTD>

          <CommonDatatableTD>
            {{ numberFormat(row.amount, 'currency') }}
          </CommonDatatableTD>

          <CommonDatatableTD>
            {{ numberFormat(row.overdue_fee, 'currency') }}
          </CommonDatatableTD>

          <CommonDatatableTD>
            {{ dateTimeFormat(row.due_date, 'date:compact') }}
          </CommonDatatableTD>

          <CommonDatatableTD> {{ row.status }}</CommonDatatableTD>

          <CommonDatatableTD>
            {{ dateTimeFormat(row.created_at, 'date:compact') }}
          </CommonDatatableTD>
        </CommonDatatableRow>
      </template>
    </CommonDatatable>
  </div>
</template>
