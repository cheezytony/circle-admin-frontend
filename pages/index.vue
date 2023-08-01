<script lang="ts" setup>
import { DataListItem } from '~~/types/components';

definePageMeta({
  middleware: ['auth'],
  layout: false,
});

const overview: Array<DataListItem> = [
  { title: 'Current MRR', value: '----' },
  {
    title: 'Current Customers',
    value: '----',
    // type: 'number:compact',
    // change: 17,
  },
  { title: 'Active Customers', value: '----' },
];
</script>

<template>
  <NuxtLayout name="default">
    <template #summary>
      <CommonSummaryHeading>
        Overview
      </CommonSummaryHeading>

      <CommonDataList :data="overview" />
    </template>
    <div class="gap-4 grid grid-cols-1 3xl:grid-cols-2">
      <CommonChartBar />
      <CommonChartLine />
    </div>
  </NuxtLayout>
</template>
