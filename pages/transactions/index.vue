<script lang="ts" setup>
import { WalletTransaction, WalletTransactionEx } from '~/types/models';
import { DataListItem, DatatableSearchColumn } from '~~/types/components';
import { dateTimeFormat } from '~~/utils/filters/dates';
import { numberFormat } from '~~/utils/filters/numbers';

definePageMeta({
  layout: false,
  middleware: ['auth'],
});

useHead({ title: 'Transactions' });

const columns: DatatableSearchColumn[] = [
  { title: 'Reference', name: 'reference' },
  { title: 'User ID', name: 'user_id' },
  { title: 'Amount', name: 'amount' },
  { title: 'Currency', name: 'currency' },
  { title: 'Status', name: 'status' },
  { title: 'Date Created', name: 'created_at' },
];
const column = ref('reference');

const dataList: Array<DataListItem> = [
  {
    title: 'Total Transactions',
    value: '----',
  },
  {
    title: 'Total Amount',
    value: '----',
  },
  {
    title: 'Total Pending',
    value: '----',
  },
  {
    title: 'Total Completed',
    value: '----',
  },
  {
    title: 'Total Failed',
    value: '----',
  },
  {
    title: 'Total Reversed',
    value: '----',
  },
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
        <Heading level="2">All Transactions</Heading>
      </PageHeading>

      <Datatable
        url="/transactions"
        service="WALLET"
        :search-columns="columns"
        :column="column"
        order-by="created_at"
        :order-by-ascending="false"
        :model="WalletTransactionEx"
      >
        <template #heading>
          <DatatableTH name="user_id">User</DatatableTH>
          <DatatableTH align="right" name="amount">Amount</DatatableTH>
          <DatatableTH name="currency">Currency</DatatableTH>
          <DatatableTH name="reference">Reference</DatatableTH>
          <DatatableTH name="type">Type</DatatableTH>
          <DatatableTH name="status">Status</DatatableTH>
          <DatatableTH name="created_at">Date</DatatableTH>
        </template>
        <template #default="{ row }">
          <DatatableRow :to="`/users/${row.user_id}/wallet`">
            <DatatableTD>
              <span class="flex flex-col gap-1">
                <span>{{ row.user?.firstName }} {{ row.user?.lastName }}</span>
                <span class="text-xs opacity-50">{{ row.user_id }}</span>
              </span>
            </DatatableTD>
            <DatatableTD align="right">
              <span
                :class="{
                  'text-green-700': row.type === 'CREDIT',
                  'text-red-700': row.type === 'DEBIT',
                }"
              >
                {{ numberFormat(row.amount, 'currency', row.currency) }}
              </span>
            </DatatableTD>
            <DatatableTD>{{ row.currency }}</DatatableTD>
            <DatatableTD>{{ row.reference }}</DatatableTD>
            <DatatableTD>{{ row.type }}</DatatableTD>
            <DatatableTD>
              <BadgeStatus :status="row.status" />
            </DatatableTD>
            <DatatableTD>
              {{ dateTimeFormat(row.created_at, 'date:compact:time') }}
            </DatatableTD>
          </DatatableRow>
        </template>
      </Datatable>
    </div>
  </NuxtLayout>
</template>
