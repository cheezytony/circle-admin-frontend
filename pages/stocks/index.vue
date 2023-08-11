<script lang="ts" setup>
import { WalletTransaction } from '~/types/models';
import { DataListItem } from '~~/types/components';
import { StockOrder } from '~~/types/models/stocks';
import { dateTimeFormat } from '~~/utils/filters/dates';
import { numberFormat } from '~~/utils/filters/numbers';

definePageMeta({
  layout: false,
  middleware: ['auth'],
});

useHead({ title: 'Stocks' });

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
        <CommonHeading level="2">All Stock Orders</CommonHeading>
      </CommonPageHeading>

      <CommonDatatable
        url="/orders"
        service="STOCKS"
        :search-columns="columns"
        :column="column"
        order-by="created_at"
        :order-by-ascending="false"
      >
        <template #heading>
          <CommonDatatableTH name="user_id">User ID</CommonDatatableTH>
          <CommonDatatableTH name="provider_order_no">Order Number</CommonDatatableTH>
          <CommonDatatableTH name="symbol">Symbol</CommonDatatableTH>
          <CommonDatatableTH align="right" name="amount">Amount</CommonDatatableTH>
          <CommonDatatableTH name="side">Side</CommonDatatableTH>
          <CommonDatatableTH name="status">Status</CommonDatatableTH>
          <CommonDatatableTH name="created_at">Date</CommonDatatableTH>
        </template>
        <template #default="{ row }: { row: StockOrder }">
          <CommonDatatableRow>
            <CommonDatatableTD>
              <span class="flex flex-col gap-1">
                <span>{{ row.user?.firstName }} {{ row.user?.lastName }}</span>
                <span class="text-xs opacity-50">{{ row.user_id }}</span>
              </span>
            </CommonDatatableTD>
            <CommonDatatableTD>{{ row.provider_order_no }}</CommonDatatableTD>
            <CommonDatatableTD>{{ row.symbol }}</CommonDatatableTD>
            <CommonDatatableTD align="right">
              <span
                :class="{
                  'text-green-700': row.side === 'BUY',
                  'text-red-700': row.side === 'SELL',
                }"
              >
                {{ numberFormat(row.amount, 'currency', 'USD') }}
              </span>
            </CommonDatatableTD>
            <CommonDatatableTD>{{ row.side }}</CommonDatatableTD>
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
