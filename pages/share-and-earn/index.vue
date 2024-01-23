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
            {{ optional(row.user_id?.email) }}
          </DatatableTD>
          <DatatableTD>
            {{ optional(row.referrer_id?._id) }}
          </DatatableTD>
          <DatatableTD>
            {{ dateTimeFormat(row.created_at, 'date:compact') }}
          </DatatableTD>
          <DatatableTD>
            <BadgeStatus :status="row.status" />
          </DatatableTD>
        </DatatableRow>
      </template>
    </Datatable>
  </div>
</template>
