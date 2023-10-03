<script lang="ts" setup>
import { DatatableItem } from '~/types';
import { Saving } from '~~/types/models';
import { dateTimeFormat } from '~~/utils/filters/dates';
import { numberFormat } from '~~/utils/filters/numbers';

useHead({
  title: 'Group Savings',
});

const columns = [
  { name: 'id', title: 'User ID' },
  { name: 'first_name', title: 'First Name' },
  { name: 'last_name', title: 'Last Name' },
  { name: 'email', title: 'Email Address' },
  { name: 'phone', title: 'Phone Number' },
];

const column = ref('id');
</script>

<template>
  <div>
    <PageHeading>
      <Heading level="2"> Group Savings</Heading>
    </PageHeading>

    <Datatable
      :url="'savings/group-savings'"
      service="SAVINGS"
      :search-columns="columns"
      :column="column"
    >
      <template #heading>
        <DatatableTH name="id">Group ID</DatatableTH>
        <DatatableTH name="name">Name</DatatableTH>
        <DatatableTH name="saving_goal_members">
          Members
        </DatatableTH>
        <DatatableTH name="target_amount">
          Target Amount
        </DatatableTH>
        <DatatableTH name="end_date">Maturity Date</DatatableTH>
      </template>

      <template #default="{ row }: DatatableItem<Saving>">
        <DatatableRow :to="`/savings/group-savings/${row.id}`">
          <DatatableTD>{{ row.id }}</DatatableTD>

          <DatatableTD>{{ row.name }}</DatatableTD>

          <DatatableTD>
            {{ row.saving_goal_members.length }}
          </DatatableTD>

          <DatatableTD>
            {{ numberFormat(row.target_amount, 'currency') }}
          </DatatableTD>

          <DatatableTD>
            {{ dateTimeFormat(row.end_date, 'date:compact') }}
          </DatatableTD>
        </DatatableRow>
      </template>
    </Datatable>
  </div>
</template>
