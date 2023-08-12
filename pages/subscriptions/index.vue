<script lang="ts" setup>
import { DataListItem } from '~~/types/components';
import { Subscription } from '~~/types/models';
import { dateTimeFormat } from '~~/utils/filters/dates';
import { numberFormat } from '~~/utils/filters/numbers';

definePageMeta({
  middleware: ['auth'],
  layout: false,
});

useHead({ title: 'Subscriptions' });

const columns = [{ name: 'user_id', title: 'User ID' }];

const dataList: Array<DataListItem> = [];
</script>

<template>
  <NuxtLayout name="default">
    <template #summary>
      <CommonSummaryHeading>Overview</CommonSummaryHeading>

      <CommonDataList :data="dataList" />
    </template>
    <div>
      <CommonPageHeading>
        <CommonHeading level="2">All Subscriptions</CommonHeading>
      </CommonPageHeading>

      <CommonDatatable
        url="/subscriptions"
        service="SUBSCRIPTIONS"
        :search-columns="columns"
      >
        <template #heading>
          <CommonDatatableTH>User</CommonDatatableTH>
          <CommonDatatableTH name="plan_id">Plan</CommonDatatableTH>
          <CommonDatatableTH name="amount">Amount</CommonDatatableTH>
          <CommonDatatableTH name="status">Status</CommonDatatableTH>
          <CommonDatatableTH name="start_date">Date Activated</CommonDatatableTH>
          <CommonDatatableTH name="next_savings_date">Next Savings Date</CommonDatatableTH>
        </template>
        <template #default="{ row }: { row: Subscription }">
          <CommonDatatableRow>
            <CommonDatatableTD>
              <span class="flex flex-col gap-1">
                <span>{{ row.user?.firstName }} {{ row.user?.lastName }}</span>
                <span class="text-xs opacity-50">{{ row.user_id }}</span>
              </span>
            </CommonDatatableTD>
            <CommonDatatableTD>{{ row.plan?.name }}</CommonDatatableTD>
            <CommonDatatableTD>
              {{ numberFormat(row.amount, 'currency') }}
            </CommonDatatableTD>
            <CommonDatatableTD>
              <CommonBadgeStatus :status="row.status" />
            </CommonDatatableTD>
            <CommonDatatableTD>
              {{ optional(row.start_date, [[dateTimeFormat, 'date:compact']]) }}
            </CommonDatatableTD>
            <CommonDatatableTD>
              {{
                optional(row.next_savings_date, [
                  [dateTimeFormat, 'date:compact'],
                ])
              }}
            </CommonDatatableTD>
          </CommonDatatableRow>
        </template>
      </CommonDatatable>
    </div>
  </NuxtLayout>
</template>
