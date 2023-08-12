<template>
  <table class="">
    <thead>
      <CommonDatatableRow>
        <template v-for="index in 4">
          <CommonDatatableTH :align="index === 4 ? 'right' : 'left'">
            <CommonSkeleton
              class="h-3 w-24"
            />
          </CommonDatatableTH>
        </template>
      </CommonDatatableRow>
    </thead>
    <tbody>
      <template v-for="index in 10">
        <CommonDatatableRow>
          <template v-for="index2 in 4">
            <CommonDatatableTD>
              <CommonSkeleton
                class="h-5"
                :class="{
                  'w-1/2': index2 === 1,
                  'w-4/5': index2 === 2,
                  'ml-auto w-10/12': index2 === 4,
                }"
              />
            </CommonDatatableTD>
          </template>
        </CommonDatatableRow>
      </template>
    </tbody>
  </table>
</template>
