<template>
  <ProjectDashboard />
  <NoteModal />
</template>

<script setup lang="ts">
import NoteModal from "./components/note/NoteModal.vue";
import ProjectDashboard from "./components/project/ProjectDashboard.vue";
import { useProjectStore } from "./stores/projectStore";
import Projects from "./assets/Projects.json";

const projectStore = useProjectStore();
projectStore.projects = Projects;
</script>

<style></style>
