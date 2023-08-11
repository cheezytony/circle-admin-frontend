<script lang="ts" setup>
import { Configuration } from '~~/types/models';
import { useApiRequest } from '~~/utils/hooks/api';

const { data, isLoading } = useApiRequest<Array<Configuration>>({
  url: '/configurations',
  authorize: true,
  autoLoad: true,
  service: 'SUBSCRIPTIONS',
});
const configurations = computed(() => data.value?.data)
</script>

<template>
  <div>
    <div v-if="isLoading">
      <CommonSpinner />
    </div>
    <div v-else>
      <CommonForm class="gap-x-8 grid grid-cols-1 md:grid-cols-2">
        <template :key="configuration.slug" v-for="(configuration) in configurations">
          <PageSectionsConfigurationItem v-bind="{ configuration }" />
        </template>
      </CommonForm>
    </div>
  </div>
</template>
