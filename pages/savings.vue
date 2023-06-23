<script lang="ts" setup>
import { TabLink } from '~~/types/components';

definePageMeta({
  middleware: ['auth'],
});

useHead({
  titleTemplate: (title) => (title ? `${title} - Savings` : 'Savings'),
});

const links: Array<TabLink> = [
  {
    title: 'Flexi Savings',
    href: '/savings',
    exact: true,
  },
  {
    title: 'Dollar Savings',
    href: '/savings/dollar',
  },
  {
    title: 'Vault Savings',
    href: '/savings/vault',
  },
  {
    title: 'Goal Savings',
    href: '/savings/goals',
  },
  {
    title: 'Private Goal Savings',
    href: '/savings/private-challenges',
  },
  {
    title: 'Public Goal Savings',
    href: '/savings/public-challenges',
  },
];
</script>

<template>
  <div>
    <CommonPageHeading>
      <CommonHeading level="2">Savings</CommonHeading>
    </CommonPageHeading>
    <CommonTabs>
      <CommonTabsNav :tabs="links" />
    </CommonTabs>
    <div>
      <RouterView />
    </div>
  </div>
</template>
