<script lang="ts" setup>
import { DataListItem, TabLink } from '~~/types';

definePageMeta({
  middleware: ['auth'],
  layout: false,
});

const dataList: Array<DataListItem> = [
  { title: 'Most Selected', value: '----' },
  { title: 'Least Selected', value: '----' },
];

const links: Array<TabLink> = [
  {
    title: 'Subscriptions',
    href: '/subscriptions',
    exact: true,
  },
  {
    title: 'Plans',
    href: '/subscriptions/plans',
  },
];

const route = useRoute();
const isViewingPlans = computed(
  () => route.path.startsWith('/subscriptions/plans')
);
const isViewingAllPlans = computed(
  () => route.path === '/subscriptions/plans'
);
const isCreatingPlan = computed(
  () => route.path === '/subscriptions/plans/create'
);
</script>

<template>
  <NuxtLayout name="default">
    <template #summary>
      <SummaryHeading>Overview</SummaryHeading>

      <DataList :data="dataList" />
    </template>

    <div>
      <PageHeading>
        <Heading level="2">Subscriptions</Heading>
      </PageHeading>
      <div class="flex flex-wrap gap-4 items-center justify-between">
        <Tabs>
          <TabsNav :tabs="links" />
        </Tabs>

        <div v-if="isViewingPlans" class="flex gap-4 items-center">
          <Button
            v-if="!isViewingAllPlans"
            href="/subscriptions/plans"
            left-icon="chevron-left"
            color-scheme="gray:soft"
            size="sm"
          >
            View all plans
          </Button>
          <Button
            v-if="!isCreatingPlan"
            href="/subscriptions/plans/create"
            left-icon="plus"
            size="sm"
          >
            Create Plan
          </Button>
        </div>
      </div>
      <RouterView />
    </div>
  </NuxtLayout>
</template>
