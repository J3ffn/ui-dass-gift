<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import DefaultLayout from "../components/templates/DefaultLayout.vue";
import EmployeeFilters from "../components/organisms/EmployeeFilters.vue";
import EmployeeTable from "../components/organisms/EmployeeTable.vue";
import EmployeeFormModal from "../components/organisms/EmployeeFormModal.vue";
import ConfirmDialog from "../components/molecules/ConfirmDialog.vue";
import Button from "../components/atoms/Button.vue";
import { extractFieldErrors } from "../utils/errors";

const store = useStore();

const employees = computed(() => store.state.employee.items);
const loading = computed(() => store.state.employee.loading);

const activeFilters = ref({});
const search = (filters) => {
  activeFilters.value = filters;
  store.dispatch("employee/fetchEmployees", filters);
};

onMounted(() => search({}));

const isFormOpen = ref(false);
const editingEmployee = ref(null);
const submitting = ref(false);
const serverErrors = ref({});

const openCreate = () => {
  editingEmployee.value = null;
  serverErrors.value = {};
  isFormOpen.value = true;
};

const openEdit = (employee) => {
  editingEmployee.value = employee;
  serverErrors.value = {};
  isFormOpen.value = true;
};

const submitForm = async (payload) => {
  submitting.value = true;
  serverErrors.value = {};
  try {
    if (editingEmployee.value) {
      await store.dispatch("employee/updateEmployee", {
        id: editingEmployee.value.id,
        payload,
      });
    } else {
      await store.dispatch("employee/createEmployee", payload);
    }
    isFormOpen.value = false;
    await store.dispatch("employee/fetchEmployees", activeFilters.value);
  } catch (error) {
    const fieldErrors = extractFieldErrors(error);
    serverErrors.value = fieldErrors;

    if (Object.keys(fieldErrors).length === 0) {
      store.dispatch("notification/notifyError", error);
    }
  } finally {
    submitting.value = false;
  }
};

const employeeToDelete = ref(null);
const deleting = ref(false);

const askDelete = (employee) => {
  employeeToDelete.value = employee;
};

const confirmDelete = async () => {
  if (!employeeToDelete.value) return;
  deleting.value = true;
  try {
    await store.dispatch("employee/deleteEmployee", employeeToDelete.value.id);
  } catch {
    deleting.value = false;
    return;
  }
  employeeToDelete.value = null;
  deleting.value = false;
};
</script>

<template>
  <DefaultLayout>
    <div class="list-header">
      <div>
        <h1 class="list-header_title">Funcionários</h1>
        <p class="list-header_subtitle">
          Cadastro de tamanhos de camiseta e calçado para os brindes de fim de
          ano.
        </p>
      </div>
      <Button
        variant="primary"
        @click="openCreate"
        style="justify-content: center"
      >
        + Adicionar
      </Button>
    </div>

    <div class="list-content">
      <EmployeeFilters @search="search" />

      <EmployeeTable
        :employees="employees"
        :loading="loading"
        @edit="openEdit"
        @delete="askDelete"
      />
    </div>

    <EmployeeFormModal
      v-model="isFormOpen"
      :employee="editingEmployee"
      :submitting="submitting"
      :server-errors="serverErrors"
      @submit="submitForm"
    />

    <ConfirmDialog
      :model-value="!!employeeToDelete"
      title="Remover funcionário"
      :message="`Tem certeza que deseja remover ${employeeToDelete?.name}? Essa ação não pode ser desfeita.`"
      confirm-label="Remover"
      :loading="deleting"
      @update:model-value="(value) => !value && (employeeToDelete = null)"
      @confirm="confirmDelete"
    />
  </DefaultLayout>
</template>

<style scoped>
.list-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 500px) {
    flex-wrap: wrap;
    & button {
      width: 100%;
    }
  }
}

.list-header_title {
  margin: 0;
  font-size: 1.5rem;
}

.list-header_subtitle {
  margin: 0.25rem 0 0;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  text-wrap: wrap;
}

.list-content {
  display: grid;
  grid-template-columns: 1.3fr 4fr;
  gap: 10px;

  @media (max-width: 1015px) {
    grid-template-columns: 1fr;
  }
}
</style>
