<script lang="ts" setup>
import { DataListItem } from '~~/types/components';
import { Subscription, SubscriptionEx } from '~~/types/models';
import { dateTimeFormat } from '~~/utils/filters/dates';
import { numberFormat } from '~~/utils/filters/numbers';

definePageMeta({
  middleware: ['auth'],
  layout: false,
});

useHead({ title: 'Subscriptions' });

const columns = [{ name: 'user_id', title: 'User ID' }];
</script>

<template>
  <div>
    <Datatable
      url="/subscriptions"
      service="SUBSCRIPTIONS"
      :search-columns="columns"
      :model="SubscriptionEx"
    >
      <template #heading>
        <DatatableTH>User</DatatableTH>
        <DatatableTH name="plan_id">Plan</DatatableTH>
        <DatatableTH align="right" name="amount">
          Amount
        </DatatableTH>
        <DatatableTH name="status">Status</DatatableTH>
        <DatatableTH name="start_date">Date Activated</DatatableTH>
        <DatatableTH name="next_savings_date">
          Next Savings Date
        </DatatableTH>
      </template>
      <template #default="{ row }">
        <DatatableRow :to="`/users/${row.user_id}/subscriptions`">
          <DatatableTD>
            <span class="flex flex-col gap-1">
              <span>{{ row.user?.firstName }} {{ row.user?.lastName }}</span>
              <span class="text-xs opacity-50">{{ row.user_id }}</span>
            </span>
          </DatatableTD>
          <DatatableTD>{{ row.plan?.name }}</DatatableTD>
          <DatatableTD align="right">
            {{ numberFormat(row.amount, 'currency') }}
          </DatatableTD>
          <DatatableTD>
            <BadgeStatus :status="row.status" />
          </DatatableTD>
          <DatatableTD>
            {{ optional(row.start_date, [[dateTimeFormat, 'date:compact']]) }}
          </DatatableTD>
          <DatatableTD>
            {{
              optional(row.next_savings_date, [
                [dateTimeFormat, 'date:compact'],
              ])
            }}
          </DatatableTD>
        </DatatableRow>
      </template>
    </Datatable>
  </div>
</template>
