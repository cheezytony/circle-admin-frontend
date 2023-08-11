<script lang="ts" setup>
import { useForm } from 'vue3-form';
import { useCountries } from '../../../store/countries';
import { DatatableFilter, DatatableSearchColumn } from '~~/types/components';
import { User, Wallet, WalletTransaction } from '~~/types/models';
import { dateTimeFormat } from '~~/utils/filters/dates';
import { numberFormat } from '~~/utils/filters/numbers';
import { useApiRequest, useFormRequest } from '~~/utils/hooks/api';

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

const { data, isLoading, error } = useApiRequest<Array<Wallet>>({
  service: 'WALLET',
  url: `/wallets/${props.user.id}ss`,
  authorize: true,
  autoLoad: true,
});

const wallets = computed(() => data.value?.data || []);

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
  <div class="flex flex-col gap-4">
    <div
      v-if="isLoading"
      class="bg-gray-50 grid h-[100px] place-items-center rounded md:self-start md:w-[350px]"
    >
      <CommonLoaderSmall />
    </div>
    <div
      v-else-if="wallets.length"
      class="border border-gray-100 inline-block rounded md:self-start"
    >
      <table class="border-collapse table-fixed">
        <thead>
          <tr class="bg-gray-50">
            <th
              align="left"
              class="font-medium text-gray-500 text-sm pl-4 md:pl-8 pr-4 md:pr-8 py-2 md:w-[100px]"
            >
              Currency
            </th>
            <th
              align="right"
              class="font-medium text-gray-500 text-sm pl-4 md:pl-8 pr-4 md:pr-8 py-2 md:w-[250px]"
            >
              Balance
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(wallet, index) in wallets" :key="wallet.id">
            <tr>
              <td
                align="left"
                class="border-gray-100 border-r pl-4 md:pl-8 pr-4 md:pr-8 py-2"
                :class="{
                  'border-b': index < wallets.length - 1,
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
              </td>
              <td
                align="right"
                class="border-gray-100 pl-4 md:pl-8 pr-4 md:pr-8 py-2"
                :class="{
                  'border-b': index < wallets.length - 1,
                  'border-t': index > 0,
                }"
              >
                {{ numberFormat(wallet.balance, 'currency', wallet.currency) }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div v-else-if="error"></div>
    <div
      v-else
      class="bg-gray-50 flex flex-col gap-4 items-center px-4 py-8 rounded md:self-start md:w-[350px]"
    >
      <span class="text-gray-500 text-center">
        This user doesn't have any wallets at the moment.
      </span>
      <CommonDropdown>
        <CommonButton left-icon="plus" size="sm">Create Wallet</CommonButton>
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
      </CommonDropdown>
    </div>

    <CommonDatatable
      v-if="wallets.length"
      :url="`/transactions/${props.user.id}`"
      service="WALLET"
      :search-columns="columns"
      :column="column"
      order-by="created_at"
      :order-by-ascending="false"
    >
      <template #heading>
        <CommonDatatableTH align="right" name="amount">
          Amount
        </CommonDatatableTH>
        <CommonDatatableTH name="currency">Currency</CommonDatatableTH>
        <CommonDatatableTH name="reference">Reference</CommonDatatableTH>
        <CommonDatatableTH name="type">Type</CommonDatatableTH>
        <CommonDatatableTH name="status">Status</CommonDatatableTH>
        <CommonDatatableTH name="created_at">Date</CommonDatatableTH>
      </template>
      <template #default="{ row }: { row: WalletTransaction }">
        <CommonDatatableRow>
          <CommonDatatableTD align="right">
            <span
              :class="{
                'text-green-700': row.type === 'CREDIT',
                'text-red-700': row.type === 'DEBIT',
              }"
            >
              {{ numberFormat(row.amount, 'currency', row.currency) }}
            </span>
          </CommonDatatableTD>
          <CommonDatatableTD>{{ row.currency }}</CommonDatatableTD>
          <CommonDatatableTD>{{ row.reference }}</CommonDatatableTD>
          <CommonDatatableTD>{{ row.type }}</CommonDatatableTD>
          <CommonDatatableTD>
            <CommonBadgeStatus :status="row.status" />
          </CommonDatatableTD>
          <CommonDatatableTD>
            {{ dateTimeFormat(row.created_at, 'date:compact:time') }}
          </CommonDatatableTD>
        </CommonDatatableRow>
      </template>
    </CommonDatatable>
  </div>
</template>
