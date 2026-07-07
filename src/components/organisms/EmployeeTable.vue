<script setup>
import Badge from "../atoms/Badge.vue";
import Spinner from "../atoms/Spinner.vue";
import EmployeeRowActions from "../molecules/EmployeeRowActions.vue";
import { formatCpf } from "../../utils/validators";
import { onMounted, onUnmounted, ref } from "vue";

defineProps({
  employees: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["edit", "delete"]);

const isMobile = ref(false);

const checkIfMobile = () => {
  isMobile.value = window.innerWidth <= 785;
};

onMounted(() => {
  checkIfMobile();
  window.addEventListener("resize", checkIfMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkIfMobile);
});
</script>

<template>
  <div class="employee-table">
    <div v-if="loading" class="employee-table_state">
      <Spinner />
      <p>Carregando funcionários...</p>
    </div>

    <div v-else-if="employees.length === 0" class="employee-table_state">
      <p>Nenhum funcionário encontrado.</p>
    </div>

    <template v-else>
      <div v-if="!isMobile" class="employee-table_table-wrap">
        <table class="employee-table_table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>E-mail</th>
              <th>Camiseta</th>
              <th>Calçado</th>
              <th class="employee-table_actions-col">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in employees" :key="employee.id">
              <td class="limit-cell" :title="employee.name">
                {{ employee.name }}
              </td>
              <td>{{ formatCpf(employee.cpf) }}</td>
              <td class="limit-cell" :title="employee.email">
                {{ employee.email }}
              </td>
              <td>
                <Badge v-if="employee.clothing" variant="primary">
                  {{ employee.clothing.shirtSize }}
                </Badge>
                <span v-else class="employee-table_empty-value">—</span>
              </td>
              <td>
                <span v-if="employee.clothing">{{
                  employee.clothing.shoeSize
                }}</span>
                <span v-else class="employee-table_empty-value">—</span>
              </td>
              <td>
                <EmployeeRowActions
                  :employee="employee"
                  @edit="$emit('edit', $event)"
                  @delete="$emit('delete', $event)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ul v-else class="employee-table_cards">
        <li
          v-for="employee in employees"
          :key="employee.id"
          class="employee-card"
        >
          <div class="employee-card_header">
            <span class="employee-card_name">{{ employee.name }}</span>
            <EmployeeRowActions
              :employee="employee"
              @edit="$emit('edit', $event)"
              @delete="$emit('delete', $event)"
            />
          </div>

          <dl class="employee-card_details">
            <div class="employee-card_row">
              <dt>CPF</dt>
              <dd>{{ formatCpf(employee.cpf) }}</dd>
            </div>
            <div class="employee-card_row">
              <dt>E-mail</dt>
              <dd>{{ employee.email }}</dd>
            </div>
            <div class="employee-card_row">
              <dt>Camiseta</dt>
              <dd>
                <Badge v-if="employee.clothing" variant="primary">
                  {{ employee.clothing.shirtSize }}
                </Badge>
                <span v-else class="employee-table_empty-value">—</span>
              </dd>
            </div>
            <div class="employee-card_row">
              <dt>Calçado</dt>
              <dd>
                <span v-if="employee.clothing">{{
                  employee.clothing.shoeSize
                }}</span>
                <span v-else class="employee-table_empty-value">—</span>
              </dd>
            </div>
          </dl>
        </li>
      </ul>
    </template>
  </div>
</template>

<style scoped>
.employee-table {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
  height: 100%;
}

.employee-table_state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 3rem 1rem;
  color: var(--color-text-muted);
}

.employee-table_table-wrap {
  overflow-x: auto;
}

.limit-cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 150px;
}

@media (min-width: 716px) {
  .employee-table_table-wrap {
    max-height: calc(100vh - 260px);
    overflow-y: auto;
  }

  .employee-table_table thead th {
    position: sticky;
    top: 0;
    z-index: 1;
  }
}

.employee-table_table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.employee-table_table th,
.employee-table_table td {
  padding: 0.85rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.employee-table_table th {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--color-text-muted);
  background: var(--color-bg);
}

.employee-table_table thead th,
.employee-table_table tbody td {
  text-align: center;

  &:first-child {
    text-align: left;
  }
  &:last-child {
    text-align: right;
  }
}
.employee-table_table tbody tr:last-child td {
  border-bottom: none;
}

.employee-table_actions-col {
  width: 1%;
  white-space: nowrap;
}

.employee-table_empty-value {
  color: var(--color-text-muted);
}

.employee-table_cards {
  display: none;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-direction: column;
  gap: 0.75rem;
}

@media (max-width: 785px) {
  .employee-table {
    background: none;
    border: none;
  }
  .employee-table_table-wrap {
    display: none;
  }

  .employee-table_cards {
    display: flex;
  }
}

.employee-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.9rem 1rem;
  background: var(--color-surface);
}

.employee-card_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-bottom: 0.6rem;
  margin-bottom: 0.6rem;
  border-bottom: 1px solid var(--color-border);
}

.employee-card_name {
  font-weight: 600;
}

.employee-card_details {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.employee-card_row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.88rem;
}

.employee-card_row dt {
  color: var(--color-text-muted);
}

.employee-card_row dd {
  margin: 0;
  text-align: right;
}
</style>
