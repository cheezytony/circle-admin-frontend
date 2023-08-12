<script lang="ts" setup>
import { TabLink } from '~~/types/components';

definePageMeta({
  middleware: ['auth'],
  layout: false,
});

useHead({
  titleTemplate: (title) => (title ? `${title} - Settings` : 'Settings'),
});

const links: Array<TabLink> = [
  {
    title: 'My Profile',
    href: '/settings',
    exact: true,
  },
  {
    title: 'Password',
    href: '/settings/password',
  },
  {
    title: 'Notifications',
    href: '/settings/notifications',
  },
];
</script>

<template>
  <NuxtLayout name="default">
    <div>
      <CommonPageHeading>
        <CommonHeading level="2">Settings</CommonHeading>
      </CommonPageHeading>
      <CommonTabs>
        <CommonTabsNav :tabs="links" />
      </CommonTabs>

      <div class="max-w-[500px]">
        <RouterView />
      </div>
    </div>
  </NuxtLayout>
</template>
