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
        <CommonDatatableTH name="id">Savings ID</CommonDatatableTH>
        <CommonDatatableTH name="description">Goal Details</CommonDatatableTH>
        <CommonDatatableTH name="name">Name</CommonDatatableTH>
        <CommonDatatableTH name="target_amount">
          Target Amount
        </CommonDatatableTH>
        <CommonDatatableTH name="end_date">Maturity Date</CommonDatatableTH>
        <CommonDatatableTH name="amount_saved">
          Current Balance
        </CommonDatatableTH>
        <CommonDatatableTH name="earnings">Accrued Interest</CommonDatatableTH>
        <CommonDatatableTH name="status">Status </CommonDatatableTH>
        <CommonDatatableTH name="created_at">Date Created</CommonDatatableTH>
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
