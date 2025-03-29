import type { ModalModel, ModalNames, TabNames } from '@/types/models';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUiStore = defineStore('ui-state', () => {
  // Modal UI Settings
  const modals = ref<ModalModel[]>([
    {
      name: 'base-modal',
      state: 'inactive',
      dialogModal: ref<HTMLDialogElement | null>(null),
      isOpen: ref<boolean>(false),
    },
    {
      name: 'notes',
      state: 'inactive',
      dialogModal: ref<HTMLDialogElement | null>(null),
      isOpen: ref<boolean>(false),
    },
    {
      name: 'comments',
      state: 'inactive',
      dialogModal: ref<HTMLDialogElement | null>(null),
      isOpen: ref<boolean>(false),
    },
  ]);

  const activeModal = ref<ModalNames>(undefined);

  const getModalIDX = (modalName: ModalNames) =>
    modals.value.findIndex((modal) => modal.name === modalName);

  const openModal = (modalName: ModalNames) => {
    activeModal.value = modalName;
    const modalIDX = getModalIDX(modalName);
    if (modalIDX !== -1) {
      const modal = modals.value[modalIDX];
      resetModalStates();

      if (modal) {
        modal.state = 'active';
        modal.isOpen = true;
        if (modal.dialogModal && typeof modal.dialogModal.showModal === 'function') {
          modal.dialogModal.showModal();
        } else {
          console.warn(`Modal '${modalName}' is not yet mounted or registered.`);
        }
      }
    }
  };

  const resetModalStates = (modalName: ModalNames = undefined) => {
    activeModal.value = undefined;
    if (modalName) {
      const modalIDX = getModalIDX(modalName);
      const modal = modals.value[modalIDX];
      if (modal) {
        if (modal.dialogModal && typeof modal.dialogModal.close === 'function')
          modal.dialogModal.close();
        modal.state = 'inactive';
        modal.isOpen = false;
      }
    } else {
      modals.value.forEach((modal) => {
        if (modal) {
          if (modal.dialogModal && typeof modal.dialogModal.close === 'function')
            modal.dialogModal.close();
          modal.state = 'inactive';
          modal.isOpen = false;
        }
      });
    }
  };

  const closeModal = (modalName: ModalNames) => {
    resetModalStates(modalName);
  };

  const registerDialogModal = (name: string | undefined, el: HTMLDialogElement | null) => {
    const modal = modals.value.find((modal) => modal.name === name);
    if (modal) modal.dialogModal = el;
  };

  // Project UI Settings
  const activeProjectId = ref<string>('Project-1');
  const activeTab = ref<TabNames>('progression');

  const setActiveTab = (tabName: TabNames) => {
    activeTab.value = tabName;
  };

  const setActiveProject = (projectId: string) => {
    if (projectId) activeProjectId.value = projectId;
  };

  const debugState = () => {
    console.log('UI State:', {
      tab: activeTab.value,
      activeProjectId: activeProjectId.value,
      activeModal: activeModal.value,
    });
  };

  return {
    activeTab,
    activeProjectId,
    modals,
    registerDialogModal,
    setActiveTab,
    setActiveProject,
    openModal,
    closeModal,
    debugState,
  };
});
