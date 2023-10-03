<script lang="ts" setup>
import { useDisclosure } from '~~/utils';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { SubscriptionPlan } from 'types';

const emit = defineEmits<{
  (e: 'delete', plan: SubscriptionPlan): void;
}>();
defineProps<{
  plan: SubscriptionPlan;
}>();

const { isOpen, open } = useDisclosure();
</script>

<script lang="ts">
export default {
  name: 'SubscriptionsPlansCard',
};
</script>

<template>
  <Card>
    <div>
      <CardHeading class="mb-2">
        {{ plan.name }}
      </CardHeading>
      <div class="flex gap-1">
        <span class="text-xl opacity-50">₦</span>
        <span class="text-4xl">
          {{ numberFormat(plan.price) }}
        </span>
      </div>
    </div>

    <div class="border-y border-gray-50 -mx-4 table-fixed md:-mx-8">
      <table class="text-sm w-full">
        <tbody>
          <tr class="even:bg-gray-50">
            <td
              class="pl-4 py-3 w-[20px] md:pl-8"
              :class="{
                'text-black': plan.insurance_percentage > 0,
                'text-red-500': plan.insurance_percentage === 0,
              }"
            >
              <FontAwesomeIcon
                :icon="
                  plan.insurance_percentage > 0
                    ? 'circle-check'
                    : 'circle-xmark'
                "
              />
            </td>
            <td class="px-2 py-3 whitespace-nowrap">Insurance Percentage</td>
            <td align="right" class="opacity-50 pr-4 py-3 md:pr-8">
              {{ plan.insurance_percentage }}%
            </td>
          </tr>
          <tr class="even:bg-gray-50">
            <td
              class="pl-4 py-3 w-[20px] md:pl-8"
              :class="{
                'text-black': plan.investment_percentage > 0,
                'text-red-500': plan.investment_percentage === 0,
              }"
            >
              <FontAwesomeIcon
                :icon="
                  plan.investment_percentage > 0
                    ? 'circle-check'
                    : 'circle-xmark'
                "
              />
            </td>
            <td class="px-2 py-3 whitespace-nowrap">Investment Percentage</td>
            <td align="right" class="opacity-50 pr-4 py-3 md:pr-8">
              {{ plan.insurance_percentage }}%
            </td>
          </tr>
          <tr class="even:bg-gray-50">
            <td
              class="pl-4 py-3 w-[20px] md:pl-8"
              :class="{
                'text-black': plan.savings_percentage > 0,
                'text-red-500': plan.savings_percentage === 0,
              }"
            >
              <FontAwesomeIcon
                :icon="
                  plan.savings_percentage > 0 ? 'circle-check' : 'circle-xmark'
                "
              />
            </td>
            <td class="px-2 py-3 whitespace-nowrap">Savings Percentage</td>
            <td align="right" class="opacity-50 pr-4 py-3 md:pr-8">
              {{ plan.insurance_percentage }}%
            </td>
          </tr>
          <tr class="even:bg-gray-50">
            <td
              class="pl-4 py-3 w-[20px] md:pl-8"
              :class="{
                'text-black': plan.stocks_percentage > 0,
                'text-red-500': plan.stocks_percentage === 0,
              }"
            >
              <FontAwesomeIcon
                :icon="
                  plan.stocks_percentage > 0 ? 'circle-check' : 'circle-xmark'
                "
              />
            </td>
            <td class="px-2 py-3 whitespace-nowrap">Stocks Percentage</td>
            <td align="right" class="opacity-50 pr-4 py-3 md:pr-8">
              {{ plan.insurance_percentage }}%
            </td>
          </tr>
          <tr class="even:bg-gray-50">
            <td
              class="pl-4 py-3 w-[20px] md:pl-8"
              :class="{
                'text-black':
                  plan.savings_dollar_percentage > 0 &&
                  plan.savings_percentage > 0,
                'text-red-500':
                  plan.savings_dollar_percentage === 0 ||
                  plan.savings_percentage === 0,
              }"
            >
              <FontAwesomeIcon
                :icon="
                  plan.savings_dollar_percentage > 0 &&
                  plan.savings_percentage > 0
                    ? 'circle-check'
                    : 'circle-xmark'
                "
              />
            </td>
            <td class="px-2 py-3 whitespace-nowrap">
              Savings Dollar Percentage
            </td>
            <td align="right" class="opacity-50 pr-4 py-3 md:pr-8">
              {{ plan.savings_dollar_percentage }}%
            </td>
          </tr>
          <tr class="even:bg-gray-50">
            <td
              class="pl-4 py-3 w-[20px] md:pl-8"
              :class="{
                'text-black': !!plan.investment_product_type,
                'text-red-500': !plan.investment_percentage,
              }"
            >
              <FontAwesomeIcon
                :icon="
                  plan.investment_percentage ? 'circle-check' : 'circle-xmark'
                "
              />
            </td>
            <td class="px-2 py-3 whitespace-nowrap">Investment Type</td>
            <td align="right" class="opacity-50 pr-4 py-3 md:pr-8">
              {{ optional(plan.investment_product_type, [[truncate, 10]]) }}
            </td>
          </tr>
          <tr class="even:bg-gray-50">
            <td
              class="pl-4 py-3 w-[20px] md:pl-8"
              :class="{
                'text-black': !!plan.savings_product_type,
                'text-red-500': !plan.savings_product_type,
              }"
            >
              <FontAwesomeIcon
                :icon="
                  plan.savings_product_type ? 'circle-check' : 'circle-xmark'
                "
              />
            </td>
            <td class="px-2 py-3 whitespace-nowrap">Savings Type</td>
            <td align="right" class="opacity-50 pr-4 py-3 md:pr-8">
              {{ optional(plan.savings_product_type) }}
            </td>
          </tr>
          <tr class="even:bg-gray-50">
            <td
              class="pl-4 py-3 w-[20px] md:pl-8"
              :class="{
                'text-black': plan.stocks_portfolio_id,
                'text-red-500': !plan.stocks_portfolio_id,
              }"
            >
              <FontAwesomeIcon
                :icon="
                  plan.stocks_portfolio_id ? 'circle-check' : 'circle-xmark'
                "
              />
            </td>
            <td class="px-2 py-3 whitespace-nowrap">Stocks Portfolio</td>
            <td align="right" class="opacity-50 pr-4 py-3 md:pr-8">
              {{ optional(plan.stocks_portfolio_id, [[truncate, 10]]) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex gap-4 items-center">
      <Button
        :href="`/subscriptions/plans/${plan.id}/edit`"
        left-icon="pen-to-square"
        size="sm"
      >
        Edit
      </Button>
      <Button
        color-scheme="purple:soft"
        left-icon="trash-can"
        size="sm"
        @click="open"
      >
        Delete
      </Button>
    </div>
    <SubscriptionsPlansDelete
      :plan="plan"
      v-model:is-open="isOpen"
      @success="emit('delete', plan)"
    />
  </Card>
</template>
