<script lang="ts" setup>
import { User } from '~/types';

const props = defineProps<{
  user: User;
}>();
useHead({
  title: () => `${props.user.firstName}'s Savings`,
});
</script>

<template>
  <div></div>
</template>
