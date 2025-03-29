// src/types/models.ts

import type { Ref } from 'vue';

export type ModalNames = 'comments' | 'notes' | 'base-modal' | undefined;
export type ModalState = 'active' | 'inactive';

export type ButtonMode = 'primary' | 'delete' | 'edit' | 'tab';

export type ProgressBarColors =
  | 'green'
  | 'purple'
  | 'blue'
  | 'red'
  | 'violet'
  | 'orange'
  | 'pink'
  | 'teal'
  | 'dark-gray'
  | 'sky-blue'
  | 'burgandy'
  | 'black'
  | 'crimson'
  | 'bright-pink'
  | 'navy-blue';

export type TabNames = 'progression' | 'checklists' | null;

export interface ModalModel {
  name: ModalNames;
  state: ModalState;
  dialogModal: Ref<HTMLDialogElement | null>;
  isOpen: Ref<boolean> | null;
}

export interface Project {
  id: string;
  name: string;
  tech: string[];
  description: string;
  tasks: Task[];
  progress: number; // 0–100
}

export interface Task {
  id: string;
  projectId: string;
  content: string;
  isComplete: boolean;
}

export interface Note {
  id: string;
  projectId: string;
  text: string;
  timestamp: Date;
  lastEdited: Date | null;
}
