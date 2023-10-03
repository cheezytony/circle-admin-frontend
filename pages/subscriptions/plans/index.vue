<script lang="ts" setup>
import { SubscriptionPlan, SubscriptionPlanEx } from '~~/types';
import { numberFormat } from '~~/utils';

definePageMeta({
  middleware: ['auth'],
  layout: false,
});
useHead({ title: 'Subscription Plans' });

const columns = [{ name: 'name', title: 'Name' }];
const display = ref<'grid' | 'list'>('list');
</script>

<template>
  <div>
    <ServerRequest
      v-if="display === 'grid'"
      url="/plans"
      service="SUBSCRIPTIONS"
      :authorize="true"
      :model="[SubscriptionPlanEx]"
    >
      <template #default="{ data: plans, load }">
        <div
          class="gap-4 grid grid-cols-1 mb-8 @md:gap-8 @3xl:grid-cols-2 @5xl:grid-cols-3"
        >
          <template v-for="plan in plans" :key="plan.id">
            <SubscriptionsPlansCard
              class="max-w-lg"
              :plan="plan"
              @delete="() => load()"
            />
          </template>
        </div>
      </template>
      <template #loading>
        <div
          class="gap-4 grid grid-cols-1 mb-8 @md:gap-8 @md:grid-cols-2 @5xl:grid-cols-3"
        >
          <template v-for="_ in 6" :key="_">
            <Card>
              <div>
                <Skeleton class="h-3 mb-2 w-16" />
                <Skeleton class="h-8 w-40" />
              </div>

              <div class="border-y border-gray-50 -mx-4 table-fixed md:-mx-8">
                <TableLoader
                  class="table-fixed w-full"
                  :thead="false"
                  :cols="3"
                  :rows="4"
                />
              </div>

              <div class="flex gap-4 items-center">
                <Skeleton class="h-11 rounded w-20" />
                <Skeleton class="h-11 rounded w-20" />
              </div>
            </Card>
          </template>
        </div>
      </template>
    </ServerRequest>

    <Datatable
      v-else-if="display === 'list'"
      url="/plans"
      service="SUBSCRIPTIONS"
      :search-columns="columns"
      :model="SubscriptionPlanEx"
    >
      <template #heading>
        <DatatableTH name="name">Name</DatatableTH>
        <DatatableTH align="right" name="amount">Amount</DatatableTH>
        <DatatableTH name="insurance_percentage">Insurance</DatatableTH>
        <DatatableTH name="investment_percentage">Investment</DatatableTH>
        <DatatableTH name="savings_percentage">Savings</DatatableTH>
        <DatatableTH name="stocks_percentage">Stocks</DatatableTH>
        <DatatableTH />
      </template>
      <template #default="{ row, loadFromServer }">
        <SubscriptionsPlansTableRow :plan="row" @delete="loadFromServer" />
      </template>
    </Datatable>
  </div>
</template>
