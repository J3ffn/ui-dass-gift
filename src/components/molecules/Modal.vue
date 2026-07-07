<script setup>
import { X } from '@lucide/vue';

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const close = () => emit("update:modelValue", false);
</script>

<template>
  <div v-if="modelValue" class="modal-overlay" @click.self="close">
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modal_header">
        <h2 class="modal_title">{{ title }}</h2>
        <button class="modal_close" type="button" aria-label="Fechar" @click="close">
          <x size="20"/>
        </button>
      </div>
      <div class="modal_body">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 100;
}

.modal {
  background: var(--color-surface);
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
  max-width: 560px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1rem;
  border-bottom: 1px solid var(--color-border);
}

.modal_title {
  margin: 0;
  font-size: 1.1rem;
}

.modal_close {
  display: flex;
  background: none;
  border: none;
  font-size: 1.4rem;
  line-height: 1;
  color: var(--color-text-muted);
  cursor: pointer;
  padding: 0.15rem;
}
.modal_close:hover {
  color: var(--color-text);
}

.modal_body {
  padding: 1.5rem;
}
</style>
