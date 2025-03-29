<template>
  <!-- <teleport to="body"> -->
  <dialog
    ref="dialogModal"
    :class="[
      'backdrop:backdrop-blur-lg backdrop:bg-black/50 sm:w-[80%] w-[95%] m-auto rounded-lg p-4 fixed overflow-x-hidden overflow-y-auto sm:max-h-[90%] max-h-[95%]',
      { 'pt-16': hasTitleSlot, 'p-8': !hasTitleSlot },
    ]"
    v-show="modal?.isOpen"
    @click="handleClick"
  >
    <div :class="[{ 'flex flex-col': hasTitleSlot }]">
      <button
        @click="closeModal(name)"
        :class="[
          'p-2 absolute top-2 right-4 cursor-pointer text-gray-300 hover:text-black z-1',
          { 'hover:text-white': hasTitleSlot },
        ]"
      >
        X
      </button>
      <div class="absolute w-full top-0 left-0 bg-violet-700 text-white p-4" v-if="hasTitleSlot">
        <slot name="title"></slot>
      </div>
      <div class="">
        <slot></slot>
      </div>
    </div>
  </dialog>
  <!-- </teleport> -->
</template>

<script setup lang="ts">
import { ref, onMounted, computed, useSlots } from 'vue';
import { useUiStore } from '../../stores/uiStore';
import type { ModalNames } from '../../types/models';

const slots = useSlots();

const hasTitleSlot = computed(() => {
  return !!slots.title;
});

const uiStore = useUiStore();

const dialogModal = ref<HTMLDialogElement | null>(null);

const props = defineProps<{
  name: ModalNames;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const handleClick = (event: MouseEvent) => {
  if (!dialogModal.value) return;

  if (event.target === dialogModal.value) {
    uiStore.closeModal(props.name);
    emit('close');
  }
};

const closeModal = (name: ModalNames) => {
  uiStore.closeModal(name);
  emit('close');
};

const modal = computed(() => uiStore.modals.find((modal) => modal.name === props.name));

onMounted(() => {
  if (dialogModal.value && props.name) uiStore.registerDialogModal(props.name, dialogModal.value);
});
</script>

<style></style>
