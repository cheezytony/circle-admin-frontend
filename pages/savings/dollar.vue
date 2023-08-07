<script lang="ts" setup>
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
    <CommonPageHeading>
      <CommonHeading level="2">Dollar Savings</CommonHeading>
    </CommonPageHeading>

    <CommonDatatable
      :url="'dollar'"
      service="SAVINGS"
      :search-columns="columns"
      :column="column"
    >
      <template #heading>
        <CommonDatatableTH name="user.firstName">
          User Name
        </CommonDatatableTH>

        <CommonDatatableTH name="user_id">User ID</CommonDatatableTH>

        <CommonDatatableTH name="user.phoneNo">
          Phone Number
        </CommonDatatableTH>

        <CommonDatatableTH name="id">Savings ID</CommonDatatableTH>

        <CommonDatatableTH name="frequency">Frequency</CommonDatatableTH>

        <CommonDatatableTH name="amount_to_debit">
          Amount to Save
        </CommonDatatableTH>

        <CommonDatatableTH name="funding_source">
          Payment Method
        </CommonDatatableTH>

        <CommonDatatableTH name="total_earnings">
          Total Amount Accured Balance
        </CommonDatatableTH>

        <CommonDatatableTH name="total_earnings">
          Total Amount Saved
        </CommonDatatableTH>

        <CommonDatatableTH name="earnings">
          Total Interest Earned
        </CommonDatatableTH>

        <CommonDatatableTH name="status">Status</CommonDatatableTH>

        <CommonDatatableTH name="created_at">Date Created</CommonDatatableTH>
      </template>
      <template #default="{ row }: { row: Saving }">
        <CommonDatatableRow :to="`/savings/history/${row.id}?type=${'DOLLAR'}`">
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

          <CommonDatatableTD>{{ row.frequency }}</CommonDatatableTD>

          <CommonDatatableTD>
            {{ numberFormat(row.amount_to_debit, 'currency', 'USD') }}
          </CommonDatatableTD>

          <CommonDatatableTD>{{ row.funding_source }}</CommonDatatableTD>

          <CommonDatatableTD>
            {{ numberFormat(row.total_earnings, 'currency', 'USD') }}
          </CommonDatatableTD>

          <CommonDatatableTD>
            {{ numberFormat(row.amount_saved, 'currency', 'USD') }}
          </CommonDatatableTD>

          <CommonDatatableTD>
            {{ numberFormat(row.earnings, 'currency', 'USD') }}
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
