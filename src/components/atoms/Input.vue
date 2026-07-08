<script setup>
import { vMaska } from "maska/vue";

defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  id: {
    type: String,
    default: undefined,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  hasError: {
    type: Boolean,
    default: false,
  },
  maxlength: {
    type: Number,
    default: undefined,
  },
  mask: {
    type: [String, Array, Object],
    default: undefined,
  },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    :id="id"
    class="input-field"
    :class="{ 'input-field-error': hasError }"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :value="modelValue"
    @input="!mask ? $emit('update:modelValue', $event.target.value) : undefined"
    :maxlength="maxlength"
    v-maska="mask"
    @maska="mask ? $emit('update:modelValue', $event.detail.unmasked) : undefined"
  />
</template>
