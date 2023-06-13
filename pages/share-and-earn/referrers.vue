<script lang="ts" setup>
import { Savings, ShareAndEarn } from "~~/types/models";
import { dateTimeFormat } from "~~/utils/filters/dates";
import { numberFormat } from "~~/utils/filters/numbers";
import { useApiRequest } from "~~/utils/hooks/api";

useHead({
  title: "Share and Earn - Referrers",
});

const columns = [
  { name: "id", title: "User ID" },
  { name: "first_name", title: "First Name" },
  { name: "last_name", title: "Last Name" },
  { name: "email", title: "Email Address" },
  { name: "phone", title: "Phone Number" },
];
const column = ref("id");
const { data } = useApiRequest<Array<Savings>>({
  url: `http://127.0.0.1:4003/api/referral-wallets/successful-referrals`,
  authorize: true,
  autoLoad: true,
});
</script>

<template>
  <div>
    <CommonPageHeading>
      <CommonHeading level="2">Successful Referrals</CommonHeading>
    </CommonPageHeading>

    <CommonDatatable
      :data="data?.data"
      :search-columns="columns"
      :column="column"
    >
      <template #heading>
        <CommonDatatableTH name="user_id">User ID</CommonDatatableTH>
        <CommonDatatableTH name="saving_extra_details.firstName"
          >User Name</CommonDatatableTH
        >
        <CommonDatatableTH name="saving_extra_details.phoneNo"
          >Email</CommonDatatableTH
        >
        <CommonDatatableTH name="id"
          >Number of Successful Referrals</CommonDatatableTH
        >
      </template>
      <template #default="{ row }: { row: ShareAndEarn }">
        <CommonDatatableRow :to="`/admins/${row.id}`">
          <CommonDatatableTD>
            <div class="flex items-center gap-3">
              <span>{{ row.referrerId?._id }}</span>
            </div>
          </CommonDatatableTD>
          <CommonDatatableTD
            >{{ row?.referrerId?.firstName }}
            {{ row?.referrerId?.lastName }}</CommonDatatableTD
          >
          <CommonDatatableTD>{{
            row.referrerId?.email || "N/A"
          }}</CommonDatatableTD>
          <CommonDatatableTD>{{ row.completedReferrals }}</CommonDatatableTD>
        </CommonDatatableRow>
      </template>
    </CommonDatatable>
  </div>
</template>
