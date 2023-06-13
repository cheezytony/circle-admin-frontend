<script lang="ts" setup>
import { ComputedRef } from "vue";
import { SavingGoalMember, Transaction, User } from "~~/types/models";
import { dateTimeFormat } from "~~/utils/filters/dates";
import { numberFormat } from "~~/utils/filters/numbers";
import { useApiRequest } from "~~/utils/hooks/api";

definePageMeta({
  layout: false,
  middleware: ["auth"],
});

const route = useRoute();
const savingsId = computed(() => route.params.id as string);
// const url = computed(() => `http://127.0.0.1:4000/admin/saving-history`, {
//   savingsId,
// });

// const { data, isLoading } = useApiRequest<User>({
//   url: url as ComputedRef<string> & string,
//   autoLoad: true,
//   authorize: true,
// });

useHead({
  title: "Group savings",
});
</script>

<template>
  <div>
    <CommonPageHeading>
      <CommonHeading level="2">Savings History</CommonHeading>
    </CommonPageHeading>
    <CommonDatatable :data="data?.data?.saving?.saving_goal_members">
      <template #heading>
        <CommonDatatableTH name="id">ID</CommonDatatableTH>

        <CommonDatatableTH name="amount">Amount</CommonDatatableTH>
        <CommonDatatableTH name="currency">Currency</CommonDatatableTH>
        <CommonDatatableTH name="feference">Reference</CommonDatatableTH>
        <CommonDatatableTH name="description">Description</CommonDatatableTH>
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
          <CommonDatatableTD>
            {{ numberFormat(row.reference) }}</CommonDatatableTD
          >
          <CommonDatatableTD>
            {{ numberFormat(row.description) }}</CommonDatatableTD
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
