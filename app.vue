<script lang="ts" setup>
// import 'toastr/build/toastr.min.css'
useHead({
  titleTemplate: (title) => title ? `${title} - Circle Admin` : 'Circle Admin',
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
