<script lang="ts" setup>
import { ComputedRef } from 'vue';
import { DataListItem, TabLink } from '~~/types/components';
import { User } from '~~/types/models';
import { useApiRequest } from '~~/utils/hooks/api';

definePageMeta({
  layout: false,
  middleware: ['auth'],
});

const route = useRoute();
const userId = computed(() => route.params.id as string);
const url = computed(() => `/users/${userId.value}`);

const { data, isLoading, error } = useApiRequest<User>({
  url: url as ComputedRef<string> & string,
  autoLoad: true,
  authorize: true,
  service: 'USER_DATA',
});
const user = computed(() => data.value?.data);
const fullName = computed(() => {
  return user.value && `${user.value.firstName} ${user.value.lastName}`;
});

const stats = computed<Array<DataListItem>>(() => {
  if (!user.value) return [];
  return [
    { title: 'Wallet Balance', value: '----' },
    { title: 'Total Investments', value: '----' },
    { title: 'Total Insurance', value: '----' },
    { title: 'Total Savings', value: '----' },
    { title: 'Stock Balance', value: '----' },
    { title: 'Subscription Status', value: '----' },
  ];
});
const tabs: Array<TabLink> = [
  { title: 'Profile', href: `/users/${userId.value}`, exact: true },
  { title: 'Wallet', href: `/users/${userId.value}/wallet` },
  { title: 'Savings', href: `/users/${userId.value}/savings` },
  { title: 'Stocks', href: `/users/${userId.value}/stocks` },
  { title: 'Subscriptions', href: `/users/${userId.value}/subscriptions` },
  // { title: 'Audit Trail', href: `/users/${userId.value}/audit-trail` },
  // { title: 'Edit', href: `/users/${userId.value}/edit` },
];

useHead({
  title: () => (error.value ? 'Error' : fullName.value ?? 'Loading...'),
});
</script>

<template>
  <NuxtLayout name="default">
    <template #summary>
      <SummaryHeading>
        {{ fullName }}
      </SummaryHeading>

      <DataList :data="stats" />
    </template>
    <div>
      <Tabs>
        <TabsNav :tabs="tabs" />
      </Tabs>

      <RouterView v-if="user" :user="user" />
    </div>
  </NuxtLayout>
</template>
