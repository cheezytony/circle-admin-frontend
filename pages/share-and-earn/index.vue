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
      :search-columns="columns"
      :column="column"
    >
      <template #heading>
        <CommonDatatableTH name="user_id._id">User ID</CommonDatatableTH>

        <CommonDatatableTH name="user_id.firstName">
          User Name
        </CommonDatatableTH>

        <CommonDatatableTH name="user_id.email">Email</CommonDatatableTH>

        <CommonDatatableTH name="referrerId._id">
          User_id(Referrer)
        </CommonDatatableTH>

        <CommonDatatableTH name="createdAt">Date Signed Up</CommonDatatableTH>

        <CommonDatatableTH name="status">Status</CommonDatatableTH>
      </template>

      <template #default="{ row }: { row: ShareAndEarn }">
        <CommonDatatableRow :to="`/admins/${row.id}`">
          <CommonDatatableTD>
            <div class="flex items-center gap-3">
              <span>{{ row.user_id?._id }}</span>
            </div>
          </CommonDatatableTD>

          <CommonDatatableTD>
            {{ row.user_id?.firstName }}
            {{ row.user_id?.lastName }}
          </CommonDatatableTD>

          <CommonDatatableTD>
            {{ row.user_id?.email || 'N/A' }}
          </CommonDatatableTD>

          <CommonDatatableTD>
            {{ row.referrer_id?._id || 'N/A' }}
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
