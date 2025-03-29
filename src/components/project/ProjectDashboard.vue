<template>
  <div class="flex flex-col my-8">
    <div class="dashboard-control lg:mx-16 md:mx-8 sm:mx-4 mx-2">
      <base-button
        mode="tab"
        :selected="isActiveTab('progression').value"
        @click="selectTab('progression')"
        >Projects Progression</base-button
      >
      <base-button
        mode="tab"
        :selected="isActiveTab('checklists').value"
        @click="selectTab('checklists')"
        >Project Checklists</base-button
      >
    </div>
    <div
      class="p-4 bg-gray-200 lg:mx-16 md:mx-8 sm:mx-4 mx-2 rounded-b-lg rounded-tr-lg"
      v-if="isActiveTab('progression').value"
    >
      <ProjectProgressTracker />
      <ProjectList />
    </div>
    <div
      class="p-4 bg-gray-200 lg:mx-16 md:mx-8 sm:mx-4 mx-2 rounded-b-lg rounded-tr-lg"
      v-else-if="isActiveTab('checklists').value"
    >
      <ProjectSelectionCard />
      <TaskList />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProjectList from './ProjectList.vue';
import ProjectProgressTracker from './ProjectProgressTracker.vue';
import BaseButton from '../base/BaseButton.vue';
import { useUiStore } from '../../stores/uiStore.ts';
import type { TabNames } from '../../types/models.ts';
import { computed } from 'vue';
import ProjectSelectionCard from './ProjectSelectionCard.vue';
import TaskList from './TaskList.vue';

const uiStore = useUiStore();

const isActiveTab = (tabName: TabNames) =>
  computed(() => {
    return uiStore.activeTab === tabName;
  });

const selectTab = (tabName: TabNames) => {
  if (uiStore.activeTab !== tabName) {
    uiStore.setActiveTab(tabName);
  }
};
</script>

<style></style>
