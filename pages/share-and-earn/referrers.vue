<script lang="ts" setup>
import { ShareAndEarn } from '~~/types/models';

useHead({
  title: ' Referrers',
});

const columns = [
  { name: 'user_id', title: 'User ID' },
  { name: 'email', title: 'Email Address' },
];
const column = ref('id');
const {
  public: { shareAndEarnBaseUrl },
} = useRuntimeConfig();
</script>

<template>
  <div>
    <CommonPageHeading>
      <CommonHeading level="2">Successful Referrals</CommonHeading>
    </CommonPageHeading>

    <CommonDatatable
      :url="'referral-wallets/successful-referrals'"
      :base-url="shareAndEarnBaseUrl"
      :search-columns="columns"
      :column="column"
    >
      <template #heading>
        <CommonDatatableTH name="userId._id">User ID</CommonDatatableTH>
        <CommonDatatableTH name="userId.firstName">User Name</CommonDatatableTH>
        <CommonDatatableTH name="userId.email">Email</CommonDatatableTH>
        <CommonDatatableTH name="referrerId._id">
          Number of Successful Referrals
        </CommonDatatableTH>
      </template>
      <template #default="{ row }: { row: ShareAndEarn }">
        <CommonDatatableRow>
          <CommonDatatableTD>
            <div class="flex items-center gap-3">
              <span>{{ row.referrer_id?._id }}</span>
            </div>
          </CommonDatatableTD>

          <CommonDatatableTD>
            {{ row.referrer_id?.firstName }}
            {{ row.referrer_id?.lastName }}
          </CommonDatatableTD>

          <CommonDatatableTD>
            {{ row.referrer_id?.email || 'N/A' }}
          </CommonDatatableTD>

          <CommonDatatableTD>{{ row.total_count }}</CommonDatatableTD>
        </CommonDatatableRow>
      </template>
    </CommonDatatable>
  </div>
</template>
