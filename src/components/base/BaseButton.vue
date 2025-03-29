<template>
  <button
    :type="type"
    :class="[
      'py-2 rounded-full cursor-pointer',
      {
        'bg-violet-700 text-white hover:bg-violet-600 px-6': isPrimary,
        'bg-gray-500 text-white hover:bg-gray-400 px-6': isEdit,
        'bg-red-600 hover:bg-red-500 text-white px-6': isDelete,
        'text-gray-600 rounded-none py-4 px-2 rounded-t-lg text-sm': isTab,
        'hover:bg-gray-100': !selected,
        'bg-gray-200': selected,
      },
    ]"
    @click="emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ButtonMode } from '../../types/models.ts';

const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset' | undefined;
    mode: ButtonMode;
    selected?: boolean;
  }>(),
  {
    type: 'button',
    selected: false,
  },
);

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const isPrimary = computed(() => {
  return props.mode === 'primary';
});

const isEdit = computed(() => {
  return props.mode === 'edit';
});

const isDelete = computed(() => {
  return props.mode === 'delete';
});

const isTab = computed(() => {
  return props.mode === 'tab';
});
</script>

<style></style>
