<template>
  <base-card>
    <div
      class="inset-shadow-[var(--primary-shadow)] bg-gray-100 p-5 rounded-lg pointer-events-none select-none"
    >
      <h2 class="font-extrabold text-xl mb-2">Projects:</h2>
      <div v-for="(project, idx) in projectStore.projects" :key="project.id">
        <template v-if="hasProgress(project)">
          <h3 class="font-semibold text-sm">{{ project.name }}</h3>
          <BaseProgressTracker :percent="project.progress" :color="PROGRESSBAR_COLORS[idx]" />
        </template>
      </div>
    </div>
  </base-card>
</template>

<script setup lang="ts">
import BaseCard from '../base/BaseCard.vue';
import BaseProgressTracker from '../base/BaseProgressTracker.vue';
import useProjectStore from '../../stores/projectStore.ts';
import type { ProgressBarColors, Project } from '../../types/models.ts';
import { computed } from 'vue';

const projectStore = useProjectStore();

const hasProgress = (project: Project) => computed(() => project.progress !== 0);

const PROGRESSBAR_COLORS: ProgressBarColors[] = [
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
</script>

<style></style>
