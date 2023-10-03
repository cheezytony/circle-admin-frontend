<script lang="ts" setup>
import { User, Subscription, SubscriptionEx } from '~~/types';

const props = defineProps<{
  user: User;
}>();
useHead({
  title: () => `${props.user.firstName}'s Subscription`,
});

const subscription = ref<Subscription>();
const subscriptionAmount = computed(() => subscription.value?.amount);
const products = computed(() => {
  return (
    subscription.value?.products?.map((product) => ({
      ...product,
      amount: subscriptionAmount.value
        ? (product.percentage / 100) * subscriptionAmount.value
        : 0,
    })) ?? []
  );
});
</script>

<template>
  <div class="flex flex-col gap-4 md:gap-8">
    <ServerRequest
      service="SUBSCRIPTIONS"
      :url="`/subscriptions/user/${props.user.id}`"
      :authorize="true"
      :model="SubscriptionEx"
      @success="subscription = $event"
    >
      <template #default="{ data }">
        <div v-if="data" class="gap-4 grid grid-cols-1 md:grid-cols-2 md:gap-8">
          <Card>
            <CardHeading>Subscription Details</CardHeading>
            <DataList
              :data="[
                { title: 'Plan', value: data.plan?.name },
                { title: 'Amount', value: data.amount, type: 'currency' },
                { title: 'Frequency', value: data.frequency },
                {
                  title: 'Date Activated',
                  value: data.start_date,
                  type: 'date:compact:time',
                },
                {
                  title: 'Next Savings',
                  value: data.next_savings_date,
                  type: 'date:compact:time',
                },
                { title: 'Status', value: data.status },
                { title: 'Beneficiaries', value: data.beneficiary_count },
                { title: 'Auto Save', value: data.auto_save ? 'On' : 'Off' },
              ]"
              size="sm"
              displays="grid"
            />
          </Card>
          <Card>
            <CardHeading>Product Details</CardHeading>
            <template v-for="(product, index) in products" :key="product.service">
              <div class="">
                <div class="flex gap-8 items-center justify-between mb-4">
                  <div class="font-medium text-sm">{{ product.service }}</div>
                  <div class="text-sm">
                    {{ numberFormat(product.amount, 'currency') }}
                  </div>
                </div>
                <div class="flex gap-2">
                  <div
                    class="bg-black flex font-bold items-center px-2 rounded text-sm text-white"
                  >
                    {{ product.percentage }}%
                  </div>
                  <div class="bg-gray-200 h-8 overflow-hidden rounded w-full">
                    <div
                      class="bg-black h-full rounded"
                      :style="{ width: `${product.percentage}%` }"
                    />
                  </div>
                  <div
                    class="bg-gray-200 flex font-bold items-center px-2 rounded text-sm text-black"
                  >
                    100%
                  </div>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </template>

      <template #loading>
        <div class="gap-4 grid grid-cols-1 md:grid-cols-2 md:gap-8">
          <template v-for="_ in 2">
            <Card>
              <Skeleton class="h-4 w-32" />
  
              <template v-for="i in 5">
                <div>
                  <Skeleton class="h-4 mb-2 w-16" />
                  <Skeleton class="h-4 w-full" />
                </div>
                <hr v-if="i < 5">
              </template>
            </Card>
          </template>
        </div>
      </template>
    </ServerRequest>
  </div>
</template>
