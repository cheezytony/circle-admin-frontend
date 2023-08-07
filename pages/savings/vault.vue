<script lang="ts" setup>
import { Saving } from '~~/types/models';
import { dateTimeFormat } from '~~/utils/filters/dates';
import { numberFormat } from '~~/utils/filters/numbers';
import { useApiRequest } from '~~/utils/hooks/api';

useHead({
  title: 'Vault Savings',
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
      <CommonHeading level="2">Vault Savings</CommonHeading>
    </CommonPageHeading>

    <CommonDatatable
      :url="`vault`"
      service="SAVINGS"
      :search-columns="columns"
      :column="column"
    >
      <template #heading>
        <CommonDatatableTH name="id"> Id </CommonDatatableTH>
        <CommonDatatableTH name="user.firstName"> User Name </CommonDatatableTH>

        <CommonDatatableTH name="user_id">User ID</CommonDatatableTH>

        <CommonDatatableTH name="user.phoneNo">
          Phone Number
        </CommonDatatableTH>

        <CommonDatatableTH name="id">Savings ID</CommonDatatableTH>

        <CommonDatatableTH name="funding_source">
          Payment Method
        </CommonDatatableTH>
        <CommonDatatableTH name="start_date">Start Date</CommonDatatableTH>
        <CommonDatatableTH name="end_date">End Date</CommonDatatableTH>
        <CommonDatatableTH name="amount_saved">Amount Saved</CommonDatatableTH>
        <CommonDatatableTH name="earnings">Total Interest</CommonDatatableTH>
        <CommonDatatableTH name="earnings_withdrawn">
          Interest Withdrawal Status
        </CommonDatatableTH>
        <CommonDatatableTH name="status">Status </CommonDatatableTH>
        <CommonDatatableTH name="created_at">Date Created</CommonDatatableTH>
      </template>
      <template #default="{ row }: { row: Saving }">
        <CommonDatatableRow :to="`/savings/history/${row.id}?type=${'VAULT'}`">
          <CommonDatatableTD>
            {{ row.id }}
          </CommonDatatableTD>
          <CommonDatatableTD>
            <div class="flex items-center gap-3">
              <span>
                {{ row.user.firstName }}
                {{ row.user.lastName }}
              </span>
            </div>
          </CommonDatatableTD>
          <CommonDatatableTD>{{ row.user_id }}</CommonDatatableTD>
          <CommonDatatableTD>
            {{ row.user?.phoneNumber || 'N/A' }}
          </CommonDatatableTD>
          <CommonDatatableTD>{{ row.id }}</CommonDatatableTD>
          <CommonDatatableTD>{{ row.funding_source }}</CommonDatatableTD>
          <CommonDatatableTD>
            {{ dateTimeFormat(row.created_at, 'date:compact') }}
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
          <CommonDatatableTD>
            {{ row.earnings_withdrawn === null ? 'Pending' : 'Withdrawn' }}
          </CommonDatatableTD>
          <CommonDatatableTD> {{ row.status }}</CommonDatatableTD>
          <CommonDatatableTD>
            {{ dateTimeFormat(row.created_at, 'date:compact') }}
          </CommonDatatableTD>
        </CommonDatatableRow>
      </template>
    </CommonDatatable>
  </div>
</template>
