<script lang="ts" setup>
import { Saving } from '~~/types/models';
import { dateTimeFormat } from '~~/utils/filters/dates';
import { numberFormat } from '~~/utils/filters/numbers';

useHead({
  title: 'Private Goal Savings',
});

const columns = [
  { name: 'id', title: 'User ID' },
  { name: 'first_name', title: 'First Name' },
  { name: 'last_name', title: 'Last Name' },
  { name: 'email', title: 'Email Address' },
  { name: 'phone', title: 'Phone Number' },
];
const {
  public: { savingsBaseUrl },
} = useRuntimeConfig();
const column = ref('id');
</script>

<template>
  <div>
    <CommonPageHeading>
      <CommonHeading level="2">Private Goal Savings</CommonHeading>
    </CommonPageHeading>

    <CommonDatatable
      :url="'/admin/goals?challenge_type=PRIVATE'"
      :base-url="savingsBaseUrl"
      :search-columns="columns"
      :column="column"
    >
      <template #heading>
        <CommonDatatableTH name="id">Group ID</CommonDatatableTH>

        <CommonDatatableTH name="name">Name</CommonDatatableTH>

        <CommonDatatableTH name="saving_goal_members">
          Members
        </CommonDatatableTH>

        <CommonDatatableTH name="target_amount">
          Target Amount
        </CommonDatatableTH>

        <CommonDatatableTH name="end_date">Maturity Date</CommonDatatableTH>
      </template>

      <template #default="{ row }: { row: Saving }">
        <CommonDatatableRow :to="`/savings/group-savings/${row.id}`">
          <CommonDatatableTD>{{ row.id }}</CommonDatatableTD>

          <CommonDatatableTD>{{ row.name }}</CommonDatatableTD>

          <CommonDatatableTD>
            {{ row.saving_goal_members.length }}
          </CommonDatatableTD>

          <CommonDatatableTD>
            {{ numberFormat(row.target_amount, 'currency') }}
          </CommonDatatableTD>

          <CommonDatatableTD>
            {{ dateTimeFormat(row.end_date, 'date:compact') }}
          </CommonDatatableTD>
        </CommonDatatableRow>
      </template>
    </CommonDatatable>
  </div>
</template>
