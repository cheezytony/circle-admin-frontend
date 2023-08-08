<script lang="ts" setup>
import { Saving } from '~~/types/models';
import { dateTimeFormat } from '~~/utils/filters/dates';
import { numberFormat } from '~~/utils/filters/numbers';

useHead({
  title: 'Goal Savings',
});

const columns = [
  { name: 'id', title: 'ID' },
  { name: 'user_id', title: 'User ID' },
  { name: 'name', title: 'Name' },
];
const column = ref('id');
</script>

<template>
  <div>
    <CommonPageHeading>
      <CommonHeading level="2">Goal Savings</CommonHeading>
    </CommonPageHeading>

    <CommonDatatable
      :url="`goals`"
      service="SAVINGS"
      :search-columns="columns"
      :column="column"
    >
      <template #heading>
        <CommonDatatableTH>User name </CommonDatatableTH>
        <CommonDatatableTH>Phone Number </CommonDatatableTH>
        <CommonDatatableTH>Savings ID</CommonDatatableTH>
        <CommonDatatableTH>Goal Details</CommonDatatableTH>
        <CommonDatatableTH>Name</CommonDatatableTH>
        <CommonDatatableTH>Target Amount </CommonDatatableTH>
        <CommonDatatableTH>Maturity Date</CommonDatatableTH>
        <CommonDatatableTH>Current Balance </CommonDatatableTH>
        <CommonDatatableTH>Accrued Interest</CommonDatatableTH>
        <CommonDatatableTH>Status </CommonDatatableTH>
        <CommonDatatableTH>Date Created</CommonDatatableTH>
      </template>
      <template #default="{ row }: { row: Saving }">
        <CommonDatatableRow :to="`/savings/history/${row.id}?type=GOAL`">
          <CommonDatatableTD>
            <span class="flex flex-col gap-1">
              <span>{{ row.user?.firstName }} {{ row.user?.lastName }}</span>
              <span class="text-xs opacity-50">{{ row.user_id }}</span>
            </span>
          </CommonDatatableTD>

          <CommonDatatableTD>
            {{ row.user.phoneNumber || 'N/A' }}
          </CommonDatatableTD>

          <CommonDatatableTD>{{ row.id }}</CommonDatatableTD>

          <CommonDatatableTD>{{ row.description }}</CommonDatatableTD>

          <CommonDatatableTD>{{ row.name }}</CommonDatatableTD>

          <CommonDatatableTD>
            {{ numberFormat(row.target_amount, 'currency') }}
          </CommonDatatableTD>

          <CommonDatatableTD>
            {{ dateTimeFormat(row.end_date, 'date:compact') }}
          </CommonDatatableTD>

          <CommonDatatableTD>
            {{ numberFormat(row.amount_saved, 'currency') }}
          </CommonDatatableTD>

          <CommonDatatableTD>
            {{ numberFormat(row.earnings, 'currency') }}
          </CommonDatatableTD>

          <CommonDatatableTD>{{ row.status }}</CommonDatatableTD>

          <CommonDatatableTD>
            {{ dateTimeFormat(row.created_at, 'date:compact') }}
          </CommonDatatableTD>
        </CommonDatatableRow>
      </template>
    </CommonDatatable>
  </div>
</template>
