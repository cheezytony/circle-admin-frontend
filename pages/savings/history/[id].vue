<script lang="ts" setup>
import { DatatableItem } from '~/types';
import { SavingsTransaction, SavingsTransactionEx } from '~~/types/models';
import { dateTimeFormat } from '~~/utils/filters/dates';
import { numberFormat } from '~~/utils/filters/numbers';

definePageMeta({
  middleware: ['auth'],
});

const route = useRoute();
const savingsId = computed(() => route.params.id as string);
const type = computed(() => route.query.type as string);

const filters = [
  { name: 'DEPOSIT', title: 'Deposits' },
  { name: 'WITHDRAWAL', title: 'Withdrawals' },
];
const columns = [
  { name: 'id', title: 'ID' },
  { name: 'reference', title: 'Reference' },
  { name: 'description', title: 'Description' },
];

useHead({
  title: 'Savings tranaction history',
});
</script>

<template>
  <div>
    <PageHeading>
      <Heading level="2">Savings History</Heading>
    </PageHeading>

    <Datatable
      :url="`savings/saving-history/${savingsId}`"
      service="SAVINGS"
      :filters="filters"
      :search-columns="columns"
      :model="SavingsTransactionEx"
    >
      <template #heading>
        <DatatableTH name="id">ID</DatatableTH>
        <DatatableTH name="amount">Amount</DatatableTH>
        <DatatableTH name="currency">Currency</DatatableTH>
        <DatatableTH name="feference">Reference</DatatableTH>
        <DatatableTH name="description">Description</DatatableTH>
        <DatatableTH name="category">Category</DatatableTH>
        <DatatableTH name="status">Status </DatatableTH>
        <DatatableTH name="created_at">Date </DatatableTH>
      </template>
      <template #default="{ row }">
        <DatatableRow>
          <DatatableTD>
            <div class="flex items-center gap-3">
              {{ row.id }}
            </div>
          </DatatableTD>
          <DatatableTD>
            {{
              numberFormat(
                row.amount,
                'currency',
                row.type == 'DOLLAR' ? 'USD' : 'NGN'
              )
            }}
          </DatatableTD>
          <DatatableTD> {{ row.currency }}</DatatableTD>
          <DatatableTD> {{ row.reference }}</DatatableTD>
          <DatatableTD> {{ row.description }}</DatatableTD>
          <DatatableTD> {{ row.category }}</DatatableTD>

          <DatatableTD> {{ row.status }}</DatatableTD>
          <DatatableTD>
            {{ dateTimeFormat(row.created_at, 'date:compact') }}
          </DatatableTD>
        </DatatableRow>
      </template>
    </Datatable>
  </div>
</template>
