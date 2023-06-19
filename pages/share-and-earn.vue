<script lang="ts" setup>
import { TabLink } from '~~/types/components';

definePageMeta({
  middleware: ['auth'],
});

useHead({
  titleTemplate: (title) =>
    title ? `${title} - Circle Admin` : 'Share and Earn',
});

const links: Array<TabLink> = [
  {
    title: 'Referees',
    href: '/share-and-earn',
    exact: true,
  },

  {
    title: 'Referrers',
    href: '/share-and-earn/referrers',
  },
];
</script>

<template>
  <div>
    <CommonPageHeading>
      <CommonHeading level="2"> Share and Earn </CommonHeading>
    </CommonPageHeading>
    <CommonTabs>
      <CommonTabsNav :tabs="links" />
    </CommonTabs>

    <div>
      <RouterView />
    </div>
  </div>
</template>
