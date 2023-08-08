<script lang="ts" setup>
import { ShareAndEarn } from '~~/types/models';
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
    <CommonPageHeading>
      <CommonHeading level="2">Referees</CommonHeading>
    </CommonPageHeading>

    <CommonDatatable
      :url="`referral-wallets/referees`"
      service="AUTH"
      :search-columns="columns"
      :column="column"
    >
      <template #heading>
        <CommonDatatableTH> User Name </CommonDatatableTH>
        <CommonDatatableTH>Email</CommonDatatableTH>
        <CommonDatatableTH> User_id(Referrer) </CommonDatatableTH>
        <CommonDatatableTH>Date Signed Up</CommonDatatableTH>
        <CommonDatatableTH>Status</CommonDatatableTH>
      </template>

      <template #default="{ row }: { row: ShareAndEarn }">
        <CommonDatatableRow :to="`/admins/${row.id}`">
          <CommonDatatableTD>
            <span class="flex flex-col gap-1">
              <span>
                {{ row.user_id?.firstName }} {{ row.user_id?.lastName }}
              </span>
              <span class="text-xs opacity-50">{{ row.user_id?._id }}</span>
            </span>
          </CommonDatatableTD>

          <CommonDatatableTD>
            {{ row.user_id?.email || 'N/A' }}
          </CommonDatatableTD>

          <CommonDatatableTD>
            {{ row.referrer_id?._id || 'N/A' }}
          </CommonDatatableTD>

          <CommonDatatableTD>
            {{
              row.created_at ? dateTimeFormat(row.created_at, 'date') : 'N/A'
            }}
          </CommonDatatableTD>

          <CommonDatatableTD>{{ row.status }}</CommonDatatableTD>
        </CommonDatatableRow>
      </template>
    </CommonDatatable>
  </div>
</template>
