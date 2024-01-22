<script lang="ts" setup>
import { TabLink } from '~~/types/components';

definePageMeta({
  middleware: ['auth'],
});

useHead({
  titleTemplate: (title) =>
    title ? `${title} - Share and Earn` : 'Share and Earn',
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
    <PageHeading>
      <Heading level="2">Share and Earn</Heading>
    </PageHeading>

    <div class="flex">
      <Tabs>
        <TabsNav :tabs="links" />
      </Tabs>
    </div>

    <div>
      <RouterView />
    </div>
  </div>
</template>
