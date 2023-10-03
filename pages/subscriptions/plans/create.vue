<script lang="ts" setup>
import { useDisclosure, useFormRequest } from '~/utils';
import { useForm } from 'vue3-form';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

definePageMeta({
  middleware: ['auth'],
});

useHead({
  title: 'Add a new subscription plan',
});

const router = useRouter();
const { isOpen, open, onClose } = useDisclosure();
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
const { submit } = useFormRequest(form, {
  authorize: true,
  url: '/plans',
  method: 'POST',
  service: 'SUBSCRIPTIONS',
  onSuccess: open,
});

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
  { title: 'Health', value: 'health' },
  { title: 'Job Loss', value: 'jobloss' },
  { title: 'Investment Life', value: 'investment_life' },
];
const savingsProductTypes = [{ title: 'None', value: '' }];

onClose(() => router.push('/subscriptions/plans'));
</script>

<template>
  <div class="max-w-[500px]">
    <Heading level="2" class="mb-8">
      Create a new subscription plan
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
      Plan Created Successfully
    </ModalSuccess>
  </div>
</template>
