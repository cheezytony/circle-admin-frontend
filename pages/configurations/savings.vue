<script lang="ts" setup>
import { Configuration } from '~~/types/models';
import { useApiRequest } from '~~/utils/hooks/api';

const { data, isLoading } = useApiRequest<{ data: Array<Configuration> }>({
  url: '/configurations',
  authorize: true,
  autoLoad: true,
  service: 'SAVINGS',
});
const configurations = computed(() => data.value?.data?.data);
</script>

<template>
  <div></div>
</template>
