<script lang="ts" setup>
import { ComputedRef } from 'vue';
import { DatatableItem } from '~/types';
import { Saving, SavingGoalMember } from '~~/types/models';
import { numberFormat } from '~~/utils/filters/numbers';
import { useApiRequest } from '~~/utils/hooks/api';

definePageMeta({
  middleware: ['auth'],
});

const route = useRoute();
const groupSavingsId = computed(() => route.params.id as string).value;

const url = computed(() => `/savings/goals/${groupSavingsId}`);

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
    <Datatable
      :url="`savings/goals/participants/${groupSavingsId}`"
      service="SAVINGS"
      :search-columns="columns"
      :column="column"
    >
      <template #heading>
        <DatatableTH> User Name </DatatableTH>
        <DatatableTH name="amount_saved">Amount Saved</DatatableTH>

        <DatatableTH name="status">Status </DatatableTH>
      </template>
      <template #default="{ row }: DatatableItem<SavingGoalMember>">
        <DatatableRow>
          <DatatableTD>
            <span class="flex flex-col gap-1">
              <span>{{ row.user?.firstName }} {{ row.user?.lastName }}</span>
              <span class="text-xs opacity-50">{{ row.user_id }}</span>
            </span>
          </DatatableTD>
          <DatatableTD>
            {{ numberFormat(row.amount_saved, 'currency') }}
          </DatatableTD>

          <DatatableTD> {{ row.status }}</DatatableTD>
        </DatatableRow>
      </template>
    </Datatable>
  </div>
</template>
