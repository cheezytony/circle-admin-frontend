<script lang="ts" setup>
import { Admin } from '~~/types/models';

const props = defineProps<{
  admin: Admin,
}>();
useHead({
  title: () => `${props.admin.first_name}'s Overview`,
});
</script>

<template>
  <div></div>
</template>
