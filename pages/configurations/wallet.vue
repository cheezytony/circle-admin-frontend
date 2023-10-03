<script lang="ts" setup>
import { Configuration } from '~~/types/models';
import { useApiRequest } from '~~/utils/hooks/api';

const { data, isLoading, error } = useApiRequest<Array<Configuration>>({
  url: '/configurations',
  authorize: true,
  autoLoad: true,
  service: 'WALLET',
});
const configurations = computed(() => data.value?.data || []);
</script>

<template>
  <div>
    <ConfigurationsLoader v-if="isLoading" />
    <ServerError v-else-if="error" :error="error" />
    <Configurations
      v-else-if="configurations"
      v-bind="{ configurations, service: 'WALLET' }"
    />
  </div>
</template>
