<template>
  <base-modal name="notes" @close="closeNote">
    <template #title> Notes </template>
    <div class="p-4 w-full">
      <form @submit.prevent="addNote" class="flex flex-col items-start w-full">
        <textarea
          name="comment"
          id="comment"
          rows="5"
          placeholder="Add a note about this project..."
          maxlength="1000"
          :class="[
            'w-full resize-none border-2 border-gray-200 p-2 rounded-lg focus:border-violet-500 focus-visible:outline-none focus:placeholder:text-violet-300',
            { 'border-red-300 placeholder:text-red-300': !validNote },
            { 'hover:border-violet-300 hover:placeholder:text-violet-300': validNote },
          ]"
          v-model.trim="localNote.text"
          @input="debouncedValidityCheck(localNote.text)"
        ></textarea>
        <div
          :class="['flex w-full', { 'justify-between': !validNote }, { 'justify-end': validNote }]"
        >
          <span class="inline-block text-red-500" v-if="!validNote">The note cannot be empty.</span>
          <span class="inline-block">{{ noteContentCount }}</span>
        </div>
        <base-button type="submit" mode="primary" class="self-end mt-4">Add Note</base-button>
      </form>
    </div>
    <div v-if="hasNotes">
      <ul>
        <li
          :class="['p-8 border-y-1 border-gray-200 relative']"
          v-for="(note, index) in currentProjectNotes"
          :key="note.id"
        >
          <div :class="[`note-${note.id}-control absolute top-4 right-4 flex gap-2`]">
            <base-button mode="edit" @click="editNote(note.id)"><Pencil /></base-button>
            <base-button mode="delete" @click="projectStore.deleteNote(index)"
              ><Trash2
            /></base-button>
          </div>
          <span class="font-bold">{{ formatedDate(note.timestamp) }}</span>
          <div v-if="isEditing(note.id)">
            <form @submit.prevent="editNote(note.id, true)" class="flex flex-col items-end gap-2">
              <textarea
                :name="`${note.id}-edit`"
                :id="note.id"
                rows="5"
                maxlength="1000"
                :class="[
                  'w-full resize-none border-2 border-gray-200 p-2 my-2 rounded-lg focus:border-violet-500 focus-visible:outline-none focus:placeholder:text-violet-300',
                  { 'border-red-300 placeholder:text-red-300': !validNote },
                  { 'hover:border-violet-300 hover:placeholder:text-violet-300': validNote },
                ]"
                v-model.trim="editingNote.text"
                @input="debouncedValidityCheck(editingNote.text)"
              ></textarea>
              <base-button type="submit" mode="edit">edit</base-button>
            </form>
          </div>
          <p class="mt-4" v-else>{{ note.text }}</p>
          <p v-if="note.lastEdited" class="text-xs mt-8">
            <span class="font-extrabold">Last Edited: </span>{{ formatedDate(note.lastEdited) }}
          </p>
        </li>
      </ul>
    </div>
    <div v-else class="border-t-1 border-gray-200 pt-8 my-4 flex justify-center">
      <p>There aren't any notes on this project.</p>
    </div>
  </base-modal>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import useProjectStore from '../../stores/projectStore.ts';
import BaseButton from '../base/BaseButton.vue';
import BaseModal from '../base/BaseModal.vue';
import { nanoid } from 'nanoid';
import { useUiStore } from '../../stores/uiStore.ts';
import type { Note } from '../../types/models.ts';
import { useDebounce } from '../../composables/useDebounce.ts';
import { Pencil, Trash2 } from 'lucide-vue-next';

const projectStore = useProjectStore();
const uiStore = useUiStore();

const localNote = ref<Note>({
  id: nanoid(10),
  projectId: uiStore.activeProjectId,
  text: '',
  timestamp: new Date(),
  lastEdited: null,
});

const editingNote = ref<{ text: string; editingIdx: number | null }>({
  text: '',
  editingIdx: null,
});

const validNote = ref<boolean>(true);

const checkValidity = () => {
  if (!(localNote.value.text.length > 0)) {
    validNote.value = false;
  } else {
    validNote.value = true;
  }

  return validNote.value;
};

const debouncedValidityCheck = useDebounce(
  (text: string) => {
    if (!(text.length > 0)) {
      validNote.value = false;
    } else {
      validNote.value = true;
    }
  },
  200,
  true,
);

const addNote = () => {
  validNote.value = true;
  if (checkValidity()) {
    projectStore.addNote(localNote.value);
    localNote.value = {
      id: nanoid(10),
      projectId: uiStore.activeProjectId,
      text: '',
      timestamp: new Date(),
      lastEdited: null,
    };
  } else validNote.value = false;
};

const editNote = (noteId: string, submit: boolean = false) => {
  const note = projectStore.notes.find((note) => note.id === noteId);
  if (submit) {
    if (note && editingNote.value.text !== note.text) {
      projectStore.editNote(note.id, {
        ...note,
        timestamp: new Date(note.timestamp),
        lastEdited: new Date(),
        text: editingNote.value.text,
      });
      editingNote.value.text = '';
      editingNote.value.editingIdx = null;
    }
  } else {
    const noteIdx = projectStore.notes.findIndex((note) => note.id === noteId);
    if (note && noteIdx !== -1 && noteIdx !== editingNote.value.editingIdx) {
      editingNote.value.text = note?.text;
      editingNote.value.editingIdx = noteIdx;
    } else {
      editingNote.value.text = '';
      editingNote.value.editingIdx = null;
    }
  }
};

const resetLocalNote = () => {
  localNote.value = {
    id: nanoid(10),
    projectId: uiStore.activeProjectId,
    text: '',
    timestamp: new Date(),
    lastEdited: null,
  };
};

const closeNote = () => {
  resetLocalNote();
};

const isEditing = (noteId: string) => {
  const noteIdx = projectStore.notes.findIndex((note) => note.id === noteId);
  if (noteIdx !== -1) {
    return noteIdx === editingNote.value.editingIdx;
  }
};

const formatedDate = (date: Date) =>
  computed(() => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeStyle: 'short',
      dateStyle: 'medium',
    });

    return formatter.format(new Date(date)).replace(/^([^,]+,[^,]+),/, '$1 at');
  });

const currentProjectNotes = computed(() => {
  return projectStore.notes.filter((note) => note.projectId === uiStore.activeProjectId);
});

const hasNotes = computed(() => {
  return currentProjectNotes.value.length > 0;
});

const noteContentCount = computed(() => {
  return `${localNote.value.text.length}/1000`;
});

watch(
  () => uiStore.activeProjectId,
  () => {
    resetLocalNote();
  },
);
</script>

<style></style>
