<script lang="ts" setup>
import { useDisclosure, useFormRequest } from '~/utils';
import { useForm } from 'vue3-form';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { SubscriptionPlan } from 'types';

definePageMeta({
  middleware: ['auth'],
});

useHead({
  title: 'Add a new subscription plan',
});

const router = useRouter();
const route = useRoute();
const { id } = route.params;
const { isOpen, open } = useDisclosure();
const form = useForm({
  name: {},
  price: { rules: ['numbersOnly'] },
  insurance_percentage: {
    rules: ['numbersOnly', 'numberBetween:0,100'],
    value: 25,
  },
  investment_percentage: {
    rules: ['numbersOnly', 'numberBetween:0,100'],
    value: 25,
  },
  savings_percentage: {
    rules: ['numbersOnly', 'numberBetween:0,100'],
    value: 25,
  },
  stocks_percentage: {
    rules: ['numbersOnly', 'numberBetween:0,100'],
    value: 25,
  },
  stocks_portfolio_id: { rules: ['nullable'] },
  investment_product_type: { rules: ['nullable'] },
  savings_product_type: { rules: ['nullable'] },
});
const { data } = useApiRequest<SubscriptionPlan>({
  authorize: true,
  url: `/plans/${id}`,
  method: 'GET',
  service: 'SUBSCRIPTIONS',
  autoLoad: true,
});
const { submit } = useFormRequest(form, {
  authorize: true,
  url: `/plans/${id}`,
  method: 'PUT',
  service: 'SUBSCRIPTIONS',
  onSuccess: open,
});

const plan = computed(() => data.value?.data);
const totalPercentage = computed(() => {
  const insurance = Number(form.value.fields.insurance_percentage.value);
  const investment = Number(form.value.fields.investment_percentage.value);
  const savings = Number(form.value.fields.savings_percentage.value);
  const stocks = Number(form.value.fields.stocks_percentage.value);

  return insurance + investment + savings + stocks;
});

const isPercentageBalanced = computed(() => totalPercentage.value === 100);

const balancePercentage = () => {
  form.value.fields.insurance_percentage.value = 25;
  form.value.fields.investment_percentage.value = 25;
  form.value.fields.savings_percentage.value = 25;
  form.value.fields.stocks_percentage.value = 25;
};

const investmentProductTypes = [
  { title: 'None', value: '' },
  { title: 'Some investment product', value: 'SOME_INVESTENT_PRODUCT' },
  { title: 'Some other investment product', value: 'SOME_OTHER_INVESTMENT_PRODUCT' },
];
const savingsProductTypes = [
  { title: 'None', value: '' },
  { title: 'Flexi', value: 'FLEXI' },
  { title: 'Dollar', value: 'DOLLAR' },
];

const updateFormData = () => {
  if (!plan.value) return;
  form.value.fields.name.value = plan.value.name;
  form.value.fields.price.value = plan.value.price;
  form.value.fields.insurance_percentage.value =
    plan.value.insurance_percentage;
  form.value.fields.investment_percentage.value =
    plan.value.investment_percentage;
  form.value.fields.savings_percentage.value = plan.value.savings_percentage;
  form.value.fields.stocks_percentage.value = plan.value.stocks_percentage;
  form.value.fields.stocks_portfolio_id.value = plan.value.stocks_portfolio_id;
  form.value.fields.investment_product_type.value =
    plan.value.investment_product_type;
  form.value.fields.savings_product_type.value =
    plan.value.savings_product_type;
};
watch(() => plan.value, updateFormData, { immediate: true });
</script>

<template>
  <div class="max-w-[500px]">
    <Heading level="2" class="mb-8">
      Edit {{ plan?.name }} Plan
    </Heading>

    <Form @submit="submit">
      <div class="gap-x-8 grid grid-cols-2">
        <FormGroup
          v-model="form.fields.name.value"
          :form="form"
          name="name"
          id="name"
          label="Plan Name"
          placeholder="e.g. Gold"
        />
        <FormGroup
          v-model="form.fields.price.value"
          :form="form"
          type="currency"
          name="price"
          id="price"
          label="Price"
          placeholder="e.g. 50,000.00"
        />
        <FormGroup
          v-model="form.fields.stocks_portfolio_id.value"
          :form="form"
          name="stocks_portfolio_id"
          id="stocks_portfolio_id"
          label="Stocks Portfolio ID"
          placeholder="e.g. portfolio_121137dyf4e7j1vdc31"
        />
        <FormGroup
          v-model="form.fields.investment_product_type.value"
          :form="form"
          type="select"
          :options="investmentProductTypes"
          name="investment_product_type"
          id="investment_product_type"
          label="Investment Product Type"
          placeholder="e.g. 08012345678"
        />
        <FormGroup
          v-model="form.fields.savings_product_type.value"
          :form="form"
          type="select"
          :options="savingsProductTypes"
          name="savings_product_type"
          id="savings_product_type"
          label="Savings Product Type"
          placeholder="e.g. 08012345678"
        />
      </div>

      <div
        class="border gap-x-8 grid grid-cols-2 -mt-4 mb-4 -mx-4 p-4 rounded md:col-span-2"
        :class="[
          isPercentageBalanced ? 'border-transparent' : 'border-red-200',
        ]"
      >
        <FormGroup
          v-model="form.fields.insurance_percentage.value"
          :form="form"
          type="range"
          name="insurance_percentage"
          id="insurance_percentage"
          label="Insurance Percentage"
          :editable="true"
          class="mb-0"
        />
        <FormGroup
          v-model="form.fields.investment_percentage.value"
          :form="form"
          type="range"
          name="investment_percentage"
          id="investment_percentage"
          label="Investment Percentage"
          :editable="true"
        />
        <FormGroup
          v-model="form.fields.savings_percentage.value"
          :form="form"
          type="range"
          name="savings_percentage"
          id="savings_percentage"
          label="Savings Percentage"
          :editable="true"
        />
        <FormGroup
          v-model="form.fields.stocks_percentage.value"
          :form="form"
          type="range"
          name="stocks_percentage"
          id="stocks_percentage"
          label="Stocks Percentage"
          :editable="true"
        />

        <div class="flex gap-4 items-center justify-center md:col-span-2">
          <div class="flex gap-1 items-center">
            <span class="font-medium text-gray-400 text-xs">
              {{ totalPercentage }}%
            </span>
            <span
              :class="{
                'text-green-500': isPercentageBalanced,
                'text-red-500': !isPercentageBalanced,
              }"
            >
              <FontAwesomeIcon
                :icon="isPercentageBalanced ? 'circle-check' : 'circle-xmark'"
              />
            </span>
          </div>
          <Button
            color-scheme="black"
            left-icon="scale-balanced"
            size="sm"
            @click="balancePercentage"
          >
            Balance
          </Button>
        </div>
      </div>
      <div class="mb-8">
        <Message color-scheme="green" v-if="form.success">
          <span class="ml-1">{{ form.success }}</span>
        </Message>
        <Message color-scheme="red" v-else-if="form.error">
          <span class="ml-1">{{ form.error }}</span>
        </Message>
      </div>
      <ButtonSubmit color-scheme="black" :form="form">
        Submit
      </ButtonSubmit>
    </Form>
    <ModalSuccess v-model:is-open="isOpen">
      Plan Updated Successfully
    </ModalSuccess>
  </div>
</template>
