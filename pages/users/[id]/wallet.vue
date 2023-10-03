<script lang="ts" setup>
import { useForm } from 'vue3-form';
import { useCountries } from '~/store/countries';
import { DatatableSearchColumn, User, Wallet, WalletEx, WalletTransaction, WalletTransactionEx } from '~~/types';
import { dateTimeFormat, numberFormat, useFormRequest } from '~~/utils';

const props = defineProps<{
  user: User;
}>();
useHead({
  title: () => `${props.user.firstName}'s Wallet`,
});

const { findCountryByCode } = useCountries();

const currencyFlagMap = computed(() => ({
  USD: findCountryByCode('US')?.flag?.emoji,
  NGN: findCountryByCode('NG')?.flag?.emoji,
}));

const columns: DatatableSearchColumn[] = [
  { title: 'Reference', name: 'reference' },
  { title: 'User ID', name: 'user_id' },
  { title: 'Amount', name: 'amount' },
  { title: 'Currency', name: 'currency' },
  { title: 'Status', name: 'status' },
  { title: 'Date Created', name: 'created_at' },
];
const column = ref('reference');

const form = useForm({
  first_name: {},
  last_name: {},
  email: { rules: ['required', 'email'] },
  phone: { rules: ['required', 'phone'] },
});
const { submit } = useFormRequest(form, {
  authorize: true,
  url: `/wallets/${props.user.id}`,
  service: 'WALLET',
  method: 'POST',
});
</script>

<template>
  <div class="flex flex-col gap-4 md:gap-8">
    <ServerRequest
      service="WALLET"
      :url="`/wallets/${props.user.id}`"
      :authorize="true"
      :model="[WalletEx]"
    >
      <template #default="{ data }">
        <div v-if="data" class="border border-gray-100 inline-block rounded md:self-start">
          <table class="border-collapse table-fixed">
            <thead>
              <TableRow>
                <TableTH align="left" class="md:w-[100px]">
                  Currency
                </TableTH>
                <TableTH align="right" class="md:w-[250px]">
                  Balance
                </TableTH>
              </TableRow>
            </thead>
            <tbody>
              <template v-for="(wallet, index) in data" :key="wallet.id">
                <TableRow>
                  <TableTD
                    align="left"
                    class="border-r border-gray-100"
                    :class="{
                      'border-b': index < data.length - 1,
                      'border-t': index > 0,
                    }"
                  >
                    <div class="flex gap-2">
                      <span
                        v-if="currencyFlagMap[wallet.currency]"
                        v-html="currencyFlagMap[wallet.currency]"
                      />
                      <span>{{ wallet.currency }}</span>
                    </div>
                  </TableTD>
                  <TableTD
                    align="right"
                    class="border-gray-100"
                    :class="{
                      'border-b': index < data.length - 1,
                      'border-t': index > 0,
                    }"
                  >
                    {{
                      numberFormat(wallet.balance, 'currency', wallet.currency)
                    }}
                  </TableTD>
                </TableRow>
              </template>
            </tbody>
          </table>
        </div>
      </template>

      <template #empty>
        <div
          class="bg-gray-50 flex flex-col gap-4 items-center px-4 py-8 rounded md:self-start md:w-[350px]"
        >
          <span class="text-gray-500 text-center">
            This user doesn't have any wallets at the moment.
          </span>
          <Dropdown>
            <Button left-icon="plus" size="sm">
              Create Wallet
            </Button>
            <template #items>
              <ul class="flex flex-col">
                <li>
                  <button
                    class="flex gap-3 items-center px-4 py-2 whitespace-nowrap w-full hover:bg-gray-100"
                    type="button"
                    size="sm"
                  >
                    <span v-html="currencyFlagMap.NGN" />
                    <span class="text-sm">Naira Wallet</span>
                  </button>
                </li>
                <li>
                  <button
                    class="flex gap-3 items-center px-4 py-2 whitespace-nowrap w-full hover:bg-gray-100"
                    type="button"
                    size="sm"
                  >
                    <span v-html="currencyFlagMap.USD" />
                    <span class="text-sm">Dollar Wallet</span>
                  </button>
                </li>
              </ul>
            </template>
          </Dropdown>
        </div>
      </template>

      <template #loading>
        <Card class="md:self-start md:w-[350px]" remove-padding>
          <TableLoader :cols="2" :rows="2" td="h-3 w-24" />
        </Card>
      </template>
    </ServerRequest>

    <Datatable
      :url="`/transactions/${props.user.id}`"
      service="WALLET"
      :search-columns="columns"
      :column="column"
      order-by="created_at"
      :order-by-ascending="false"
      :model="WalletTransactionEx"
    >
      <template #heading>
        <DatatableTH align="right" name="amount">
          Amount
        </DatatableTH>
        <DatatableTH name="currency">Currency</DatatableTH>
        <DatatableTH name="reference">Reference</DatatableTH>
        <DatatableTH name="type">Type</DatatableTH>
        <DatatableTH name="status">Status</DatatableTH>
        <DatatableTH name="created_at">Date</DatatableTH>
      </template>
      <template #default="{ row }">
        <DatatableRow>
          <DatatableTD align="right">
            <span
              :class="{
                'text-green-700': row.type === 'CREDIT',
                'text-red-700': row.type === 'DEBIT',
              }"
            >
              {{ numberFormat(row.amount, 'currency', row.currency) }}
            </span>
          </DatatableTD>
          <DatatableTD>{{ row.currency }}</DatatableTD>
          <DatatableTD>{{ row.reference }}</DatatableTD>
          <DatatableTD>{{ row.type }}</DatatableTD>
          <DatatableTD>
            <BadgeStatus :status="row.status" />
          </DatatableTD>
          <DatatableTD>
            {{ dateTimeFormat(row.created_at, 'date:compact:time') }}
          </DatatableTD>
        </DatatableRow>
      </template>
    </Datatable>
  </div>
</template>
