<script lang="ts" setup>
import { Configuration } from 'types/models';

defineProps<{
  configurations: Array<Configuration>;
  name?: string;
}>();
</script>

<template>
  <CommonCard>
    <CommonCardHeading>
      {{ name ?? 'General' }}
    </CommonCardHeading>
    <div class="flex flex-col gap-10">
      <template
        :key="configuration.slug"
        v-for="configuration in configurations"
      >
        <PageSectionsConfigurationItem v-bind="{ configuration }" />
      </template>
    </div>
  </CommonCard>
</template>
