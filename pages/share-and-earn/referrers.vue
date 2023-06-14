<script lang="ts" setup>
import { ShareAndEarn } from "~~/types/models";
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
const {
  public: { shareAndEarnBaseUrl },
} = useRuntimeConfig();
const { data } = useApiRequest<Array<ShareAndEarn[]>>({
  url: `${shareAndEarnBaseUrl}successful-referrals`,
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
        <CommonDatatableTH name="userId._id">User ID</CommonDatatableTH>
        <CommonDatatableTH name="userId.firstName">User Name</CommonDatatableTH>
        <CommonDatatableTH name="userId.email">Email</CommonDatatableTH>
        <CommonDatatableTH name="referrerId._id"
          >Number of Successful Referrals</CommonDatatableTH
        >
      </template>
      <template #default="{ row }: { row: ShareAndEarn }">
        <CommonDatatableRow>
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
