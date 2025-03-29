<template>
  <ProjectDashboard />
  <NoteModal />
</template>

<script setup lang="ts">
import NoteModal from "./components/note/NoteModal.vue";
import ProjectDashboard from "./components/project/ProjectDashboard.vue";
import { useProjectStore } from "./stores/projectStore";
import Projects from "@/assets/Projects.json";

const projectStore = useProjectStore();

if (projectStore.projects.length === 0) projectStore.projects = Projects;
</script>

<style></style>
