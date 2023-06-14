<script lang="ts" setup>
import { Transaction } from "~~/types/models";
import { dateTimeFormat } from "~~/utils/filters/dates";
import { numberFormat } from "~~/utils/filters/numbers";
import { useApiRequest } from "~~/utils/hooks/api";

definePageMeta({
  layout: false,
  middleware: ["auth"],
});

const route = useRoute();
const savingsId = computed(() => route.params.id as string);
const {
  public: { savingsBaseUrl },
} = useRuntimeConfig();
const url = `${savingsBaseUrl}admin/saving-history`;
const type = computed(() => route.query.type as string);
const { data, isLoading, load } = useApiRequest<Transaction[]>({
  url,
  autoLoad: true,
  authorize: true,
  params: { savingsId: savingsId.value, type: type.value },
});

const fetchFilteredData = async (category: string) => {
  await load({
    params: { category, savingsId: savingsId.value, type: type.value },
  });
};

// Initialize filteredData with initial data
const filteredData = ref<Transaction[]>(data?.data?.data || []);

// Watch for changes in data and update filteredData accordingly
watch(data, (newValue) => {
  filteredData.value = newValue?.data?.data || [];
});

useHead({
  title: "Savings tranaction history",
});
</script>

<template>
  <div>
    <CommonPageHeading>
      <CommonHeading level="2">Savings History</CommonHeading>
    </CommonPageHeading>
    <div class="filter-button-container">
      <CommonButton @click="fetchFilteredData('DEPOSIT')" size="sm">
        <span>Deposits</span>
      </CommonButton>
      <CommonButton @click="fetchFilteredData('WITHDRAWAL')" size="sm">
        <span>Withdrawals</span>
      </CommonButton>
    </div>
    <CommonDatatable :data="filteredData" :paginatable="true">
      <template #heading>
        <CommonDatatableTH name="id">ID</CommonDatatableTH>

        <CommonDatatableTH name="amount">Amount</CommonDatatableTH>
        <CommonDatatableTH name="currency">Currency</CommonDatatableTH>
        <CommonDatatableTH name="feference">Reference</CommonDatatableTH>
        <CommonDatatableTH name="description">Description</CommonDatatableTH>
        <CommonDatatableTH name="category">Category</CommonDatatableTH>
        <CommonDatatableTH name="status">Status </CommonDatatableTH>
        <CommonDatatableTH name="created_at">Date </CommonDatatableTH>
      </template>
      <template #default="{ row }: { row: Transaction }">
        <CommonDatatableRow>
          <CommonDatatableTD>
            <div class="flex items-center gap-3">
              <span>{{ row?.id }} </span>
            </div>
          </CommonDatatableTD>
          <CommonDatatableTD>{{
            numberFormat(
              row.amount,
              "currency",
              row?.type == "DOLLAR" ? "USD" : "NGN"
            )
          }}</CommonDatatableTD>
          <CommonDatatableTD> {{ row.currency }}</CommonDatatableTD>
          <CommonDatatableTD> {{ row.reference }}</CommonDatatableTD>
          <CommonDatatableTD> {{ row.description }}</CommonDatatableTD>
          <CommonDatatableTD> {{ row.category }}</CommonDatatableTD>

          <CommonDatatableTD> {{ row.status }}</CommonDatatableTD>
          <CommonDatatableTD>
            {{
              dateTimeFormat(row.created_at, "date:compact")
            }}</CommonDatatableTD
          >
        </CommonDatatableRow>
      </template>
    </CommonDatatable>
  </div>
</template>

<style scoped>
.filter-button-container {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}
</style>
