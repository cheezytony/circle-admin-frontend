<script lang="ts" setup>
import { Configuration } from '~~/types/models';
import { useApiRequest } from '~~/utils/hooks/api';

const { data, isLoading } = useApiRequest<{ data: Array<Configuration> }>({
  url: '/configurations',
  authorize: true,
  autoLoad: true,
});
const configurations = computed(() => data.value?.data?.data)
</script>

<template>
  <CommonForm class="gap-x-8 grid grid-cols-1 md:grid-cols-2">
    <template :key="configuration.slug" v-for="(configuration) in configurations">
      <PageSectionsConfigurationItem v-bind="{ configuration }" />
    </template>
  </CommonForm>
</template>
