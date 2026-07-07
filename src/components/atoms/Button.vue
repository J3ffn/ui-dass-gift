<script setup>
defineProps({
  variant: {
    type: String,
    default: "primary", // primary | secondary | danger | ghost
  },
  type: {
    type: String,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  tooltip: {
    type: String,
    default: "",
  }
});

defineEmits(["click"]);
</script>

<template>
  <button
    :type="type"
    class="base-button"
    :class="[`base-button--${variant}`, { 'is-loading': loading }]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
    :title="tooltip"
  >
    <span v-if="loading" class="base-button_spinner" aria-hidden="true" />
    <span class="base-button_label"><slot /></span>
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 1.1rem;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease, opacity 0.15s ease;
  white-space: nowrap;
}

.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.base-button--primary {
  background: var(--color-primary);
  color: #fff;
}
.base-button--primary:hover:not(:disabled) {
  background: var(--color-primary-hover);
}

.base-button--secondary {
  background: var(--color-surface);
  color: var(--color-text);
  border-color: var(--color-border);
}
.base-button--secondary:hover:not(:disabled) {
  background: var(--color-bg);
}

.base-button--danger {
  background: var(--color-danger);
  color: #fff;
}
.base-button--danger:hover:not(:disabled) {
  background: var(--color-danger-hover);
}

.base-button--ghost {
  background: transparent;
  color: var(--color-text-muted);
  border-color: transparent;
}
.base-button--ghost:hover:not(:disabled) {
  background: var(--color-bg);
  color: var(--color-text);
}

.base-button_spinner {
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-top-color: transparent;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
