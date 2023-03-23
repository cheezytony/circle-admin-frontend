<script lang="ts" setup>
import { Admin } from '~~/types/models';

const props = defineProps<{
  admin: Admin,
}>();
useHead({
  title: () => `Edit ${props.admin.first_name}'s Profile`,
});
</script>

<template>
  <div></div>
</template>
