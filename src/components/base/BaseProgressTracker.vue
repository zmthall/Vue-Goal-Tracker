<template>
  <div class="p-2">
    <div v-if="complete">
      <div
        class="h-8 w-full border border-black rounded-full flex justify-center items-center bg-green-500 text-white relative shadow-[var(--primary-shadow)]"
      >
        <span
          class="bar-animation bar-animation-completed size-full rounded-full absolute overflow-x-hidden"
        ></span>
        <span class="block"><CheckCheck /></span>
      </div>
    </div>
    <div
      v-else
      class="progress-bar h-8 w-full border rounded-full relative overflow-x-hidden flex justify-center items-center shadow-[var(--primary-shadow)]"
    >
      <div
        :style="{ transform: `translateX(${percentage}`, background: barColor }"
        class="progress size-full rounded-full absolute top-0 left-[-100%] z-0"
      >
        <span
          class="bar-animation bar-animation-started size-full rounded-full absolute top-0 overflow-x-hidden z-1"
        ></span>
        <span
          class="absolute z-1 right-0 top-1/2 -translate-1/2 text-white"
          v-if="showPercentage"
          >{{ percentage }}</span
        >
      </div>
      <div v-if="notStarted" class="absolute size-full z-1 text-black bg-gray-200">
        <span
          class="bar-animation bar-animation-not-started size-full text-white flex justify-center items-center rounded-full absolute top-0 overflow-x-hidden z-1"
        >
          No Progress
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { CheckCheck } from 'lucide-vue-next';
import type { ProgressBarColors } from '../../types/models.ts';

const props = defineProps<{
  percent: number;
  color: ProgressBarColors;
}>();

const percentage = computed(() => {
  if (props.percent >= 0 && props.percent <= 100) {
    return `${props.percent}%`;
  } else if (props.percent > 100) {
    return '100%';
  } else if (props.percent < 0) {
    return '0%';
  } else return false;
});

const complete = computed(() => {
  return props.percent === 100;
});

const showPercentage = computed(() => {
  return props.percent >= 5;
});

const notStarted = computed(() => {
  return props.percent === 0;
});

const barColor = computed(() => {
  if (props.color === 'green') return '#0b6623';
  if (props.color === 'purple') return '#9d00ff';
  if (props.color === 'blue') return '#0047ab';
  if (props.color === 'red') return '#d30000';
  if (props.color === 'violet') return '#7f00ff';
  if (props.color === 'orange') return '#e27429';
  if (props.color === 'pink') return '#e9658d';
  if (props.color === 'teal') return '#037c6e';
  if (props.color === 'dark-gray') return '#555555';
  if (props.color === 'sky-blue') return '#87ceeb';
  if (props.color === 'burgandy') return '#8d021f';
  if (props.color === 'black') return 'rgba(0, 0, 0, 1)';
  if (props.color === 'bright-pink') return '#ff007f';
  if (props.color === 'crimson') return '#b80f0a';
  if (props.color === 'navy-blue') return '#0a1172';
  else return 'transparent';
});
</script>

<style scoped>
span.bar-animation::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  mix-blend-mode: overlay;
  opacity: 0.1;
}

span.bar-animation-started::before {
  background: url(https://i.gifer.com/PYZK.gif);
}

span.bar-animation-not-started::before {
  background: url(https://i.gifer.com/VUgp.gif);
  opacity: 0.4;
}

span.bar-animation-completed::before {
  background: url(https://i.gifer.com/4A5.gif) center/cover;
  opacity: 1;
}
</style>
