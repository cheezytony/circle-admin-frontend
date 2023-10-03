<script lang="ts" setup>
import { ShareAndEarnEx } from '~~/types/models';
import { dateTimeFormat } from '~~/utils/filters/dates';

useHead({
  title: 'Referees',
});

const columns = [
  { name: 'user_id', title: 'User ID' },
  { name: 'email', title: 'Email Address' },
];

const column = ref('id');
</script>

<template>
  <div>
    <PageHeading>
      <Heading level="2">Referees</Heading>
    </PageHeading>

    <Datatable
      :url="'referral-wallets/referees'"
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

        <DatatableTH name="referrerId._id">
          User_id(Referrer)
        </DatatableTH>

        <DatatableTH name="createdAt">Date Signed Up</DatatableTH>

        <DatatableTH name="status">Status</DatatableTH>
      </template>

      <template #default="{ row }">
        <DatatableRow :to="`/users/${row.user_id?._id}`">
          <DatatableTD>
            <span class="flex flex-col gap-1">
              <span>
                {{ row.user_id?.firstName }} {{ row.user_id?.lastName }}
              </span>
              <span class="text-xs opacity-50">{{ row.user_id?._id }}</span>
            </span>
          </DatatableTD>

          <DatatableTD>
            {{ row.user_id?.email || 'N/A' }}
          </DatatableTD>

          <DatatableTD>
            {{ row.referrer_id?._id || 'N/A' }}
          </DatatableTD>

          <DatatableTD>
            {{
              row.created_at ? dateTimeFormat(row.created_at, 'date') : 'N/A'
            }}
          </DatatableTD>

          <DatatableTD>{{ row.status }}</DatatableTD>
        </DatatableRow>
      </template>
    </Datatable>
  </div>
</template>
