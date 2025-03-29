import type { Note, Project } from '@/types/models';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProjectStore = defineStore(
  'project',
  () => {
    // Projects Array and getters/actions
    const projects = ref<Project[]>([]);

    const getProjectById = (projectId: string) =>
      projects.value.find((project) => project.id === projectId) ?? null;

    const getProjectIdxById = (projectId: string) => {
      return projects.value.findIndex((project) => project.id === projectId) ?? null;
    };

    const setProject = (projectId: string, updatedProject: Project) => {
      const index = projects.value.findIndex((p) => p.id === projectId);
      if (index !== -1) projects.value[index] = updatedProject;
    };

    // Notes Array and getters/actions
    const notes = ref<Note[]>([]);

    const deleteNote = (index: number) => {
      if (index >= 0 && index < notes.value.length) notes.value.splice(index, 1);
    };

    const addNote = (newNote: Note) => {
      if (!newNote) return;
      notes.value.unshift(newNote);
    };

    const editNote = (noteId: string, editedNote: Note) => {
      const notesIDX = notes.value.findIndex((note) => note.id === noteId);
      if (notesIDX < 0 || notesIDX >= notes.value.length) return;

      notes.value[notesIDX] = editedNote;
    };

    return {
      projects,
      setProject,
      getProjectById,
      getProjectIdxById,
      notes,
      deleteNote,
      addNote,
      editNote,
    };
  },
  {
    persist: {
      key: 'project-store',
      storage: localStorage,
      pick: ['projects', 'comments', 'notes'],
    },
  },
);

export default useProjectStore;
