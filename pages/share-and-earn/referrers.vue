<script lang="ts" setup>
import { ShareAndEarn, ShareAndEarnEx } from '~~/types/models';

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
    <PageHeading>
      <Heading level="2">Successful Referrals</Heading>
    </PageHeading>

    <Datatable
      :url="'referral-wallets/successful-referrals'"
      service="AUTH"
      :search-columns="columns"
      :column="column"
      :model="ShareAndEarnEx"
    >
      <template #heading>
        <DatatableTH name="user_id.firstName">
          User Name
        </DatatableTH>
        <DatatableTH name="user_id.email">Email</DatatableTH>
        <DatatableTH name="referrer_id._id">
          Number of Successful Referrals
        </DatatableTH>
      </template>
      <template #default="{ row }">
        <DatatableRow>
          <DatatableTD>
            <span class="flex flex-col gap-1">
              <span>
                {{ row.referrer_id?.firstName }} {{ row.referrer_id?.lastName }}
              </span>
              <span class="text-xs opacity-50">{{ row.referrer_id?._id }}</span>
            </span>
          </DatatableTD>

          <DatatableTD>
            {{ row.referrer_id?.email || 'N/A' }}
          </DatatableTD>

          <DatatableTD>{{ row.total_count }}</DatatableTD>
        </DatatableRow>
      </template>
    </Datatable>
  </div>
</template>
