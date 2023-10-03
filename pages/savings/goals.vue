<script lang="ts" setup>
import { DatatableItem } from '~/types';
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
    <PageHeading>
      <Heading level="2">Goal Savings</Heading>
    </PageHeading>

    <Datatable
      :url="`savings/goals`"
      service="SAVINGS"
      :search-columns="columns"
      :column="column"
    >
      <template #heading>
        <DatatableTH>User name </DatatableTH>
        <DatatableTH>Phone Number </DatatableTH>
        <DatatableTH name="id">Savings ID</DatatableTH>
        <DatatableTH name="description">Goal Details</DatatableTH>
        <DatatableTH name="name">Name</DatatableTH>
        <DatatableTH name="target_amount">
          Target Amount
        </DatatableTH>
        <DatatableTH name="end_date">Maturity Date</DatatableTH>
        <DatatableTH name="amount_saved">
          Current Balance
        </DatatableTH>
        <DatatableTH name="earnings">Accrued Interest</DatatableTH>
        <DatatableTH name="status">Status </DatatableTH>
        <DatatableTH name="created_at">Date Created</DatatableTH>
      </template>
      <template #default="{ row }: DatatableItem<Saving>">
        <DatatableRow :to="`/savings/history/${row.id}?type=GOAL`">
          <DatatableTD>
            <span class="flex flex-col gap-1">
              <span>{{ row.user?.firstName }} {{ row.user?.lastName }}</span>
              <span class="text-xs opacity-50">{{ row.user_id }}</span>
            </span>
          </DatatableTD>

          <DatatableTD>
            {{ row.user.phoneNumber || 'N/A' }}
          </DatatableTD>

          <DatatableTD>{{ row.id }}</DatatableTD>

          <DatatableTD>{{ row.description }}</DatatableTD>

          <DatatableTD>{{ row.name }}</DatatableTD>

          <DatatableTD>
            {{ numberFormat(row.target_amount, 'currency') }}
          </DatatableTD>

          <DatatableTD>
            {{ dateTimeFormat(row.end_date, 'date:compact') }}
          </DatatableTD>

          <DatatableTD>
            {{ numberFormat(row.amount_saved, 'currency') }}
          </DatatableTD>

          <DatatableTD>
            {{ numberFormat(row.earnings, 'currency') }}
          </DatatableTD>

          <DatatableTD>{{ row.status }}</DatatableTD>

          <DatatableTD>
            {{ dateTimeFormat(row.created_at, 'date:compact') }}
          </DatatableTD>
        </DatatableRow>
      </template>
    </Datatable>
  </div>
</template>
