<script lang="ts" setup>
import { WalletTransaction } from '~/types/models';
import { DataListItem } from '~~/types/components';
import { dateTimeFormat } from '~~/utils/filters/dates';

definePageMeta({
  layout: false,
  middleware: ['auth'],
});

useHead({ title: 'Transactions' });

const columns = ['reference', 'user_id', 'amount', 'status', 'created_at'];
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
      >
        <template #heading>
          <CommonDatatableTH name="user_id">User ID</CommonDatatableTH>
          <CommonDatatableTH name="amount">Amount</CommonDatatableTH>
          <CommonDatatableTH name="reference">Reference</CommonDatatableTH>
          <CommonDatatableTH name="type">Type</CommonDatatableTH>
          <CommonDatatableTH name="status">Status</CommonDatatableTH>
          <CommonDatatableTH name="created_at">Date</CommonDatatableTH>
        </template>
        <template #default="{ row }: { row: WalletTransaction }">
          <CommonDatatableRow>
            <CommonDatatableTD>
              <span class="flex flex-col gap-1">
                <span>{{ row.user?.firstName }} {{ row.user?.lastName }}</span>
                <span class="text-xs opacity-50">{{ row.user_id }}</span>
              </span>
            </CommonDatatableTD>
            <CommonDatatableTD>{{ row.amount }}</CommonDatatableTD>
            <CommonDatatableTD>{{ row.reference }}</CommonDatatableTD>
            <CommonDatatableTD>{{ row.type }}</CommonDatatableTD>
            <CommonDatatableTD>{{ row.status }}</CommonDatatableTD>
            <CommonDatatableTD>
              {{ dateTimeFormat(row.created_at, 'date:compact:time') }}
            </CommonDatatableTD>
          </CommonDatatableRow>
        </template>
      </CommonDatatable>
    </div>
  </NuxtLayout>
</template>
