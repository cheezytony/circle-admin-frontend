<script lang="ts" setup>
import { Saving } from "~~/types/models";
import { dateTimeFormat } from "~~/utils/filters/dates";
import { numberFormat } from "~~/utils/filters/numbers";
import { useApiRequest } from "~~/utils/hooks/api";

useHead({
  title: "Dollar Savings",
});

const columns = [
  { name: "id", title: "User ID" },
  { name: "first_name", title: "First Name" },
  { name: "last_name", title: "Last Name" },
  { name: "email", title: "Email Address" },
  { name: "phone", title: "Phone Number" },
];
const column = ref("id");
const {
  public: { savingsBaseUrl },
} = useRuntimeConfig();
const { data } = useApiRequest<Array<Saving>>({
  url: `${savingsBaseUrl}admin/dollar`,
  authorize: true,
  autoLoad: true,
});
</script>

<template>
  <div>
    <CommonPageHeading>
      <CommonHeading level="2">Dollar Savings</CommonHeading>
    </CommonPageHeading>

    <CommonDatatable :data="data?.data?.data" :search-columns="columns" :column="column">
      <template #heading>
        <CommonDatatableTH name="saving_extra_details.firstName"
          >User Name
        </CommonDatatableTH>
        <CommonDatatableTH name="user_id">User ID</CommonDatatableTH>
        <CommonDatatableTH name="saving_extra_details.phoneNo">
          Phone Number
        </CommonDatatableTH>
        <CommonDatatableTH name="id">Savings ID</CommonDatatableTH>
        <CommonDatatableTH name="frequency">Frequency</CommonDatatableTH>
        <CommonDatatableTH name="amount_to_debit"> Amount to Save </CommonDatatableTH>
        <CommonDatatableTH name="funding_source"> Payment Method </CommonDatatableTH>
        <CommonDatatableTH name="total_earnings">
          Total Amount Accured Balance
        </CommonDatatableTH>
        <CommonDatatableTH name="total_earnings"> Total Amount Saved </CommonDatatableTH>
        <CommonDatatableTH name="earnings"> Total Interest Earned </CommonDatatableTH>
        <CommonDatatableTH name="status">Status</CommonDatatableTH>
        <CommonDatatableTH name="created_at">Date Created</CommonDatatableTH>
      </template>
      <template #default="{ row }: { row: Saving }">
        <CommonDatatableRow :to="`/savings/history/${row.id}?type=${'DOLLAR'}`">
          <CommonDatatableTD>
            <div class="flex items-center gap-3">
              <span>
                {{ row?.saving_extra_details?.first_name }}
                {{ row?.saving_extra_details?.last_name }}
              </span>
            </div>
          </CommonDatatableTD>
          <CommonDatatableTD>{{ row.user_id }}</CommonDatatableTD>
          <CommonDatatableTD>
            {{ row.saving_extra_details?.phone || "N/A" }}
          </CommonDatatableTD>
          <CommonDatatableTD>{{ row.id }}</CommonDatatableTD>
          <CommonDatatableTD>{{ row.frequency }}</CommonDatatableTD>
          <CommonDatatableTD>
            {{ numberFormat(row.amount_to_debit, "currency", "USD") }}
          </CommonDatatableTD>
          <CommonDatatableTD>{{ row.funding_source }}</CommonDatatableTD>
          <CommonDatatableTD>
            {{ numberFormat(row.total_earnings, "currency", "USD") }}
          </CommonDatatableTD>
          <CommonDatatableTD>
            {{ numberFormat(row.amount_saved, "currency", "USD") }}
          </CommonDatatableTD>
          <CommonDatatableTD>
            {{ numberFormat(row.earnings, "currency", "USD") }}
          </CommonDatatableTD>
          <CommonDatatableTD>{{ row.status }}</CommonDatatableTD>
          <CommonDatatableTD>
            {{ dateTimeFormat(row.created_at, "date:compact") }}
          </CommonDatatableTD>
        </CommonDatatableRow>
      </template>
    </CommonDatatable>
  </div>
</template>
