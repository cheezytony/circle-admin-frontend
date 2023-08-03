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
const admin = computed(() => data.value?.data);
const fullName = computed(() => {
  return admin.value && `${admin.value.firstName} ${admin.value.lastName}`;
});

const dataList = computed<Array<DataListItem>>(() => []);
const tabs: Array<TabLink> = [
  { title: 'Profile', href: `/users/${userId.value}` },
  { title: 'Wallet', href: `/users/${userId.value}/wallet` },
  { title: 'Audit Trail', href: `/users/${userId.value}/audit-trail` },
  { title: 'Edit', href: `/users/${userId.value}/edit` },
];

useHead({
  title: () => error.value ? 'Error' : fullName.value ?? 'Loading...',
});
</script>

<template>
  <NuxtLayout name="default">
    <template #summary>
      <CommonSummaryHeading>
        {{ fullName }}
      </CommonSummaryHeading>

      <CommonDataList :data="dataList" />
    </template>
    <div>
      <CommonTabs>
        <CommonTabsNav :tabs="tabs"  />
      </CommonTabs>
    </div>
  </NuxtLayout>
</template>
