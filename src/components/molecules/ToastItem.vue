<script setup>
defineProps({
  notification: {
    type: Object,
    required: true, // { id, message, type }
  },
});

defineEmits(["close"]);
</script>

<template>
  <div class="toast" :class="`toast--${notification.type}`">
    <span class="toast_message">{{ notification.message }}</span>
    <button class="toast_close" aria-label="Fechar" @click="$emit('close', notification.id)">
      &times;
    </button>
  </div>
</template>

<style scoped>
.toast {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 260px;
  max-width: 360px;
  padding: 0.75rem 0.9rem;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-lg);
  color: #fff;
  font-size: 0.88rem;
}

.toast--success {
  background: var(--color-success);
}
.toast--error {
  background: var(--color-danger);
}
.toast--info {
  background: var(--color-text);
}

.toast_message {
  flex: 1;
}

.toast_close {
  background: none;
  border: none;
  color: inherit;
  font-size: 1.1rem;
  line-height: 1;
  cursor: pointer;
  opacity: 0.85;
}
.toast_close:hover {
  opacity: 1;
}
</style>
