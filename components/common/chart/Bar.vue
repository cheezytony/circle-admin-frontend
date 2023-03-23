<script lang="ts" setup>
import { BarElement, Chart } from 'chart.js';
import { getMonths } from '~~/utils/filters/dates';

const props = defineProps<{
  labels?: string[];
}>();

const chart = ref<Chart>();
const wrapperRef = ref<HTMLDivElement>();
const canvasRef = ref<HTMLCanvasElement>();

const setup = () => {
  if (!canvasRef.value) return;
  const context = canvasRef.value.getContext('2d')!;

  chart.value = new Chart(context, {
    type: 'bar',
    data: {
      labels: props.labels || getMonths(0, 7).map((m) => m.slice(0, 3)),
      datasets: [
        {
          data: [65, 59, 80, 81, 56, 55, 40, 20, 62],
          backgroundColor: '#181b24',
          borderRadius: 2,
          barPercentage: 1,
          categoryPercentage: .5,
        },
        {
          data: [56, 55, 10, 65, 40, 80, 59, 34, 11],
          backgroundColor: '#afafe9',
          borderRadius: 2,
          barPercentage: 1,
          categoryPercentage: .5,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          border: {
            display: false,
          },
          grid: {
            display: false,
          },
        },
        y: {
          ticks: {},
          beginAtZero: true,
          border: {
            display: false,
            dash: [10, 15],
          },
          grid: {
            drawTicks: true,
            tickColor: 'white',
          },
        },
      },
    },
  });
};

const resize = () => {
  if (!wrapperRef.value || !canvasRef.value) return;
  canvasRef.value.width = wrapperRef.value.clientWidth;
};
onMounted(resize);
onMounted(setup);
</script>

<template>
  <div ref="wrapperRef">
    <canvas ref="canvasRef" />
  </div>
</template>
