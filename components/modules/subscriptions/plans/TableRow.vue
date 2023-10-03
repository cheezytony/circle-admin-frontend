<script lang="ts" setup>
import { SubscriptionPlan } from 'types';

const emit = defineEmits<{
  (e: 'delete', plan: SubscriptionPlan): void;
}>();
const props = defineProps<{
  plan: SubscriptionPlan;
}>();

const { isOpen, open, onClose } = useDisclosure();
onClose(() => emit('delete', props.plan));
</script>

<template>
  <DatatableRow :to="`/subscriptions/plans/${plan.id}/edit`">
    <DatatableTD>{{ plan.name }}</DatatableTD>
    <DatatableTD align="right">
      {{ numberFormat(plan.price, 'currency') }}
    </DatatableTD>
    <DatatableTD>
      <Progess :value="plan.insurance_percentage" class="w-16 md:w-32" />
    </DatatableTD>
    <DatatableTD>
      <Progess :value="plan.investment_percentage" class="mb-1 w-16 md:w-32" />
      <div class="text-[11px] text-gray-500">
        {{ optional(plan.investment_product_type, [[truncate, 15]]) }}
      </div>
    </DatatableTD>
    <DatatableTD>
      <Progess :value="plan.savings_percentage" class="mb-1 w-16 md:w-32" />
      <div class="text-[11px] text-gray-500">
        DOLLAR: {{ optional(plan.savings_dollar_percentage) }}%
      </div>
    </DatatableTD>
    <DatatableTD>
      <Progess :value="plan.stocks_percentage" class="mb-1 w-16 md:w-32" />
      <div class="text-[11px] text-gray-500">
        {{ optional(plan.stocks_portfolio_id, [[truncate, 15]]) }}
      </div>
    </DatatableTD>
    <DatatableDropdown>
      <DropdownItem :href="`/subscriptions/plans/${plan.id}/edit`">
        Edit
      </DropdownItem>
      <DropdownItem @click="open">Delete</DropdownItem>
    </DatatableDropdown>
  </DatatableRow>
  <SubscriptionsPlansDelete
    :plan="plan"
    v-model:is-open="isOpen"
  />
</template>
