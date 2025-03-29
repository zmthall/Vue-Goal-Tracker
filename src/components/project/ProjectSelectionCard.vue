<template>
  <base-card>
    <div
      class="inset-shadow-[var(--primary-shadow)] bg-gray-100 sm:px-5 sm:py-5 rounded-lg relative py-10 px-2"
    >
      <div
        class="absolute top-4 right-4 after:content-['Notes'] hover:after:opacity-100 after:absolute after:-top-12 after:opacity-0 after:left-[50%] after:-translate-x-1/2 after:bg-white after:p-2 after:rounded-lg after:shadow-[var(--primary-shadow)] after:transition-opacity after:duration-500 after:ease-in-out"
      >
        <button class="cursor-pointer" @click="uiStore.openModal('notes')"><NotebookPen /></button>
      </div>
      <select
        name="project-selection"
        id="project-selection"
        class="selection-card font-extrabold text-[1rem] w-fit"
        v-model="uiStore.activeProjectId"
      >
        <option
          :name="project.name"
          v-for="project in projectStore.projects"
          :key="project.id"
          :value="project.id"
        >
          {{ project.name }}
        </option>
      </select>
      <div class="tech" v-if="currentProject">
        <ul class="flex flex-wrap justify-start">
          <li v-for="tech in currentProject.tech" :key="tech">
            <base-tag>{{ tech }}</base-tag>
          </li>
        </ul>
      </div>
      <p>{{ currentProject?.description }}</p>
    </div>
  </base-card>
</template>

<script setup lang="ts">
import BaseTag from '../base/BaseTag.vue';
import BaseCard from '../base/BaseCard.vue';
import { computed } from 'vue';
import useProjectStore from '../../stores/projectStore.ts';
import { useUiStore } from '../../stores/uiStore.ts';
import { NotebookPen } from 'lucide-vue-next';

const projectStore = useProjectStore();
const uiStore = useUiStore();

const currentProject = computed(() => projectStore.getProjectById(uiStore.activeProjectId));
</script>

<style scoped>
@media (max-width: 360px) {
  .selection-card {
    font-size: calc(7.3vw - 11.375px);
  }
}
</style>
