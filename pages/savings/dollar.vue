<script lang="ts" setup>
import { DatatableItem } from '~/types';
import { Saving } from '~~/types/models';
import { dateTimeFormat } from '~~/utils/filters/dates';
import { numberFormat } from '~~/utils/filters/numbers';

useHead({
  title: 'Dollar Savings',
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
      <Heading level="2">Dollar Savings</Heading>
    </PageHeading>

    <Datatable
      :url="'savings/dollar'"
      service="SAVINGS"
      :search-columns="columns"
      :column="column"
    >
      <template #heading>
        <DatatableTH>User Name </DatatableTH>

        <DatatableTH>Phone Number </DatatableTH>

        <DatatableTH name="id">Savings ID</DatatableTH>

        <DatatableTH name="frequency">Frequency</DatatableTH>

        <DatatableTH name="amount_to_debit">
          Amount to Save
        </DatatableTH>

        <DatatableTH name="funding_source">
          Payment Method
        </DatatableTH>

        <DatatableTH name="total_earnings">
          Total Amount Accured Balance
        </DatatableTH>

        <DatatableTH name="total_earnings">
          Total Amount Saved
        </DatatableTH>

        <DatatableTH name="earnings">
          Total Interest Earned
        </DatatableTH>

        <DatatableTH name="status">Status</DatatableTH>

        <DatatableTH name="created_at">Date Created</DatatableTH>
      </template>
      <template #default="{ row }: DatatableItem<Saving>">
        <DatatableRow :to="`/savings/history/${row.id}?type=${'DOLLAR'}`">
          <DatatableTD>
            <span class="flex flex-col gap-1">
              <span>{{ row.user?.firstName }} {{ row.user?.lastName }}</span>
              <span class="text-xs opacity-50">{{ row.user_id }}</span>
            </span>
          </DatatableTD>

          <DatatableTD>
            {{ row.user?.phoneNumber || 'N/A' }}
          </DatatableTD>

          <DatatableTD>{{ row.id }}</DatatableTD>

          <DatatableTD>{{ row.frequency }}</DatatableTD>

          <DatatableTD>
            {{ numberFormat(row.amount_to_debit, 'currency', 'USD') }}
          </DatatableTD>

          <DatatableTD>{{ row.funding_source }}</DatatableTD>

          <DatatableTD>
            {{ numberFormat(row.total_earnings, 'currency', 'USD') }}
          </DatatableTD>

          <DatatableTD>
            {{ numberFormat(row.amount_saved, 'currency', 'USD') }}
          </DatatableTD>

          <DatatableTD>
            {{ numberFormat(row.earnings, 'currency', 'USD') }}
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
