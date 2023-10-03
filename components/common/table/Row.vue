<template>
  <tr class="even:bg-gray-50">
    <slot></slot>
  </tr>
</template>

<style scoped>
tr:is(thead tr) {
  @apply bg-gray-50;
}
</style>
