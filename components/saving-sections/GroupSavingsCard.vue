<template>
  <div class="grid grid-cols-4 gap-4 mb-5">
    <div class="col-span-2 sm:col-span-2 md:col-span-2">
      <div class="card bg-black text-white rounded-2xl shadow-md p-6">
        <div class="card-header text-xs">
          <h5 class="group-name text-white text-base font-light mb-1">
            {{ groupName }}
          </h5>
          <h3 class="group-savings-amount text-white text-2xl font-bold mb-1">
            {{ groupTotalAmountSaved }}
          </h3>
          <span class="card-members text-white text-sm"
            >{{ memberCount }} member(s)</span
          >
        </div>
        <div class="card-body">
          <div
            class="card-saving-details flex items-center justify-between mb-6"
          >
            <div class="progress-label text-white text-sm">
              {{ progressLabel }}
            </div>
            <div class="progress-label text-white text-sm">
              {{ progressDetails }}
            </div>
          </div>
          <div
            class="card-progress bg-white rounded h-2 mt-0 mb-2 overflow-hidden"
          >
            <div
              class="progress-bar bg-blue-500 h-full transition-width duration-300 ease-in-out"
              :style="{ width: progressBarWidth }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { numberFormat } from '~~/utils/filters/numbers';
import { computed } from 'vue';

const props = defineProps({
  groupName: {
    type: String,
    required: true,
  },
  memberCount: {
    type: Number,
    required: true,
  },
  totalAmountSaved: {
    type: Number,
    required: true,
  },
  targetAmount: {
    type: Number,
    required: true,
  },
});

const progressLabel = computed(() => {
  const percentage = Math.floor(
    (props.totalAmountSaved / props.targetAmount) * 100
  );
  return `Saved ${percentage}%`;
});

const progressBarWidth = computed(() => {
  const percentage = (props.totalAmountSaved / props.targetAmount) * 100;
  return `${percentage}%`;
});

const groupTotalAmountSaved = computed(() =>
  numberFormat(props.totalAmountSaved, 'currency')
);

const progressDetails = computed(
  () =>
    `${numberFormat(props.totalAmountSaved, 'currency')}/${numberFormat(
      props.targetAmount,
      'currency'
    )}`
);
</script>
