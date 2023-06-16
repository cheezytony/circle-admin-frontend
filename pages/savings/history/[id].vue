<script lang="ts" setup>
import { SavingsTransaction } from '~~/types/models';
import { dateTimeFormat } from '~~/utils/filters/dates';
import { numberFormat } from '~~/utils/filters/numbers';
import { useApiRequest } from '~~/utils/hooks/api';

definePageMeta({
  middleware: ['auth'],
});

const route = useRoute();
const savingsId = computed(() => route.params.id as string);
const type = computed(() => route.query.type as string);
const {
  public: { savingsBaseUrl },
} = useRuntimeConfig();

const filters = [
  { name: 'DEPOSIT', title: 'Deposits' },
  { name: 'WITHDRAWAL', title: 'Withdrawals' },
];

useHead({
  title: 'Savings tranaction history',
});
</script>

<template>
  <div>
    <CommonPageHeading>
      <CommonHeading level="2">Savings History</CommonHeading>
    </CommonPageHeading>

    <CommonDatatable
      :url="`/admin/saving-history?savingsId=${savingsId}&type=${type}`"
      :base-u-r-l="`http://127.0.0.1:4000`"
      :paginatable="true"
      :searchable="true"
      :filters="filters"
    >
      <template #heading>
        <CommonDatatableTH name="id">ID</CommonDatatableTH>

        <CommonDatatableTH name="amount">Amount</CommonDatatableTH>
        <CommonDatatableTH name="currency">Currency</CommonDatatableTH>
        <CommonDatatableTH name="feference">Reference</CommonDatatableTH>
        <CommonDatatableTH name="description">Description</CommonDatatableTH>
        <CommonDatatableTH name="category">Category</CommonDatatableTH>
        <CommonDatatableTH name="status">Status </CommonDatatableTH>
        <CommonDatatableTH name="created_at">Date </CommonDatatableTH>
      </template>
      <template #default="{ row }: { row: SavingsTransaction }">
        <CommonDatatableRow>
          <CommonDatatableTD>
            <div class="flex items-center gap-3">
              <span>{{ row?.id }} </span>
            </div>
          </CommonDatatableTD>
          <CommonDatatableTD>{{
            numberFormat(
              row.amount,
              'currency',
              row?.type == 'DOLLAR' ? 'USD' : 'NGN'
            )
          }}</CommonDatatableTD>
          <CommonDatatableTD> {{ row.currency }}</CommonDatatableTD>
          <CommonDatatableTD> {{ row.reference }}</CommonDatatableTD>
          <CommonDatatableTD> {{ row.description }}</CommonDatatableTD>
          <CommonDatatableTD> {{ row.category }}</CommonDatatableTD>

          <CommonDatatableTD> {{ row.status }}</CommonDatatableTD>
          <CommonDatatableTD>
            {{
              dateTimeFormat(row.created_at, 'date:compact')
            }}</CommonDatatableTD
          >
        </CommonDatatableRow>
      </template>
    </CommonDatatable>
  </div>
</template>
