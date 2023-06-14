<script lang="ts" setup>
import { LoanRepayments } from "~~/types/models";
import { dateTimeFormat } from "~~/utils/filters/dates";
import { numberFormat } from "~~/utils/filters/numbers";
import { useApiRequest } from "~~/utils/hooks/api";

definePageMeta({
  layout: false,
  middleware: ["auth"],
});

const route = useRoute();
const loanId = computed(() => route.params.id as string);
const {
  public: { loanBaseUrl },
} = useRuntimeConfig();
const url = `${loanBaseUrl}admin/loans/users`;

const { data, isLoading } = useApiRequest<LoanRepayments[]>({
  url,
  autoLoad: true,
  authorize: true,
});

useHead({
  title: "Loan Details",
});
</script>

<template>
  <div>
    <CommonPageHeading>
      <CommonHeading level="2">Loan History</CommonHeading>
    </CommonPageHeading>
    <CommonDatatable :data="data?.data?.data">
      <template #heading>
        <CommonDatatableTH name="id">ID</CommonDatatableTH>

        <CommonDatatableTH name="loan_id">loan Id</CommonDatatableTH>
        <CommonDatatableTH name="user_id">User ID</CommonDatatableTH>
        <CommonDatatableTH name="amount">Amount</CommonDatatableTH>
        <CommonDatatableTH name="overdue_fee">Over Due Fee</CommonDatatableTH>
        <CommonDatatableTH name="due_date">Due Date </CommonDatatableTH>
        <CommonDatatableTH name="status">Status </CommonDatatableTH>
        <CommonDatatableTH name="created_at">Date </CommonDatatableTH>
      </template>
      <template #default="{ row }: { row: LoanRepayments }">
        <CommonDatatableRow>
          <CommonDatatableTD>
            <div class="flex items-center gap-3">
              <span>{{ row?.id }} </span>
            </div>
          </CommonDatatableTD>
          <CommonDatatableTD>
            <div class="flex items-center gap-3">
              <span>{{ row?.loan_id }} </span>
            </div>
          </CommonDatatableTD>
          <CommonDatatableTD>
            <div class="flex items-center gap-3">
              <span>{{ row?.user_id }} </span>
            </div>
          </CommonDatatableTD>
          <CommonDatatableTD>{{
            numberFormat(row.amount, "currency")
          }}</CommonDatatableTD>
          <CommonDatatableTD>{{
            numberFormat(row.overdue_fee, "currency")
          }}</CommonDatatableTD>
          <CommonDatatableTD>
            {{
              dateTimeFormat(row.due_date, "date:compact")
            }}</CommonDatatableTD
          >

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
