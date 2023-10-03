<script lang="ts" setup>
import { WalletTransaction } from '~/types/models';
import { DataListItem } from '~~/types/components';
import { StockOrder, StockOrderEx } from '~~/types/models/stocks';
import { dateTimeFormat } from '~~/utils/filters/dates';
import { numberFormat } from '~~/utils/filters/numbers';

definePageMeta({
  layout: false,
  middleware: ['auth'],
});

useHead({ title: 'Stocks' });

const columns = ['reference', 'user_id', 'amount', 'status', 'created_at'];

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
        <Heading level="2">All Stock Orders</Heading>
      </PageHeading>

      <Datatable
        url="/orders"
        service="STOCKS"
        :search-columns="columns"
        order-by="created_at"
        :order-by-ascending="false"
        :model="StockOrderEx"
      >
        <template #heading>
          <DatatableTH name="user_id">User ID</DatatableTH>
          <DatatableTH name="provider_order_no">Order Number</DatatableTH>
          <DatatableTH name="symbol">Symbol</DatatableTH>
          <DatatableTH align="right" name="amount">Amount</DatatableTH>
          <DatatableTH name="side">Side</DatatableTH>
          <DatatableTH name="status">Status</DatatableTH>
          <DatatableTH name="created_at">Date</DatatableTH>
        </template>
        <template #default="{ row }">
          <DatatableRow :to="`/users/${row.user_id}/stocks`">
            <DatatableTD>
              <span class="flex flex-col gap-1">
                <span>{{ row.user?.firstName }} {{ row.user?.lastName }}</span>
                <span class="text-xs opacity-50">{{ row.user_id }}</span>
              </span>
            </DatatableTD>
            <DatatableTD>{{ row.provider_order_no }}</DatatableTD>
            <DatatableTD>{{ row.symbol }}</DatatableTD>
            <DatatableTD align="right">
              <span
                :class="{
                  'text-green-700': row.side === 'BUY',
                  'text-red-700': row.side === 'SELL',
                }"
              >
                {{ numberFormat(row.amount, 'currency', 'USD') }}
              </span>
            </DatatableTD>
            <DatatableTD>{{ row.side }}</DatatableTD>
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
