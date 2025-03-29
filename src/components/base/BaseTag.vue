<template>
  <div
    :style="{ background: tagColor }"
    :class="['p-2 rounded-full m-2 flex justify-center text-white relative overflow-hidden z-0]']"
  >
    <span
      :style="{ background: tagOverlay }"
      class="inline-block size-full absolute top-0 left-0 z-0 opacity-30"
    ></span>
    <span class="relative z-1">
      <slot></slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const getRndInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const randomColor = computed(() => {
  const colors = [
    'green',
    'purple',
    'blue',
    'red',
    'violet',
    'orange',
    'pink',
    'teal',
    'dark-gray',
    'sky-blue',
    'burgandy',
    'black',
    'crimson',
    'bright-pink',
    'navy-blue',
  ];
  const rndIdx = getRndInteger(0, colors.length - 1);

  return colors[rndIdx];
});

const tagColor = computed(() => {
  const color = randomColor.value;
  console.log(color);

  if (color === 'green') return '#0b6623';
  if (color === 'purple') return '#9d00ff';
  if (color === 'blue') return '#0047ab';
  if (color === 'red') return '#d30000';
  if (color === 'violet') return '#7f00ff';
  if (color === 'orange') return '#e27429';
  if (color === 'pink') return '#e9658d';
  if (color === 'teal') return '#037c6e';
  if (color === 'dark-gray') return '#555555';
  if (color === 'sky-blue') return '#87ceeb';
  if (color === 'burgandy') return '#8d021f';
  if (color === 'black') return 'rgba(0, 0, 0, 1)';
  if (color === 'bright-pink') return '#ff007f';
  if (color === 'crimson') return '#b80f0a';
  if (color === 'navy-blue') return '#0a1172';
  else return 'transparent';
});

const tagOverlay = computed(() => {
  const gifLinks = [
    'https://i.gifer.com/IwkU.gif',
    'https://i.gifer.com/8YLu.gif',
    'https://i.gifer.com/ZImq.gif',
    'https://i.gifer.com/CCZj.gif',
    'https://i.gifer.com/3s0F.gif',
  ];

  const rndIdx = getRndInteger(0, gifLinks.length - 1);

  console.log(`url(${gifLinks[rndIdx]})`);

  return `url(${gifLinks[rndIdx]}) center/cover`;
});
</script>

<style></style>
