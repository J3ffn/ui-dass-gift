<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  htmlFor: {
    type: String,
    default: undefined,
  },
  error: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="form-field">
    <label v-if="label" class="form-field_label" :for="htmlFor">
      {{ label }}<span v-if="required" class="form-field_required">*</span>
    </label>
    <div class="form-field_data">
      <slot />
      <p class="form-field_error">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.form-field_label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text);
}

.form-field_required {
  color: var(--color-danger);
  margin-left: 0.15rem;
}

.form-field_data {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.form-field_error {
  font-size: 0.78rem;
  line-height: 1.3;
  min-height: 1.3em;
  color: var(--color-danger);
  margin: 0;
}
</style>
