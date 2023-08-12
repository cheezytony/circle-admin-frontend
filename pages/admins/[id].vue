<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ComputedRef } from 'vue';
import { DataListItem, TabLink } from '~~/types/components';
import { Admin } from '~~/types/models';
import { useApiRequest } from '~~/utils/hooks/api';
import { useAsset } from '~~/utils/hooks/misc';

definePageMeta({
  layout: false,
  middleware: ['auth'],
});

const route = useRoute();
const userId = computed(() => route.params.id as string);
const url = computed(() => `/admins/${userId.value}`);

const { data, isLoading } = useApiRequest<Admin>({
  url: url as ComputedRef<string> & string,
  autoLoad: true,
  authorize: true,
});
const admin = computed(() => data.value?.data);

const fullName = computed(() => {
  return admin.value && `${admin.value.first_name} ${admin.value.last_name}`;
});

const dataList = computed<Array<DataListItem>>(() => {
  if (!admin.value) return [];
  return [
    {
      title: 'Date Onboarded',
      value: new Date(admin.value.created_at),
      type: 'date:compact',
    },
    { title: 'ID', value: admin.value.id },
    { title: 'Email Address', value: admin.value.email },
    {
      title: 'Phone',
      value: admin.value.phone || 'N/A',
      href: `tel:${admin.value.phone}`,
    },
  ];
});
const tabs: Array<TabLink> = [
  { title: 'Profile', href: `/admins/${userId.value}`, exact: true },
  // { title: 'Audit Trail', href: `/admins/${userId.value}/audit-trail` },
  { title: 'Permissions', href: `/admins/${userId.value}/permissions` },
  // { title: 'Edit', href: `/admins/${userId.value}/edit` },
];

useHead({
  title: 'Loading...',
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
        <div class="flex gap-4 flex-wrap items-center justify-between">
          <CommonTabsNav :tabs="tabs" />
          <CommonButton color-scheme="red:soft" left-icon="trash-can" size="sm">
            Delete
          </CommonButton>
        </div>
      </CommonTabs>

      <RouterView v-if="admin" :admin="admin" />
    </div>
  </NuxtLayout>
</template>
