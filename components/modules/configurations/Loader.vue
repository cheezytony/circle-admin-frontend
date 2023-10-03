<template>
  <div class="gap-4 grid grid-cols-1 md:gap-8 md:grid-cols-2">
    <template v-for="index in 4" :key="index">
      <Card>
        <Skeleton class="h-3 w-36" />

        <template v-for="index2 in 2" :key="index2">
          <div class="flex flex-col gap-2">
            <Skeleton class="h-2 w-28" />
            <Skeleton class="h-14 rounded w-full" />
          </div>
        </template>
      </Card>
    </template>

    <Card class="md:col-span-2">
      <div>
        <div class="flex gap-4 items-center mb-4">
          <Skeleton class="h-14 rounded w-36" />
          <Skeleton class="h-14 rounded w-36" />
        </div>
        <div class="flex flex-col gap-2">
          <Skeleton class="h-2 rounded w-full" />
          <Skeleton class="h-2 rounded w-[90%]" />
          <Skeleton class="h-2 rounded w-32" />
        </div>
      </div>
    </Card>
  </div>
</template>
