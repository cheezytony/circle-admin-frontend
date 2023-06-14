<script lang="ts" setup>
import { Saving } from "~~/types/models";
import { dateTimeFormat } from "~~/utils/filters/dates";
import { numberFormat } from "~~/utils/filters/numbers";
import { useApiRequest } from "~~/utils/hooks/api";

useHead({
  title: "Goal Savings",
});

const columns = [
  { name: "id", title: "User ID" },
  { name: "first_name", title: "First Name" },
  { name: "last_name", title: "Last Name" },
  { name: "email", title: "Email Address" },
  { name: "phone", title: "Phone Number" },
];
const {
  public: { savingsBaseUrl },
} = useRuntimeConfig();
const column = ref("id");
const { data } = useApiRequest<Array<Saving[]>>({
  url: `${savingsBaseUrl}admin/goals?challenge_type=PERSONAL`,
  authorize: true,
  autoLoad: true,
});
</script>

<template>
  <div>
    <CommonPageHeading>
      <CommonHeading level="2">Goal Savings</CommonHeading>
    </CommonPageHeading>

    <CommonDatatable
      :data="data?.data?.data"
      :search-columns="columns"
      :column="column"
    >
      <template #heading>
        <CommonDatatableTH name="saving_extra_details.firstName"
          >User Name</CommonDatatableTH
        >
        <CommonDatatableTH name="user_id">User ID</CommonDatatableTH>
        <CommonDatatableTH name="saving_extra_details.phoneNo"
          >Phone Number</CommonDatatableTH
        >
        <CommonDatatableTH name="id">Savings ID</CommonDatatableTH>
        <CommonDatatableTH name="description">Goal Details</CommonDatatableTH>
        <CommonDatatableTH name="name">Name</CommonDatatableTH>
        <CommonDatatableTH name="target_amount"
          >Target Amount</CommonDatatableTH
        >
        <CommonDatatableTH name="end_date">Maturity Date</CommonDatatableTH>
        <CommonDatatableTH name="amount_saved"
          >Current Balance</CommonDatatableTH
        >
        <CommonDatatableTH name="earnings">Accrued Interest</CommonDatatableTH>

        <CommonDatatableTH name="status">Status </CommonDatatableTH>

        <CommonDatatableTH name="created_at">Date Created</CommonDatatableTH>
      </template>
      <template #default="{ row }: { row: Saving }">
        <CommonDatatableRow
          :to="`/savings/history/${
            row.saving_goal_members[0].id
          }?type=${'GOAL'}`"
        >
          <CommonDatatableTD>
            <div class="flex items-center gap-3">
              <span
                >{{ row?.saving_extra_details?.first_name }}
                {{ row?.saving_extra_details?.last_name }}</span
              >
            </div>
          </CommonDatatableTD>
          <CommonDatatableTD>{{ row.user_id }}</CommonDatatableTD>
          <CommonDatatableTD>{{
            row.saving_extra_details?.phone || "N/A"
          }}</CommonDatatableTD>
          <CommonDatatableTD>{{ row.id }}</CommonDatatableTD>
          <CommonDatatableTD>{{ row.description }}</CommonDatatableTD>
          <CommonDatatableTD>{{ row.name }}</CommonDatatableTD>
          <CommonDatatableTD>{{
            numberFormat(row.target_amount, "currency")
          }}</CommonDatatableTD>
          <CommonDatatableTD>{{
            dateTimeFormat(row.end_date, "date:compact")
          }}</CommonDatatableTD>
          <CommonDatatableTD>{{
            numberFormat(row.amount_saved, "currency")
          }}</CommonDatatableTD>
          <CommonDatatableTD>{{
            numberFormat(row.earnings, "currency")
          }}</CommonDatatableTD>
          <CommonDatatableTD>{{ row.status }}</CommonDatatableTD>

          <CommonDatatableTD>
            {{ dateTimeFormat(row.created_at, "date:compact") }}
          </CommonDatatableTD>
        </CommonDatatableRow>
      </template>
    </CommonDatatable>
  </div>
</template>
