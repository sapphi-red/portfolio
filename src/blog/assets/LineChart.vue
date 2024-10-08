<script setup lang="ts">
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type Point,
  type ChartData,
  type ChartOptions
} from 'chart.js'
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import deepmerge from 'deepmerge'
import { useData } from 'vitepress'

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const props = defineProps<{
  data: ChartData<'line', (number | Point | null)[], unknown>
  options?: ChartOptions<'line'>
  height: number
}>()

const { isDark } = useData()

const mergedOptions = computed(() =>
  deepmerge(
    {
      responsive: true,
      maintainAspectRatio: false,
      color: isDark.value ? '#ffffff' : '#000000',
      elements: {
        point: { borderWidth: 0 }
      },
      plugins: {
        legend: {
          position: 'right'
        }
      },
      scales: {
        x: {
          grid: {
            color: isDark.value ? '#737373' : '#d4d4d4'
          },
          ticks: {
            color: isDark.value ? '#d4d4d4' : '#737373'
          }
        },
        y: {
          title: {
            color: isDark.value ? '#d4d4d4' : '#737373'
          },
          grid: {
            color: isDark.value ? '#737373' : '#d4d4d4'
          },
          ticks: {
            color: isDark.value ? '#d4d4d4' : '#737373'
          }
        }
      }
    },
    props.options || {}
  )
)

const style = computed(() => ({
  position: 'relative',
  height: `${props.height}px`
}))
</script>

<template>
  <div>
    <Line :data="data" :options="mergedOptions" :style="style" />
  </div>
</template>
