<script lang="ts" setup>
import { Configuration } from 'types/models';

defineProps<{
  configurations: Array<Configuration>;
  name?: string;
}>();
</script>

<template>
  <Card>
    <CardHeading>
      {{ name ?? 'General' }}
    </CardHeading>
    <div class="flex flex-col gap-10">
      <template
        :key="configuration.slug"
        v-for="configuration in configurations"
      >
        <ConfigurationsItem v-bind="{ configuration }" />
      </template>
    </div>
  </Card>
</template>
