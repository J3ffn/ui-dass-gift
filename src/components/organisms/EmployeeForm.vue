<script setup>
import { computed, reactive, watch } from "vue";
import { useStore } from "vuex";
import FormField from "../molecules/FormField.vue";
import Input from "../atoms/Input.vue";
import Select from "../atoms/Select.vue";
import Button from "../atoms/Button.vue";
import {
  SHIRT_SIZE_OPTIONS,
  SHOE_SIZE_OPTIONS,
  validateEmployeeForm,
} from "../../utils/validators";

const store = useStore();

const props = defineProps({
  initialData: {
    type: Object,
    default: null, // null = modo cadastro
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

const emit = defineEmits(["submit", "cancel"]);

const buildInitialForm = (data) => ({
  name: data?.name ?? "",
  cpf: data?.cpf ?? "",
  email: data?.email ?? "",
  shirtSize: data?.clothing?.shirtSize ?? "",
  shoeSize: data?.clothing?.shoeSize ?? "",
});

const form = reactive(buildInitialForm(props.initialData));
const errors = reactive({});

const isFormComplete = computed(
  () =>
    form.name.trim() !== "" &&
    form.cpf.trim() !== "" &&
    form.email.trim() !== "" &&
    form.shirtSize !== "" &&
    form.shoeSize !== "",
);

watch(
  () => props.initialData,
  (data) => Object.assign(form, buildInitialForm(data)),
);

watch(
  () => props.serverErrors,
  (serverErrors) => {
    Object.keys(errors).forEach((key) => delete errors[key]);
    Object.entries(serverErrors ?? {}).forEach(([field, message]) => {
      const key = field.startsWith("clothing.")
        ? field.replace("clothing.", "")
        : field;
      errors[key] = message;
    });
  },
);

const buildChangedFields = () => {
  const initial = buildInitialForm(props.initialData);
  const payload = {};

  Object.keys(form).forEach((key) => {
    if (key === "shirtSize" || key === "shoeSize") {
      return;
    }
    if (form[key] !== initial[key]) {
      payload[key] = form[key].trim();
    }
  });

  const shirtSizeChanged = form.shirtSize !== initial.shirtSize;
  const shoeSizeChanged = Number(form.shoeSize) !== Number(initial.shoeSize);
  if (shirtSizeChanged || shoeSizeChanged) {
    payload.clothing = {
      ...(shirtSizeChanged && { shirtSize: form.shirtSize }),
      ...(shoeSizeChanged && { shoeSize: Number(form.shoeSize) }),
    };
  }

  return payload;
};

const submit = () => {
  const validationErrors = validateEmployeeForm(form);
  Object.keys(errors).forEach((key) => delete errors[key]);
  Object.assign(errors, validationErrors);

  if (Object.keys(validationErrors).length > 0) return;

  if (!props.initialData) {
    emit("submit", {
      name: form.name.trim(),
      cpf: form.cpf,
      email: form.email.trim(),
      clothing: {
        shirtSize: form.shirtSize,
        shoeSize: Number(form.shoeSize),
      },
    });
    return;
  }

  const payload = buildChangedFields();

  if (Object.keys(payload).length === 0) {
    store.dispatch("notification/notify", {
      message: "Nenhuma alteração para salvar.",
      type: "info",
    });
    return;
  }

  emit("submit", payload);
};
</script>

<template>
  <form class="employee-form" @submit.prevent="submit">
    <div class="employee-form_grid">
      <FormField label="Nome" html-for="name" required :error="errors.name">
        <Input
          id="name"
          v-model="form.name"
          placeholder="Nome completo"
          :has-error="!!errors.name"
        />
      </FormField>

      <FormField label="CPF" html-for="cpf" required :error="errors.cpf">
        <Input
          id="cpf"
          v-model="form.cpf"
          :mask="'###.###.###-##'"
          placeholder="000.000.000-00"
          :has-error="!!errors.cpf"
        />
      </FormField>

      <FormField label="E-mail" html-for="email" required :error="errors.email">
        <Input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="nome@empresa.com"
          :has-error="!!errors.email"
        />
      </FormField>

      <FormField
        label="Tamanho de camiseta"
        html-for="shirtSize"
        required
        :error="errors.shirtSize"
      >
        <Select
          id="shirtSize"
          v-model="form.shirtSize"
          :options="SHIRT_SIZE_OPTIONS"
          placeholder="Selecione o tamanho"
          placeholder-value=""
          :has-error="!!errors.shirtSize"
        />
      </FormField>

      <FormField
        label="Tamanho de calçado"
        html-for="shoeSize"
        required
        :error="errors.shoeSize"
      >
        <Select
          id="shoeSize"
          v-model="form.shoeSize"
          :options="SHOE_SIZE_OPTIONS"
          placeholder="Selecione o tamanho"
          placeholder-value=""
          :has-error="!!errors.shoeSize"
        />
      </FormField>
    </div>

    <div class="employee-form_actions">
      <Button
        type="button"
        variant="secondary"
        :disabled="submitting"
        @click="$emit('cancel')"
      >
        Cancelar
      </Button>
      <Button
        type="submit"
        variant="primary"
        :disabled="!isFormComplete"
        :loading="submitting"
        >Salvar</Button
      >
    </div>
  </form>
</template>

<style scoped>
.employee-form_grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  column-gap: 10px;
  row-gap: 0.3rem;
}

.employee-form_actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
  margin-top: 1.5rem;
}
</style>
