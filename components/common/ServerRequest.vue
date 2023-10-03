<script lang="ts" setup generic="TModel extends Record<string, any>">
import { ServiceNames, isEmpty } from '~/utils';

const emit = defineEmits<{
  (e: 'success', data: any): void;
}>();
const props = defineProps<{
  authorize?: boolean;
  model?: TModel;
  initialValue?: TModel;
  service: ServiceNames;
  url: string;
}>();

const {
  data: response,
  isLoading,
  error,
  load,
} = useApiRequest<TModel>({
  service: props.service,
  url: props.url,
  authorize: props.authorize,
  autoLoad: true,
  onSuccess: (data) => emit('success', data.data),
});

const data = computed(() => response.value?.data ?? props.initialValue);
const isDataEmpty = computed<boolean>(() => isEmpty(data.value));

watch(
  () => [props.url, props.service, props.authorize],
  () => load()
);
</script>

<template>
  <slot v-if="isLoading" name="loading" />
  <slot v-else-if="error">
    <ServerError :error="error" />
  </slot>
  <slot v-else-if="isDataEmpty" name="empty">
    <Card>
      <div class="flex flex-col items-center justify-center">
        <IllustrationsEmpty class="mb-10 text-[5px]" />
        <div class="text-3xl text-gray-400">No data found</div>
      </div>
    </Card>
  </slot>
  <slot v-else v-bind="{ data, load }" />
</template>
