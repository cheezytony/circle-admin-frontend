<script lang="ts" setup>
import { WalletTransaction } from '~/types/models';
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
      <CommonSummaryHeading>Overview</CommonSummaryHeading>

      <CommonDataList :data="dataList" />
    </template>
    <div>
      <CommonPageHeading>
        <CommonHeading level="2">All Transactions</CommonHeading>
      </CommonPageHeading>

      <CommonDatatable
        url="/transactions"
        service="WALLET"
        :search-columns="columns"
        :column="column"
        order-by="created_at"
        :order-by-ascending="false"
      >
        <template #heading>
          <CommonDatatableTH name="user_id">User</CommonDatatableTH>
          <CommonDatatableTH align="right" name="amount">Amount</CommonDatatableTH>
          <CommonDatatableTH name="currency">Currency</CommonDatatableTH>
          <CommonDatatableTH name="reference">Reference</CommonDatatableTH>
          <CommonDatatableTH name="type">Type</CommonDatatableTH>
          <CommonDatatableTH name="status">Status</CommonDatatableTH>
          <CommonDatatableTH name="created_at">Date</CommonDatatableTH>
        </template>
        <template #default="{ row }: { row: WalletTransaction }">
          <CommonDatatableRow :to="`/users/${row.user_id}/wallet`">
            <CommonDatatableTD>
              <span class="flex flex-col gap-1">
                <span>{{ row.user?.firstName }} {{ row.user?.lastName }}</span>
                <span class="text-xs opacity-50">{{ row.user_id }}</span>
              </span>
            </CommonDatatableTD>
            <CommonDatatableTD align="right">
              <span
                :class="{
                  'text-green-700': row.type === 'CREDIT',
                  'text-red-700': row.type === 'DEBIT',
                }"
              >
                {{ numberFormat(row.amount, 'currency', row.currency) }}
              </span>
            </CommonDatatableTD>
            <CommonDatatableTD>{{ row.currency }}</CommonDatatableTD>
            <CommonDatatableTD>{{ row.reference }}</CommonDatatableTD>
            <CommonDatatableTD>{{ row.type }}</CommonDatatableTD>
            <CommonDatatableTD>
              <CommonBadgeStatus :status="row.status" />
            </CommonDatatableTD>
            <CommonDatatableTD>
              {{ dateTimeFormat(row.created_at, 'date:compact:time') }}
            </CommonDatatableTD>
          </CommonDatatableRow>
        </template>
      </CommonDatatable>
    </div>
  </NuxtLayout>
</template>
