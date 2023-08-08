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
      :url="`referral-wallets/successful-referrals`"
      service="AUTH"
      :search-columns="columns"
      :column="column"
    >
      <template #heading>
        <CommonDatatableTH>User Name</CommonDatatableTH>
        <CommonDatatableTH>Email</CommonDatatableTH>
        <CommonDatatableTH> Number of Successful Referrals </CommonDatatableTH>
      </template>
      <template #default="{ row }: { row: ShareAndEarn }">
        <CommonDatatableRow>
          <CommonDatatableTD>
            <span class="flex flex-col gap-1">
              <span>
                {{ row.referrer_id?.firstName }}
                {{ row.referrer_id?.lastName }}
              </span>
              <span class="text-xs opacity-50">{{ row.referrer_id?._id }}</span>
            </span>
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
