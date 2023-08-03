<script lang="ts" setup>
import { TabLink } from '~~/types/components';
import { Configuration } from '~~/types/models';

definePageMeta({
  middleware: ['auth'],
});

useHead({
  title: 'Settings',
});

const categories: Array<TabLink> = [
  { title: 'All', href: '/configurations' },
  { title: 'Stocks' },
  { title: 'Savings' },
  { title: 'Loans' },
  { title: 'Insurance' },
  { title: 'Subscriptions', href: '/configurations/subscriptions' },
];
</script>

<template>
  <div>
    <CommonPageHeading>
      <CommonHeading level="2">Configurations</CommonHeading>
    </CommonPageHeading>

    <CommonTabs>
      <CommonTabsNav :tabs="categories" />
    </CommonTabs>

    <div class="max-w-[800px]">
      <RouterView />
    </div>
  </div>
</template>
