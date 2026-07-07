<script setup>
import Modal from "./Modal.vue";
import Button from "../atoms/Button.vue";

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Confirmar ação",
  },
  message: {
    type: String,
    default: "Tem certeza?",
  },
  confirmLabel: {
    type: String,
    default: "Confirmar",
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "confirm"]);

const close = () => emit("update:modelValue", false);
</script>

<template>
  <Modal :model-value="modelValue" :title="title" @update:model-value="close">
    <p class="dialog_message">{{ message }}</p>
    <div class="dialog_actions">
      <Button variant="secondary" :disabled="loading" @click="close">Cancelar</Button>
      <Button variant="danger" :loading="loading" @click="$emit('confirm')">
        {{ confirmLabel }}
      </Button>
    </div>
  </Modal>
</template>

<style scoped>
.dialog_message {
  margin: 0 0 1.25rem;
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.dialog_actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
}
</style>
