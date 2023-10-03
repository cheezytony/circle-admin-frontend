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
    <PasswordResetPassword v-if="email" :email="email" />
    <PasswordForgotPassword v-else @success="email = $event" />
  </section>
</template>
