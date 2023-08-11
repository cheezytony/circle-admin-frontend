<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { NuxtLink } from '#components';
import { DataListItem } from '~~/types/components';
import { NumberFormat, numberFormat } from '~~/utils/filters/numbers';
import { DateTimeFormat, dateTimeFormat } from '~~/utils/filters/dates';

const props = withDefaults(
  defineProps<{
    data: Array<DataListItem>;
    display?: 'columns' | 'rows' | 'grid';
    size?: 'sm' | 'md' | 'lg';
  }>(),
  {
    data: () => [],
    display: 'rows',
    size: 'md',
  }
);
const getValue = ({ value, type }: DataListItem) => {
  switch (value?.constructor) {
    case Number:
      return numberFormat(value as number, type as NumberFormat);

    case Date:
      return dateTimeFormat(value as Date, type as DateTimeFormat);

    case String:
    default:
      return value;
  }
};
</script>

<template>
  <div
    class="gap-4"
    :class="{
      'flex flex-row': display === 'columns',
      'flex flex-col': display === 'rows',
      'grid grid-cols-2': display === 'grid',
    }"
  >
    <template v-for="(item, index) in data">
      <div
        class="flex flex-col"
        :class="{
          'gap-1': size === 'sm',
          'gap-4': size === 'md',
          'gap-6': size === 'lg',
        }"
      >
        <div class="text-sm text-gray-400">
          {{ item.title }}
        </div>
        <div class="flex gap-4 items-center justify-between">
          <component
            :is="item.href ? NuxtLink : 'div'"
            :href="item.href"
            :target="item.href && '_blank'"
            class="overflow-hidden text-ellipsis w-full"
            :class="{
              'cursor-pointer duration-300 hover:text-blue-900': item.href,
              'font-medium text-base': size === 'sm',
              'font-medium text-xl': size === 'md',
              'font-medium text-2xl': size === 'lg',
            }"
          >
            {{ getValue(item) ?? 'N/A' }}
            <span v-if="item.href" class="text-xs">
              <FontAwesomeIcon icon="fas fa-arrow-up-right-from-square" />
            </span>
          </component>
          <CommonBadge v-if="item.change" color-scheme="green:soft">
            <span class="tex-sm">
              <FontAwesomeIcon icon="arrow-trend-up" />
            </span>
            <span>{{ numberFormat(item.change) }}%</span>
          </CommonBadge>
        </div>
      </div>
      <hr v-if="index < data.length - 1 && display === 'rows'" />
    </template>
  </div>
</template>
