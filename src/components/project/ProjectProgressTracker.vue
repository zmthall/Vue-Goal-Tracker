<template>
  <base-card>
    <div
      class="inset-shadow-[var(--primary-shadow)] bg-gray-100 lg:p-12 sm:p-6 p-4 rounded-lg lg:m-12 sm:m-4 m-0 pointer-events-none select-none"
    >
      <h2 class="font-extrabold text-xl mb-2">All Projects:</h2>
      <div>
        <BaseProgressTracker :percent="allProgress" color="red" />
      </div>
    </div>
  </base-card>
</template>

<script setup lang="ts">
import BaseCard from '../base/BaseCard.vue';
import useProjectStore from '../../stores/projectStore.ts';
import { computed } from 'vue';
import BaseProgressTracker from '../base/BaseProgressTracker.vue';

const projectStore = useProjectStore();

const allProgress = computed(() => {
  const totalProjects = projectStore.projects.length;
  if (totalProjects === 0) return 0;

  const totalProgress = projectStore.projects.reduce((sum, project) => {
    return sum + (typeof project.progress === 'number' ? project.progress : 0);
  }, 0);

  return Math.round(totalProgress / totalProjects);
});
</script>

<style></style>
