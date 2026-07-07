<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="layout">
    <header class="layout_header">
      <div class="layout_header-inner">
        <RouterLink to="/" class="layout_brand">
          <img src="/logo_dass.png" alt="Logo" height="40px" />
        </RouterLink>

        <h3>Brindes</h3>
      </div>
    </header>

    <main class="layout_main">
      <div class="layout_content">
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout_header {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 1rem 1.5rem;
}

.layout_header-inner {
  max-width: var(--content-max-width);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.layout_brand {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--color-text);
  text-decoration: none;
}

.layout_main {
  flex: 1;
  padding: 2rem 1.5rem 3rem;
}

.layout_content {
  max-width: var(--content-max-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
</style>
