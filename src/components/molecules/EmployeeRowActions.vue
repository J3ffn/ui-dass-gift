<script setup>
import Button from "../atoms/Button.vue";
import { Edit2, Trash2 } from "@lucide/vue";

defineProps({
  employee: {
    type: Object,
    required: true,
  },
});

defineEmits(["edit", "delete"]);
</script>

<template>
  <div class="employee-row-actions">
    <Button
      style="padding: 0; background: none"
      variant="ghost"
      @click="$emit('edit', employee)"
    >
      <Edit2 size="18" />
    </Button>
    <Button
      style="padding: 0; background: none"
      variant="ghost"
      @click="$emit('delete', employee)"
    >
      <Trash2 size="18" color="var(--color-danger)" />
    </Button>
  </div>
</template>

<style scoped>
.employee-row-actions {
  display: flex;
  gap: 0.5rem;
}
</style>
