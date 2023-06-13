<script lang="ts" setup>
import { ShareAndEarn } from "~~/types/models";
import { dateTimeFormat } from "~~/utils/filters/dates";
import { useApiRequest } from "~~/utils/hooks/api";

useHead({
  title: "Share and Earn - Referees",
});

const columns = [
  { name: "_id", title: "User ID" },
  { name: "firstName", title: "First Name" },
  { name: "lastName", title: "Last Name" },
  { name: "email", title: "Email Address" },
];
const column = ref("id");
const { data } = useApiRequest<Array<ShareAndEarn>>({
  url: `http://127.0.0.1:4003/api/referral-wallets/referees`,
  authorize: true,
  autoLoad: true,
});
</script>

<template>
  <div>
    <CommonPageHeading>
      <CommonHeading level="2">Referees</CommonHeading>
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
        <CommonDatatableTH name="referrerId._ id"
          >UserId(Referrer)</CommonDatatableTH
        >
        <CommonDatatableTH name="createdAt">Date Signed Up</CommonDatatableTH>
        <CommonDatatableTH name="status">Status</CommonDatatableTH>
      </template>
      <template #default="{ row }: { row: ShareAndEarn }">
        <CommonDatatableRow :to="`/admins/${row.id}`">
          <CommonDatatableTD>
            <div class="flex items-center gap-3">
              <span>{{ row.userId?._id }}</span>
            </div>
          </CommonDatatableTD>
          <CommonDatatableTD
            >{{ row?.userId?.firstName }}
            {{ row?.userId?.lastName }}</CommonDatatableTD
          >
          <CommonDatatableTD>{{
            row.userId?.email || "N/A"
          }}</CommonDatatableTD>
          <CommonDatatableTD>{{
            row.referrerId?._id || "N/A"
          }}</CommonDatatableTD>
          <CommonDatatableTD>{{
            row.createdAt ? dateTimeFormat(row.createdAt, "date") : "N/A"
          }}</CommonDatatableTD>
          <CommonDatatableTD>{{ row.status }}</CommonDatatableTD>
        </CommonDatatableRow>
      </template>
    </CommonDatatable>
  </div>
</template>
