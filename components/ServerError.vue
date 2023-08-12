<script lang="ts" setup>
import { HTTPError } from 'types/http';

const props = defineProps<{
  error: HTTPError | Error;
}>();

const error = computed(() => props.error);
const status = computed<number>(
  () => (error.value as HTTPError)?.response?.status ?? 500
);
const heading = computed<string>(() => {
  switch (status.value) {
    case 400:
      return 'There was an error with your request';
    case 401:
      return 'You are not authorized to view this page';
    case 403:
      return 'You do not have permission to view this page';
    case 404:
      return 'The requested resource was not found';
    case 422:
      return 'The data you sent was invalid';
    case 500:
    default:
      return 'An error occurred on the server';
  }
});
const recommendation = computed<string>(() => {
  switch (status.value) {
    case 400:
      return 'Please check your request and try again.';
    case 401:
      return 'Please log in and try again or contact an administrator.';
    case 403:
      return 'Please contact an administrator to request access.';
    case 404:
      return 'Please reach out to a developer to fix this issue, or try again later.';
    case 422:
      return 'Please check your data and try again.';
    case 500:
    default:
      return 'Please reach out to a developer to fix this issue, or try again later.';
  }
});
const message = computed<string | undefined>(() => {
  return (
    (error.value as HTTPError).response?.data?.message ??
    (error.value as Error).message
  );
});
</script>

<template>
  <div
    class="border border-gray-100 rounded-lg px-4 py-16 w-full md:px-10 md:py-16"
  >
    <div class="flex flex-col gap-10 items-center justify-around max-w-4xl mx-auto md:flex-row md:gap-16">
      <IllustrationsError class="flex-shrink-0 text-[0.5rem]" />
      <div class="max-w-3xl font-[sans-serif] text-center md:text-left">
        <div class="font-black font-[sans-serif] mb-4 text-4xl md:text-5xl md:mb-8">
          {{ heading }}
        </div>
        <p class="max-w-md mx-auto md:mx-0 md:text-xl">{{ recommendation }}</p>
      </div>
    </div>
  </div>
</template>
