<script lang="ts" setup>
import { SidebarLink } from './Link.vue';

interface SidebarSection {
  title: string;
  links: Array<SidebarLink>;
}

defineProps<SidebarSection>();
</script>

<template>
  <ul class="flex flex-col gap-8">
    <template :key="`${title}-${link.title}`" v-for="link in links">
      <AppSidebarLink v-bind="link" />
    </template>
  </ul>
</template>
