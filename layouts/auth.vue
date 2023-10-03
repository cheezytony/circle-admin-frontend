<script lang="ts" setup>
</script>

<template>
  <section class="flex min-h-screen">
    <div class="bg-black flex-grow hidden md:block">

    </div>
    <div class="md:w-1/2 pt-16 pb-24 px-16">
      <div class="max-w-[500px]">
        <div class="flex gap-8 items-center mb-16 pb-5">
          <LogoDefault class="text-[10px]" />
        </div>
  
        <slot />
      </div>
      </div>
  </section>
</template>