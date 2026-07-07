<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  id: {
    type: String,
    default: undefined,
  },
  options: {
    type: Array, // [{ value, label }]
    default: () => [],
  },
  placeholder: {
    type: String,
    default: "Selecione...",
  },
  placeholderValue: {
    type: [String, Number],
    default: "all",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  hasError: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <select
    :id="id"
    class="input-field"
    :class="{ 'input-field-error': hasError }"
    :disabled="disabled"
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option :value="placeholderValue">{{ placeholder }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>
