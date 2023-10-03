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
    title: 'Group Savings',
    href: '/savings/group-savings',
  },
];
</script>

<template>
  <div>
    <PageHeading>
      <Heading level="2">Savings</Heading>
    </PageHeading>
    <Tabs>
      <TabsNav :tabs="links" />
    </Tabs>
    <div>
      <RouterView />
    </div>
  </div>
</template>
