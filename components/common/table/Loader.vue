<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    rows: number;
    cols: number;
    thead?: boolean;
    th?: string | string[];
    td?: string | string[];
  }>(),
  {
    thead: true,
    th: 'h-3 w-16',
    td: 'h-2 w-32',
  }
);
</script>

<template>
  <Table>
    <thead v-if="thead">
      <TableRow>
        <template v-for="index in cols">
          <TableTH>
            <Skeleton
              :class="(typeof th === 'object' ? th[index - 1] : th)"
            />
          </TableTH>
        </template>
      </TableRow>
    </thead>
    <tbody>
      <template v-for="_ in rows">
        <TableRow>
          <template v-for="index in cols">
            <TableTD padding="px-4 py-4 md:first:pl-8 md:last:pr-8">
              <Skeleton :class="(typeof td === 'object' ? td[index - 1] : td)" />
            </TableTD>
          </template>
        </TableRow>
      </template>
    </tbody>
  </Table>
</template>
