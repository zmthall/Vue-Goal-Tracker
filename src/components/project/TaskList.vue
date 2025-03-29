<template>
  <base-card>
    <div class="inset-shadow-[var(--primary-shadow)] bg-gray-100 rounded-lg overflow-hidden">
      <ul>
        <li
          v-for="task in currentProject?.tasks"
          :key="task.id"
          class="p-4 sm:px-16 px-2 odd:bg-gray-50 even:bg-gray-100"
        >
          <div class="flex gap-4 justify-between">
            <span>
              {{ task.content }}
            </span>
            <!-- <input type="checkbox" v-model="task.isComplete" @change="updateProgress(task)" /> -->
            <TaskCheckbox :task="task" :id="`task-checkbox-${task.id}`"></TaskCheckbox>
          </div>
        </li>
      </ul>
    </div>
  </base-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import useProjectStore from '../../stores/projectStore.ts';
import { useUiStore } from '../../stores/uiStore.ts';
import BaseCard from '../base/BaseCard.vue';
import TaskCheckbox from './TaskCheckbox.vue';

const projectStore = useProjectStore();
const uiStore = useUiStore();

const currentProject = computed(() => projectStore.getProjectById(uiStore.activeProjectId));
</script>

<style></style>
