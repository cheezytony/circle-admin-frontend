<script lang="ts" setup>
import { ShareAndEarn } from '~~/types/models';
import { dateTimeFormat } from '~~/utils/filters/dates';

useHead({
  title: 'Referees',
});

const columns = [
  { name: '_id', title: 'User ID' },
  { name: 'firstName', title: 'First Name' },
  { name: 'lastName', title: 'Last Name' },
  { name: 'email', title: 'Email Address' },
];
const {
  public: { shareAndEarnBaseUrl },
} = useRuntimeConfig();
const column = ref('id');
</script>

<template>
  <div>
    <CommonPageHeading>
      <CommonHeading level="2">Referees</CommonHeading>
    </CommonPageHeading>

    <CommonDatatable
      :url="'referees'"
      :base-url="shareAndEarnBaseUrl"
      :paginatable="true"
      :search-columns="columns"
      :column="column"
    >
      <template #heading>
        <CommonDatatableTH name="userId._id">User ID</CommonDatatableTH>

        <CommonDatatableTH name="userId.firstName">User Name</CommonDatatableTH>

        <CommonDatatableTH name="userId.email">Email</CommonDatatableTH>

        <CommonDatatableTH name="referrerId._id">
          UserId(Referrer)
        </CommonDatatableTH>

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

          <CommonDatatableTD>
            {{ row?.userId?.firstName }}
            {{ row?.userId?.lastName }}
          </CommonDatatableTD>

          <CommonDatatableTD>
            {{ row.userId?.email || 'N/A' }}
          </CommonDatatableTD>

          <CommonDatatableTD>
            {{ row.referrerId?._id || 'N/A' }}
          </CommonDatatableTD>

          <CommonDatatableTD>
            {{ row.createdAt ? dateTimeFormat(row.createdAt, 'date') : 'N/A' }}
          </CommonDatatableTD>

          <CommonDatatableTD>{{ row.status }}</CommonDatatableTD>
        </CommonDatatableRow>
      </template>
    </CommonDatatable>
  </div>
</template>
