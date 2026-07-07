<script setup>
defineProps({
  variant: {
    type: String,
    default: "neutral", // neutral | primary
  },
});
</script>

<template>
  <span class="base-badge" :class="`base-badge--${variant}`"><slot /></span>
</template>

<style scoped>
.base-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
  line-height: 1.6;
}

.base-badge--neutral {
  background: var(--color-bg);
  color: var(--color-text-muted);
}

.base-badge--primary {
  background: var(--color-primary-soft);
  color: var(--color-primary-hover);
}
</style>
