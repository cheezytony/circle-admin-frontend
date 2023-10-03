<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { NuxtLink, BadgeStatus } from '#components';
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
  switch (type) {
    case 'currency':
    case 'currency:compact':
    case 'number':
    case 'number:compact':
    case 'unit':
    case 'unit:compact':
    case 'percentage':
    case 'percentage:compact':
      return value ? numberFormat(value as number, type as NumberFormat) : value;
    case 'date':
    case 'date:compact':
    case 'date:compact:time':
    case 'date:time':
    case 'time':
      return value ? dateTimeFormat(value as Date, type as DateTimeFormat) : value;
  
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
            :is="item.isStatus ? BadgeStatus : item.href ? NuxtLink : 'div'"
            :href="item.href"
            :target="item.href && '_blank'"
            :status="item.value"
            class="overflow-hidden text-ellipsis"
            :class="{
              'cursor-pointer duration-300 hover:text-blue-900': item.href,
              'font-medium text-base': size === 'sm',
              'font-medium text-xl': size === 'md',
              'font-medium text-2xl': size === 'lg',
              'w-full': !item.isStatus,
            }"
          >
            {{ getValue(item) ?? 'N/A' }}
            <span v-if="item.href" class="text-xs">
              <FontAwesomeIcon icon="fas fa-arrow-up-right-from-square" />
            </span>
          </component>
          <Badge v-if="item.change" color-scheme="green:soft">
            <span class="tex-sm">
              <FontAwesomeIcon icon="arrow-trend-up" />
            </span>
            <span>{{ numberFormat(item.change) }}%</span>
          </Badge>
        </div>
      </div>
      <hr v-if="index < data.length - 1 && display === 'rows'" />
    </template>
  </div>
</template>
