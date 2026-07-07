<script setup>
import { computed } from "vue";
import Modal from "../molecules/Modal.vue";
import EmployeeForm from "./EmployeeForm.vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  employee: {
    type: Object,
    default: null,
  },
  submitting: {
    type: Boolean,
    default: false,
  },
  serverErrors: {
    type: Object,
    default: () => ({}),
  },
});

defineEmits(["update:modelValue", "submit"]);

const title = computed(() => (props.employee ? "Editar funcionário" : "Novo funcionário"));
</script>

<template>
  <Modal
    :model-value="modelValue"
    :title="title"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <EmployeeForm
      :initial-data="employee"
      :submitting="submitting"
      :server-errors="serverErrors"
      @submit="$emit('submit', $event)"
      @cancel="$emit('update:modelValue', false)"
    />
  </Modal>
</template>
