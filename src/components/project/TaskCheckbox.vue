<template>
  <div class="flex items-center">
    <input
      type="checkbox"
      :name="name"
      :id="id"
      v-model="localTask.isComplete"
      @change="updateProgress(localTask)"
      class="appearance-none peer"
    />
    <label
      class="size-8 bg-violet-100 peer-checked:bg-violet-500 text-white border-2 border-white not-peer-checked:hover:bg-violet-200 peer-checked:hover:bg-violet-600 flex justify-center items-center cursor-pointer"
      :for="id"
      ><CircleCheckBig :class="['hidden', { 'inline-block': task.isComplete }]"
    /></label>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Task } from '../../types/models.ts';
import useProjectStore from '../../stores/projectStore.ts';
import { CircleCheckBig } from 'lucide-vue-next';

const projectStore = useProjectStore();

const props = withDefaults(
  defineProps<{
    name?: string;
    id?: string;
    task: Task;
  }>(),
  {
    name: '',
    id: '',
  },
);

const localTask = ref<Task>({
  id: props.task.id,
  projectId: props.task.projectId,
  content: props.task.content,
  isComplete: props.task.isComplete,
});

const updateProgress = (task: Task) => {
  const projectIdx = projectStore.projects.findIndex((project) => project.id === task.projectId);
  const targetProject = projectStore.projects[projectIdx];

  if (!targetProject) return;

  const updatedTasks = targetProject.tasks.map((t) =>
    t.id === task.id ? { ...t, isComplete: task.isComplete } : t,
  );

  const total = updatedTasks.length;
  const completed = updatedTasks.filter((t) => t.isComplete).length;
  const newProgress = Math.ceil((completed / total) * 100);

  projectStore.setProject(task.projectId, {
    ...targetProject,
    tasks: updatedTasks,
    progress: newProgress,
  });
};
</script>

<style></style>
