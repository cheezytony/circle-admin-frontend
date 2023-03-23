<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
});

useHead({
  title: 'Forgot Password',
});

const email = ref<string>();
</script>

<template>
  <section>
    <PageSectionsPasswordResetPassword v-if="email" :email="email" />
    <PageSectionsPasswordForgotPassword v-else @success="email = $event" />
  </section>
</template>
