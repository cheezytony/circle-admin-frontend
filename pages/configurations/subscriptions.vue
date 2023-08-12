<script lang="ts" setup>
import { Configuration } from '~~/types/models';
import { useApiRequest } from '~~/utils/hooks/api';

const { data, isLoading, load } = useApiRequest<Array<Configuration>>({
  url: '/configurations',
  authorize: true,
  autoLoad: true,
  service: 'SUBSCRIPTIONS',
});
const configurations = computed(() => data.value?.data || []);
</script>

<template>
  <div>
    <PageSectionsConfigurationLoader v-if="isLoading" />
    <PageSectionsConfiguration
      v-else-if="configurations"
      v-bind="{ configurations, service: 'SUBSCRIPTIONS' }"
    />
  </div>
</template>
