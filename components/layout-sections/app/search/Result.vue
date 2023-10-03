<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps<{
  type?: 'admin' | 'user' | 'transaction' | 'setting';
}>();

const types = ['admin', 'user', 'transaction', 'setting'];
const type = computed(() => {
  return types[Math.floor(Math.random() * types.length)];
});
const icon = computed(() => {
  switch (type.value) {
    case 'admin':
      return 'fas fa-user-tie';
    case 'user':
      return 'user';
    case 'transaction':
      return 'fas fa-money-bill-transfer';
    case 'setting':
      return 'cog';
    default:
      return 'search';
  }
});
</script>

<template>
  <div class="border border-gray-100 p-4 flex flex-col rounded-lg md:flex-row">
    <div class="">
      <div class="bg-gray-50 grid h-10 place-items-center rounded-lg text-gray-500 w-10">
        <FontAwesomeIcon :icon="icon" />
      </div>
    </div>
  </div>
</template>
