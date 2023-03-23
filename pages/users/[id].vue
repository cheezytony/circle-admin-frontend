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
const url = computed(() => `/admins/${userId.value}`);

const { data, isLoading } = useApiRequest<User>({
  url: url as ComputedRef<string> & string,
  autoLoad: true,
  authorize: true,
});
const admin = computed(() => data.value?.data);
const fullName = computed(() => {
  return admin.value && `${admin.value.first_name} ${admin.value.last_name}`;
});

const dataList = computed<Array<DataListItem>>(() => []);
const tabs: Array<TabLink> = [
  { title: 'Profile', href: `/admins/${userId.value}` },
  { title: 'Audit Trail', href: `/admins/${userId.value}/audit-trail` },
  { title: 'Permissions', href: `/admins/${userId.value}/permissions` },
];

useHead({
  title: () => fullName.value || 'Loading...',
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
