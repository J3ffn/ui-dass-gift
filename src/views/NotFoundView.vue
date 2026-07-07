<script setup>
import { RouterLink } from "vue-router";
import DefaultLayout from "../components/templates/DefaultLayout.vue";
</script>

<template>
  <DefaultLayout>
    <div class="not-found">
      <h1>Página não encontrada</h1>
      <RouterLink to="/">Voltar para a listagem</RouterLink>
    </div>
  </DefaultLayout>
</template>

<style scoped>
.not-found {
  display: grid;
  text-align: center;
  padding: 4rem 1rem;
  gap: 10px;
  color: var(--color-text-muted);
}
</style>
