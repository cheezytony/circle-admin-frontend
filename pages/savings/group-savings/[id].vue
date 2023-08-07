<script lang="ts" setup>
import { ComputedRef } from 'vue';
import GroupSavingsCard from '~~/components/saving-sections/GroupSavingsCard.vue';
import { Saving, SavingGoalMember } from '~~/types/models';
import { numberFormat } from '~~/utils/filters/numbers';
import { useApiRequest } from '~~/utils/hooks/api';

definePageMeta({
  middleware: ['auth'],
});

const route = useRoute();
const groupSavingsId = computed(() => route.params.id as string).value;

const url = computed(() => `/goals/${groupSavingsId}`);

const { data } = useApiRequest<Saving>({
  url: url as ComputedRef<string> & string,
  autoLoad: true,
  authorize: true,
  service: 'SAVINGS',
});

useHead({
  title: 'Group savings',
});
</script>

<template>
  <div>
    <GroupSavingsCard
      :groupName="data?.data?.name"
      :memberCount="data?.data?.saving_goal_members"
      :totalAmountSaved="data?.data?.amount_saved"
      :targetAmount="data?.data?.target_amount"
    />
    <CommonDatatable
      :url="`goals/participants/${groupSavingsId}`"
      service="SAVINGS"
      :search-columns="columns"
      :column="column"
    >
      <template #heading>
        <CommonDatatableTH name="user.firstName"> User Name </CommonDatatableTH>
        <CommonDatatableTH name="user_id">User ID</CommonDatatableTH>

        <CommonDatatableTH name="amount_saved">Amount Saved</CommonDatatableTH>

        <CommonDatatableTH name="status">Status </CommonDatatableTH>
      </template>
      <template #default="{ row }: { row: SavingGoalMember }">
        <CommonDatatableRow>
          <CommonDatatableTD>
            <div class="flex items-center gap-3">
              <span>
                {{ row.user.firstName }}
                {{ row.user.lastName }}
              </span>
            </div>
          </CommonDatatableTD>
          <CommonDatatableTD>{{ row.user_id }}</CommonDatatableTD>
          <CommonDatatableTD>
            {{ numberFormat(row.amount_saved, 'currency') }}
          </CommonDatatableTD>

          <CommonDatatableTD> {{ row.status }}</CommonDatatableTD>
        </CommonDatatableRow>
      </template>
    </CommonDatatable>
  </div>
</template>
