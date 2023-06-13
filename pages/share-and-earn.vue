<script lang="ts" setup>
import { TabLink } from "~~/types/components";

definePageMeta({
  middleware: ["auth"],
  layout: false,
});

useHead({
  titleTemplate: (title) =>
    title ? `${title} - Share and Earn` : "Share and Earn",
});

const links: Array<TabLink> = [
  {
    title: "Referees",
    href: "/share-and-earn",
    exact: true,
  },

  {
    title: "Referrers",
    href: "/share-and-earn/referrers",
  },
];
</script>

<template>
  <NuxtLayout name="default">
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
  </NuxtLayout>
</template>
