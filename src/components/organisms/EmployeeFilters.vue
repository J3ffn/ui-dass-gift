<script setup>
import { computed, reactive, ref } from "vue";
import Input from "../atoms/Input.vue";
import Select from "../atoms/Select.vue";
import Button from "../atoms/Button.vue";
import { ChevronDown, ChevronUp } from "@lucide/vue";
import { SHIRT_SIZE_OPTIONS, SHOE_SIZE_OPTIONS } from "../../utils/validators";

const emit = defineEmits(["search"]);

const getInitialFilters = () => ({
  cpf: "",
  name: "",
  email: "",
  shirtSize: "all",
  shoeSize: "all",
});

const filters = reactive(getInitialFilters());
const isFiltered = ref(false);
const isExpanded = ref(false);

const submit = () => {
  emit("search", { ...filters });
  isFiltered.value = true;
};

const clear = () => {
  Object.assign(filters, getInitialFilters());
  emit("search", { ...filters });
  isFiltered.value = false;
};

const hasValues = computed(() => {
  return Object.values(filters).some(
    (value) => value !== "all" && value !== "",
  );
});
</script>

<template>
  <div class="filters">
    <button
      type="button"
      class="filters_toggle"
      @click="isExpanded = !isExpanded"
      :style="
        isExpanded ? 'border-bottom: 1px solid var(--color-border)' : undefined
      "
    >
      <span>Filtros</span>
      <ChevronUp v-if="isExpanded" size="18" />
      <ChevronDown v-else size="18" />
    </button>

    <form
      class="filters_form"
      :class="{ 'filters_form--expanded': isExpanded }"
      @submit.prevent="submit"
    >
      <div class="filters_field">
        <Input v-model="filters.name" placeholder="Buscar por nome" />
      </div>
      <div class="filters_field">
        <Input
          v-model="filters.cpf"
          :mask="'###.###.###-##'"
          placeholder="Buscar por CPF"
        />
      </div>
      <div class="filters_field">
        <Input
          v-model="filters.email"
          placeholder="Buscar por e-mail"
          type="email"
        />
      </div>
      <div class="filters_field">
        <Select
          v-model="filters.shirtSize"
          :options="SHIRT_SIZE_OPTIONS"
          placeholder="Camiseta (todas)"
        />
      </div>
      <div class="filters_field">
        <Select
          v-model="filters.shoeSize"
          :options="SHOE_SIZE_OPTIONS"
          placeholder="Calçado (todos)"
        />
      </div>
      <div class="filters_actions">
        <Button
          type="submit"
          variant="primary"
          :disabled="!hasValues && !isFiltered"
          :tooltip="!hasValues ? 'Não há filtros para buscar' : ''"
        >
          Buscar
        </Button>
        <Button
          type="button"
          variant="ghost"
          @click="clear"
          :disabled="!hasValues"
          :tooltip="!hasValues ? 'Não há filtros para limpar' : ''"
        >
          Limpar
        </Button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.filters {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  height: fit-content;
}

.filters_toggle {
  display: none;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background: none;
  border: none;
  border-radius: var(--radius) var(--radius) 0 0;
  padding: 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  cursor: pointer;
}

.filters_form {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  padding: 1rem;
}

.filters_field {
  flex: 1 1 160px;
  min-width: 140px;
}

.filters_actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

@media (max-width: 1015px) {
  .filters_actions {
    flex-direction: row;
    justify-content: flex-end;
  }

  .filters_toggle {
    display: flex;
  }

  .filters_form {
    display: none;
    padding: 0 1rem 1rem 1rem;
  }

  .filters_form--expanded {
    display: flex;
    margin-top: 1rem;
  }
}
</style>
