<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { NuxtLink } from '#components';
import { DataListItem } from '~~/types/components';
import { NumberFormat, numberFormat } from '~~/utils/filters/numbers';
import { DateTimeFormat, dateTimeFormat } from '~~/utils/filters/dates';

const props = withDefaults(
  defineProps<{
    data: Array<DataListItem>;
  }>(),
  {
    data: () => [],
  }
);
const getValue = ({ value, type }: DataListItem) => {
  switch (value.constructor) {
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
  <div class="flex flex-col gap-2">
    <template v-for="(item, index) in data">
      <div class="flex flex-col gap-2">
        <div class="text-sm text-gray-400">
          {{ item.title }}
        </div>
        <div class="flex gap-4 items-center justify-between">
          <component
            :is="item.href ? NuxtLink : 'div'"
            :href="item.href"
            :target="item.href && '_blank'"
            class="font-medium text-2xl"
            :class="[
              item.href && 'cursor-pointer duration-300 hover:text-blue-900',
            ]"
          >
            {{ getValue(item) }}
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
      <hr v-if="index < data.length - 1" />
    </template>
  </div>
</template>
